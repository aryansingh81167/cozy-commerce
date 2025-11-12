import type { Category, Product, Review, Order } from '@/lib/types';
import { Armchair, Lamp,LayoutPanelLeft, Paintbrush, Wind } from 'lucide-react';

export const categories: Category[] = [
  { id: 'seating', name: 'Seating', icon: Armchair },
  { id: 'lighting', name: 'Lighting', icon: Lamp },
  { id: 'textiles', name: 'Textiles', icon: Wind },
  { id: 'accessories', name: 'Accessories', icon: LayoutPanelLeft },
  { id: 'wall-decor', name: 'Wall Decor', icon: Paintbrush },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Terracotta Dream Vase',
    description: 'A minimalist vase to bring warmth to any corner.',
    longDescription: 'Handcrafted from ethically sourced clay, the Terracotta Dream Vase boasts a smooth, matte finish that feels as good as it looks. Its minimalist design complements any decor style, from bohemian to modern. Perfect for single stems or small bouquets, this vase is a subtle statement piece that brings a touch of earthy warmth to your space.',
    price: 45.00,
    images: ['productVase', 'productVase', 'productVase'],
    categoryId: 'accessories',
    rating: 4.8,
    reviewCount: 120,
    stock: 25,
  },
  {
    id: '2',
    name: 'Cream Linen Cushions',
    description: 'Set of two soft, luxurious linen cushions.',
    longDescription: 'Upgrade your comfort with our Cream Linen Cushions. Made from 100% pure, pre-washed linen, these cushions are incredibly soft and breathable. The set of two comes in a versatile cream color that adds a layer of texture and elegance to your sofa or bed. Inserts are included.',
    price: 89.99,
    images: ['productCushions', 'productCushions', 'productCushions'],
    categoryId: 'textiles',
    rating: 4.9,
    reviewCount: 230,
    stock: 40,
  },
  {
    id: '3',
    name: 'Golden Ratio Wall Art',
    description: 'Abstract art with clean lines and a modern feel.',
    longDescription: 'Inspired by the harmony of the golden ratio, this abstract wall art features clean lines and a balanced composition. Printed on high-quality canvas with archival inks, it brings a sophisticated and modern touch to any room. Available in multiple sizes to fit your space perfectly.',
    price: 150.00,
    images: ['productArt', 'productArt', 'productArt'],
    categoryId: 'wall-decor',
    rating: 4.7,
    reviewCount: 95,
    stock: 15,
  },
  {
    id: '4',
    name: 'Oakwood Desk Lamp',
    description: 'A sleek and functional lamp for your workspace.',
    longDescription: 'Illuminate your tasks with the Oakwood Desk Lamp. It combines a solid oak base with a sleek, adjustable metal shade in a matte black finish. The warm light is perfect for reading or working, and its timeless design makes it a beautiful addition to any desk or nightstand.',
    price: 125.00,
    images: ['productLamp', 'productLamp', 'productLamp'],
    categoryId: 'lighting',
    rating: 4.9,
    reviewCount: 180,
    stock: 30,
    modelSrc: '/models/desk-lamp.glb',
  },
  {
    id: '5',
    name: 'Ceramic Succulent Pot',
    description: 'A charming home for your small plants.',
    longDescription: 'Give your succulents a stylish home with this small ceramic pot. Featuring a speckled cream glaze and a drainage hole, it ensures your plants stay healthy and happy. Its petite size is perfect for windowsills, shelves, or as part of a larger plant collection.',
    price: 22.50,
    images: ['productPlant', 'productPlant', 'productPlant'],
    categoryId: 'accessories',
    rating: 4.6,
    reviewCount: 75,
    stock: 50,
  },
  {
    id: '6',
    name: 'Brass Arched Mirror',
    description: 'An elegant mirror to brighten your space.',
    longDescription: 'Create a sense of light and space with our Brass Arched Mirror. The elegant arch and thin, minimalist brass frame add a touch of sophistication. It works beautifully as a vanity mirror, in a hallway, or as a statement piece in your living room.',
    price: 220.00,
    images: ['productMirror', 'productMirror', 'productMirror'],
    categoryId: 'wall-decor',
    rating: 4.9,
    reviewCount: 150,
    stock: 10,
  },
  {
    id: '7',
    name: 'Woven Jute Rug',
    description: 'Natural texture for a grounded, earthy feel.',
    longDescription: 'Hand-woven from natural jute fibers, this rug brings organic texture and warmth to your floors. It\'s durable, eco-friendly, and its neutral tone complements a wide range of decor styles. A perfect anchor for any room.',
    price: 299.99,
    images: ['productRug', 'productRug', 'productRug'],
    categoryId: 'textiles',
    rating: 4.5,
    reviewCount: 110,
    stock: 8,
  },
  {
    id: '8',
    name: 'Scented Candle Trio',
    description: 'Sandalwood, Amber, and Vanilla scented soy candles.',
    longDescription: 'Set the mood with our Scented Candle Trio. This set includes three hand-poured soy wax candles in Sandalwood, Amber, and Vanilla scents. Housed in minimalist glass jars, they provide a clean burn and a delightful aroma that transforms your home into a sanctuary.',
    price: 65.00,
    images: ['productCandles', 'productCandles', 'productCandles'],
    categoryId: 'accessories',
    rating: 4.8,
    reviewCount: 210,
    stock: 60,
  }
];

export const reviews: Review[] = [
    { id: '1', productId: '1', author: 'Jane D.', rating: 5, title: "Absolutely beautiful!", text: "This vase is the perfect subtle piece for my bookshelf. The quality is amazing for the price.", date: '2024-05-15' },
    { id: '2', productId: '1', author: 'Mark T.', rating: 4, title: "Very stylish", text: "Looks great, but a bit smaller than I expected. Still love it though.", date: '2024-05-10' },
    { id: '3', productId: '2', author: 'Sarah P.', rating: 5, title: "So luxurious!", text: "These cushions are incredibly soft and have completely elevated the look of my sofa. Highly recommend!", date: '2024-05-20' },
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-05-01',
    status: 'Delivered',
    total: 134.99,
    items: [
      { id: '2', name: 'Cream Linen Cushions', price: 89.99, image: 'productCushions', quantity: 1 },
      { id: '1', name: 'Terracotta Dream Vase', price: 45.00, image: 'productVase', quantity: 1 },
    ],
  },
  {
    id: 'ORD-002',
    date: '2024-05-18',
    status: 'Shipped',
    total: 150.00,
    items: [
      { id: '3', name: 'Golden Ratio Wall Art', price: 150.00, image: 'productArt', quantity: 1 },
    ],
  },
];
