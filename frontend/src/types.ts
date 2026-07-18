export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  specifications: string[];
  isRecent?: boolean;
  isHot?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  createdAt?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'In Transit' | 'Delivered' | 'Cancelled';
  total: number;
  paymentMethod: string;
  items: OrderItem[];
}
