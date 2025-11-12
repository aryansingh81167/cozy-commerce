import type { LucideIcon } from 'lucide-react';

export type Product = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  images: string[];
  categoryId: string;
  rating: number;
  reviewCount: number;
  stock: number;
};

export type Category = {
  id: string;
  name: string;
  icon: LucideIcon;
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  text: string;
  date: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Order = {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: CartItem[];
}
