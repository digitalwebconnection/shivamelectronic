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
  isNew?: boolean;
  isHot?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  role: string;
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
