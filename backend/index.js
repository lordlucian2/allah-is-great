import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import pool from './db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM testimonials ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Get deals
app.get('/api/deals', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM deals ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;

  if (username === adminUser && password === adminPass) {
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Protected route example (verify token middleware)
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

app.get('/api/admin/protected', verifyToken, (req, res) => {
  res.json({ message: 'You are authorized', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// ==================== ADMIN PRODUCT CRUD (Protected) ====================

// Create product
app.post('/api/admin/products', verifyToken, async (req, res) => {
  const { name, category, price, availability_status, image_url, description, is_featured } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO products (name, category, price, availability_status, image_url, description, is_featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, category, price, availability_status, image_url, description, is_featured || false]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update product
app.put('/api/admin/products/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, category, price, availability_status, image_url, description, is_featured } = req.body;
  try {
    const result = await pool.query(
      `UPDATE products SET 
        name = $1, category = $2, price = $3, availability_status = $4, 
        image_url = $5, description = $6, is_featured = $7
       WHERE id = $8 RETURNING *`,
      [name, category, price, availability_status, image_url, description, is_featured, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product
app.delete('/api/admin/products/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted', id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ==================== ADMIN TESTIMONIALS CRUD ====================

// Get all testimonials (public, already exists at /api/testimonials)
// But we need admin endpoints:

app.post('/api/admin/testimonials', verifyToken, async (req, res) => {
  const { customer_name, text, rating, photo_url } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO testimonials (customer_name, text, rating, photo_url)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [customer_name, text, rating, photo_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

app.put('/api/admin/testimonials/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { customer_name, text, rating, photo_url } = req.body;
  try {
    const result = await pool.query(
      `UPDATE testimonials SET 
        customer_name = $1, text = $2, rating = $3, photo_url = $4
       WHERE id = $5 RETURNING *`,
      [customer_name, text, rating, photo_url, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Testimonial not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

app.delete('/api/admin/testimonials/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM testimonials WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Testimonial not found' });
    res.json({ message: 'Testimonial deleted', id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

// ==================== ADMIN DEALS CRUD ====================

// Get all deals (public endpoint already exists at /api/deals)
// Admin endpoints:

app.post('/api/admin/deals', verifyToken, async (req, res) => {
  const { title, type, product_id, until_date } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO deals (title, type, product_id, until_date)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, type, product_id, until_date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create deal' });
  }
});

app.put('/api/admin/deals/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, type, product_id, until_date } = req.body;
  try {
    const result = await pool.query(
      `UPDATE deals SET 
        title = $1, type = $2, product_id = $3, until_date = $4
       WHERE id = $5 RETURNING *`,
      [title, type, product_id, until_date, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Deal not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update deal' });
  }
});

app.delete('/api/admin/deals/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM deals WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Deal not found' });
    res.json({ message: 'Deal deleted', id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete deal' });
  }
});

// ==================== SETTINGS CRUD ====================

// Get all settings (public)
app.get('/api/settings', async (req, res) => {
  try {
    const result = await pool.query('SELECT key, value FROM settings');
    const settings = {};
    result.rows.forEach(row => { settings[row.key] = row.value; });
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update a single setting (admin only)
app.put('/api/admin/settings', verifyToken, async (req, res) => {
  const updates = req.body; // { key: value, ... }
  try {
    for (const [key, value] of Object.entries(updates)) {
      await pool.query(
        'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP',
        [key, value]
      );
    }
    res.json({ success: true, updated: Object.keys(updates) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Change admin password
app.post('/api/admin/change-password', verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (currentPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }
  // In production, you should hash the password. For simplicity, we update env variable (won't persist across restarts).
  // Better to store hashed password in settings table.
  process.env.ADMIN_PASSWORD = newPassword;
  // Also persist to settings table
  await pool.query(
    'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value',
    ['admin_password_hash', newPassword] // In real app, hash it.
  );
  res.json({ success: true, message: 'Password updated (until server restart)' });
});

// ==================== SETTINGS CRUD ====================

app.get('/api/settings', async (req, res) => {
  try {
    const result = await pool.query('SELECT key, value FROM settings');
    const settings = {};
    result.rows.forEach(row => { settings[row.key] = row.value; });
    res.json(settings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

app.put('/api/admin/settings', verifyToken, async (req, res) => {
  const updates = req.body;
  try {
    for (const [key, value] of Object.entries(updates)) {
      await pool.query(
        'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP',
        [key, value]
      );
    }
    res.json({ success: true, updated: Object.keys(updates) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

app.post('/api/admin/change-password', verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (currentPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Current password is incorrect' });
  }
  process.env.ADMIN_PASSWORD = newPassword;
  await pool.query(
    'INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value',
    ['admin_password_hash', newPassword]
  );
  res.json({ success: true, message: 'Password updated (until server restart)' });
});
