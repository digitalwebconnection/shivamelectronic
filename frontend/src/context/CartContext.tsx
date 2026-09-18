import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface CartItem {
  product: any;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: any, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => (i.product._id || i.product.id) === (product._id || product.id));
      if (existing) {
        return prev.map(i =>
          (i.product._id || i.product.id) === (product._id || product.id)
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(i => (i.product._id || i.product.id) !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) return removeFromCart(productId);
    setItems(prev => prev.map(i =>
      (i.product._id || i.product.id) === productId ? { ...i, quantity: qty } : i
    ));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within CartProvider');
  return ctx;
};
