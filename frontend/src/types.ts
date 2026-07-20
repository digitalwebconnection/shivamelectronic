export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price?: number;
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
  product?: Product;
  productId?: string;
  productName?: string;
  brand?: string;
  category?: string;
  price?: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: string;
  _id?: string;
  orderId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  customerNote?: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Processing' | 'In Transit' | 'Delivered';
  total: number;
  totalAmount?: number;
  totalQuantity?: number;
  paymentMethod: string;
  items: OrderItem[];
}
