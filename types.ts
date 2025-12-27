
export type Category = 'Course' | 'Digital Product' | 'Offer';

export interface Product {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  image_url: string; // Keep as primary/main image
  images?: string[]; // Array for multiple images
  category: Category;
  payment_link: string;
  is_active: boolean;
  features?: string[];
  created_at?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export type Theme = 'dark' | 'light';
