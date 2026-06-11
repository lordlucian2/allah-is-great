import { Product } from '../types';

export const safeNumber = (value: unknown): number => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value.replace(/,/g, ''));
    return Number.isFinite(parsed) ? parsed : 0;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const formatPrice = (value: unknown): string => safeNumber(value).toFixed(2);

export const normalizeProduct = (item: any): Product => {
  const price = safeNumber(item.price ?? item.price ?? item.product?.price);
  const rawOriginal = item.originalPrice ?? item.original_price ?? item.price ?? item.product?.originalPrice;
  const originalPrice = rawOriginal != null && rawOriginal !== '' && Number.isFinite(Number(String(rawOriginal).replace(/,/g, '')))
    ? safeNumber(rawOriginal)
    : undefined;

  const images = Array.isArray(item.images) && item.images.length > 0
    ? item.images
    : Array.isArray(item.product?.images) && item.product.images.length > 0
      ? item.product.images
      : [String(item.image ?? item.image_url ?? item.product?.image ?? 'https://placehold.co/600x400/CCCCCC/white?text=No+Image')];

  return {
    id: String(item.id ?? item.product?.id ?? `product-${Date.now()}`),
    name: String(item.name ?? item.product?.name ?? 'Unnamed Product'),
    price,
    originalPrice: originalPrice ?? price,
    rating: safeNumber(item.rating ?? item.product?.rating ?? 4.5),
    reviewsCount: Number.isFinite(Number(item.reviewsCount ?? item.reviews_count ?? item.product?.reviewsCount ?? item.product?.reviews_count ?? 0))
      ? Number(item.reviewsCount ?? item.reviews_count ?? item.product?.reviewsCount ?? item.product?.reviews_count ?? 0)
      : 0,
    category: String(item.category ?? item.product?.category ?? 'accessories'),
    brand: String(item.brand ?? item.product?.brand ?? 'Others'),
    image: String(item.image ?? item.image_url ?? item.product?.image ?? images[0]),
    images,
    description: String(item.description ?? item.product?.description ?? ''),
    specs: item.specs && typeof item.specs === 'object' ? item.specs : item.product?.specs ?? {},
    colors: Array.isArray(item.colors) ? item.colors : Array.isArray(item.product?.colors) ? item.product.colors : [],
    isFeatured: Boolean(item.isFeatured ?? item.is_featured ?? item.product?.isFeatured ?? item.product?.is_best_seller),
    isBestSeller: Boolean(item.isBestSeller ?? item.is_best_seller ?? item.product?.isBestSeller ?? item.product?.is_best_seller),
    isTodayDeal: Boolean(item.isTodayDeal ?? item.is_today_deal ?? item.product?.isTodayDeal ?? item.product?.is_today_deal),
    badgeText: item.badgeText ?? item.badge_text ?? item.product?.badgeText ?? item.product?.badge_text ?? null,
  };
};
