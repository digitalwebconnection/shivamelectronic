import { useCartContext } from '../context/CartContext';

/**
 * Custom hook for cart operations.
 */
export const useCart = () => {
  const { items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems } = useCartContext();

  const totalPrice = items.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);

  return { items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice };
};
