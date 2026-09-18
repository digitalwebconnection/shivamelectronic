import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface WishlistContextType {
  items: any[];
  addToWishlist: (product: any) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<any[]>([]);

  const addToWishlist = (product: any) => {
    const id = product._id || product.id;
    setItems(prev => {
      if (prev.find(i => (i._id || i.id) === id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setItems(prev => prev.filter(i => (i._id || i.id) !== productId));
  };

  const isInWishlist = (productId: string) => {
    return items.some(i => (i._id || i.id) === productId);
  };

  const clearWishlist = () => setItems([]);

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlistContext must be used within WishlistProvider');
  return ctx;
};
