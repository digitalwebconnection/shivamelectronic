export interface Product {
  id: string;
  name: string;
  category: string;
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
