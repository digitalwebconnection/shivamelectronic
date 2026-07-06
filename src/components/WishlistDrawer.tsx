import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import type { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart,
}) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white border-l border-slate-200 shadow-2xl transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h2 className="text-lg font-bold text-slate-900">Your Wishlist</h2>
            <span className="bg-red-50 text-red-600 border border-red-100 text-xs font-semibold px-2 py-0.5 rounded-full">
              {wishlist.length}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center pb-12">
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center border border-slate-200 text-slate-400 mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">Your wishlist is empty</h3>
              <p className="text-sm text-slate-550 max-w-[250px] mb-6">
                Save your favorite items here to purchase them later.
              </p>
              <button 
                onClick={onClose}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all"
              >
                Explore Products
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div 
                key={product.id}
                className="flex gap-4 p-3 bg-slate-50/50 border border-slate-200 rounded-xl hover:border-slate-350 transition-colors"
              >
                {/* Product Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0 border border-slate-150">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">
                      {product.name}
                    </h4>
                    <span className="text-[10px] text-blue-600 uppercase tracking-widest font-bold block">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {/* Add to Cart button */}
                    <button
                      onClick={() => onMoveToCart(product)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white rounded-lg transition-all active:scale-95"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>

                    {/* Remove button */}
                    <button 
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="p-1.5 text-slate-400 hover:text-red-650 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
