import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const sourceFile = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'ai-studio-temp', 'src', 'data.ts');
const sourcePath = path.normalize(sourceFile);

function loadProducts() {
  const rawText = fs.readFileSync(sourcePath, 'utf8');
  const cleaned = rawText
    .replace(/^import .*\n/gm, '')
    .replace(/^export const /gm, 'const ')
    .replace(/const\s+([A-Za-z0-9_]+)\s*:\s*[^=]+=\s*/g, 'const $1 = ');

  const wrapper = `${cleaned}\nmodule.exports = { PRODUCTS };`;
  const module = { exports: {} };

  try {
    const fn = new Function('module', 'exports', wrapper);
    fn(module, module.exports);
    if (!Array.isArray(module.exports.PRODUCTS)) {
      throw new Error('Expected PRODUCTS array in AI Studio data file');
    }
    return module.exports.PRODUCTS;
  } catch (error) {
    console.error('Failed to parse AI Studio product data:', error);
    process.exit(1);
  }
}

async function seed() {
  const products = loadProducts();
  let inserted = 0;
  let updated = 0;

  for (const product of products) {
    const name = product.name || product.id || 'Unnamed Product';
    const category = product.category || 'accessories';
    const price = Number(product.price) || 0;
    const imageUrl = String(product.image || (Array.isArray(product.images) ? product.images[0] : '') || '');
    const description = String(product.description || '');
    const isFeatured = Boolean(product.isFeatured || product.isBestSeller || product.isTodayDeal);
    const availabilityStatus = 'in_stock';

    try {
      const existing = await pool.query('SELECT id FROM products WHERE name = $1 LIMIT 1', [name]);
      if (existing.rows.length > 0) {
        await pool.query(
          `UPDATE products SET category = $1, price = $2, availability_status = $3, image_url = $4, description = $5, is_featured = $6 WHERE id = $7`,
          [category, price, availabilityStatus, imageUrl, description, isFeatured, existing.rows[0].id]
        );
        updated += 1;
      } else {
        await pool.query(
          `INSERT INTO products (name, category, price, availability_status, image_url, description, is_featured)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [name, category, price, availabilityStatus, imageUrl, description, isFeatured]
        );
        inserted += 1;
      }
    } catch (error) {
      console.error(`Failed to seed product '${name}':`, error);
    }
  }

  console.log(`AI Studio seeding complete. Inserted: ${inserted}, Updated: ${updated}`);
  await pool.end();
}

seed().catch((err) => {
  console.error('Seeding script failed:', err);
  process.exit(1);
});
