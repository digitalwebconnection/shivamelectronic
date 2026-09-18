import React from 'react';
import { Heart, Eye, Star, ShoppingCart } from 'lucide-react';
import type { Product } from '../../../types';
import { toSlug } from '../utils';

interface Category {
  name: string;
  slug: string;
  icon: string;
}

interface ProductCardProps {
  product: Product;
  dynamicCategories: Category[];
  isWishlisted: boolean;
  onWishlistClick: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  dynamicCategories,
  isWishlisted,
  onWishlistClick,
  onSelectProduct,
  onAddToCart
}) => {
  return (
    <div className="group relative flex flex-col bg-slate-50/40 hover:bg-white border border-slate-200/80 hover:border-slate-300 rounded-md overflow-hidden transition-all duration-300 shadow-lg shadow-black/5 hover:-translate-y-1">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.isHot && (
          <span className="bg-linear-to-r from-rose-600 to-red-500 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md shadow-sm shadow-red-500/15">
            Hot
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => onWishlistClick(product)}
        className={`absolute top-2 right-2 z-10 p-1.5 rounded-md transition-all duration-300 border cursor-pointer ${
          isWishlisted 
            ? 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-500/20' 
            : 'bg-white/95 border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-350 hover:bg-white'
        }`}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart className={`w-3 h-3 transition-transform duration-300 ${isWishlisted ? 'fill-current text-white scale-110' : 'text-slate-400'}`} />
      </button>

      {/* Product Image */}
      <div 
        onClick={() => onSelectProduct(product)}
        className="relative aspect-square w-full bg-slate-100/30 group-hover:bg-slate-50/50 overflow-hidden cursor-pointer border-b border-slate-100 flex items-center justify-center"
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-slate-950/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <span className="flex items-center gap-1.5 px-4 py-2 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-black rounded-md border border-slate-200 transition-all shadow-md">
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            Quick View
          </span>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Brand Labels */}
          <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5 overflow-hidden">
            <span className="text-[8px] sm:text-[9px] text-blue-600 uppercase tracking-widest font-black truncate">
              {dynamicCategories.find(c => c.slug === toSlug(product.category))?.name || product.category}
            </span>
            <span className="text-[8px] text-slate-350 font-black shrink-0">•</span>
            <span className="text-[8px] sm:text-[9px] text-slate-500 font-extrabold uppercase tracking-wider bg-slate-100 px-1 sm:px-1.5 py-0.5 rounded-md truncate">
              {product.brand}
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="text-[11px] sm:text-xs font-bold text-slate-800 line-clamp-2 min-h-[28px] sm:min-h-[32px] group-hover:text-blue-600 transition-colors cursor-pointer leading-tight sm:leading-snug mb-1.5"
          >
            {product.name}
          </h3>

          {/* Rating Row */}
          <div className="flex items-center gap-1 mb-2 sm:mb-4">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-slate-200'}`} 
                />
              ))}
            </div>
            <span className="text-[9px] sm:text-[10px] font-black text-slate-450">
              {product.rating}
            </span>
          </div>
        </div>

        {/* Footer / CTA Section */}
        <div className="flex items-center justify-center mt-auto pt-2 border-t border-slate-100">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full flex items-center justify-center gap-1 py-1.5 px-2 rounded-md bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[8px] sm:text-[9px] font-black shadow-md shadow-blue-500/10 active:scale-95 transition-all duration-300 cursor-pointer"
            title="Add to Cart"
          >
            <ShoppingCart className="w-3 h-3 shrink-0" />
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>
    </div>
  );
};
