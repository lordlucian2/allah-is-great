export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: string;
  brand: string;
  image: string;
  images: string[];
  description: string;
  specs: Record<string, string>;
  colors?: { name: string; hex: string }[];
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isTodayDeal?: boolean;
  badgeText?: string;
  originalPage?: 'home' | 'product-view' | 'specs';
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatar: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}
