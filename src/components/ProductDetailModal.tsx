import React from 'react';
import { X, ShoppingCart, Heart, Star, Shield, RotateCcw, Truck } from 'lucide-react';
import type { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  isLoggedIn: boolean;
  onPromptAuth: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  isLoggedIn,
  onPromptAuth,
}) => {
  if (!isOpen || !product) return null;

  const handleWishlistClick = () => {
    if (!isLoggedIn) {
      onPromptAuth();
    } else {
      onToggleWishlist(product);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm transition-all duration-300">
      <div 
        className="relative w-full max-w-3xl overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Effects */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 text-slate-500 hover:text-slate-800 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Panel (Left) */}
        <div className="w-full md:w-1/2 bg-slate-50 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-200/80">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full max-h-[300px] md:max-h-[400px] object-contain rounded-xl"
          />
        </div>

        {/* Product Details Panel (Right) */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
          <div>
            {/* Category and Badges */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-blue-600 uppercase tracking-widest font-black">
                {product.category}
              </span>
              {product.isHot && (
                <span className="bg-red-100 text-red-600 border border-red-200/30 text-[9px] font-black uppercase px-2 py-0.5 rounded">
                  Hot Seller
                </span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight mb-2">
              {product.name}
            </h2>

            {/* Ratings & Price */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-slate-200'}`} 
                  />
                ))}
                <span className="text-xs font-bold text-slate-500 ml-1">{product.rating}</span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-xs font-bold text-green-600">In Stock</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-extrabold uppercase tracking-wider mb-4">
              Pricing Available on Request
            </div>

            {/* Description */}
            <p className="text-xs text-slate-650 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Key Specs */}
            <div className="space-y-2 mb-6">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Key Specifications
              </h4>
              <ul className="grid grid-cols-1 gap-1.5">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="text-xs text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 py-3.5 border-y border-slate-200/80 mb-6 text-[10px] text-slate-500">
              <div className="flex flex-col items-center text-center gap-1">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <RotateCcw className="w-4 h-4 text-blue-600" />
                <span>30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <Shield className="w-4 h-4 text-blue-600" />
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onAddToCart(product)}
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <button
              onClick={handleWishlistClick}
              className={`p-3 border rounded-xl transition-all duration-300 flex items-center justify-center ${
                isWishlisted 
                  ? 'bg-red-50 border-red-500 text-white' 
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800'
              }`}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
