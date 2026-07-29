import React from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import type { Product } from '../../../types';

interface ProductCardProps {
  product: Product;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isLoggedIn: boolean;
  onPromptAuth: () => void;
  accentColor: 'blue' | 'rose' | 'violet' | 'emerald' | 'amber' | 'crimson';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  isLoggedIn,
  onPromptAuth,
  accentColor
}) => {
  const isWishlisted = wishlist.some(item => item.id === product.id);

  // Determine if product is recent (created within the last 7 days)
  const isProductRecent = React.useMemo(() => {
    if (!product.createdAt) return false;
    const createdDate = new Date(product.createdAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  }, [product.createdAt]);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      onPromptAuth();
    } else {
      onToggleWishlist(product);
    }
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  // Accent styling mappings
  let borderHoverClass = 'hover:border-blue-400';
  let badgeGradient = 'from-blue-600 to-indigo-500';
  let textAccentClass = 'text-blue-600';
  let btnGradient = 'from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500';
  let shadowClass = 'shadow-blue-600/10';

  if (accentColor === 'rose') {
    borderHoverClass = 'hover:border-rose-400';
    badgeGradient = 'from-rose-600 to-orange-500';
    textAccentClass = 'text-rose-600';
    btnGradient = 'from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500';
    shadowClass = 'shadow-rose-600/10';
  } else if (accentColor === 'violet') {
    borderHoverClass = 'hover:border-violet-400';
    badgeGradient = 'from-violet-600 to-purple-500';
    textAccentClass = 'text-violet-600';
    btnGradient = 'from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500';
    shadowClass = 'shadow-violet-600/10';
  } else if (accentColor === 'emerald') {
    borderHoverClass = 'hover:border-emerald-400';
    badgeGradient = 'from-emerald-600 to-teal-500';
    textAccentClass = 'text-emerald-600';
    btnGradient = 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500';
    shadowClass = 'shadow-emerald-600/10';
  } else if (accentColor === 'amber') {
    borderHoverClass = 'hover:border-amber-400';
    badgeGradient = 'from-amber-600 to-orange-500';
    textAccentClass = 'text-amber-600';
    btnGradient = 'from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500';
    shadowClass = 'shadow-amber-600/10';
  } else if (accentColor === 'crimson') {
    borderHoverClass = 'hover:border-red-500';
    badgeGradient = 'from-red-600 to-pink-500';
    textAccentClass = 'text-red-500';
    btnGradient = 'from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500';
    shadowClass = 'shadow-red-600/15';
  }

  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className={`group relative flex flex-col bg-white ${borderHoverClass} rounded-md overflow-hidden shadow-sm md:shadow-lg shadow-slate-800/10 md:shadow-slate-800/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer w-35 min-w-35 sm:w-40 sm:min-w-40 md:w-45 md:min-w-45 lg:w-55 lg:min-w-55 shrink-0 snap-start`}
    >
      {/* Badges (Hot / New) */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isHot && (
          <span className="bg-linear-to-r from-red-600 to-orange-500 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm shadow-sm">
            Hot
          </span>
        )}
        {isProductRecent && (
          <span className={`bg-linear-to-r ${badgeGradient} text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm shadow-sm`}>
            New
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistClick}
        className={`absolute top-3 right-3 z-10 p-2 rounded-xl transition-all duration-300 cursor-pointer ${
          isWishlisted 
            ? 'text-rose-500  ' 
            : ' text-slate-800 hover:text-rose-500 '
        }`}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart className={`w-6.5 h-6.5 transition-transform duration-300 ${isWishlisted ? 'fill-current text-rose-500 scale-110' : 'text-slate-500'}`} />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square w-full bg-slate-50/50 overflow-hidden border-b border-slate-100 flex items-center justify-center ">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full  object-fill  transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_8px_16px_rgba(0,0,0,0.03)]"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-slate-950/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] font-bold rounded-md border border-slate-200 shadow-md">
            <Eye className={`w-3.5 h-3.5 ${textAccentClass}`} />
            Quick View
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-3 md:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Label */}
          <span className={`text-[9px] ${textAccentClass} uppercase tracking-widest font-black block mb-1`}>
            {product.category}
          </span>
          
          {/* Product Name */}
          <h3 className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-800 line-clamp-1 md:line-clamp-2 md:min-h-9 group-hover:text-blue-600 transition-colors leading-tight mb-1.5 md:mb-2" title={product.name}>
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2 md:mb-3">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-2.5 h-2.5 ${i < Math.floor(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-slate-200'}`} 
                />
              ))}
            </div>
            <span className="text-[9px] font-bold text-slate-400">
              {product.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2.5 md:pt-3 border-t border-slate-100">
          <span className="text-[9px] md:text-[10px] font-extrabold uppercase tracking-wider text-slate-400 max-w-12.5 md:max-w-none leading-tight md:leading-normal">
            Quote on Request
          </span>

          <button
            onClick={handleCartClick}
            className={`flex items-center justify-center gap-1 py-1 md:py-1.5 px-2 md:px-3 rounded-md bg-linear-to-r ${btnGradient} text-white text-[9px] md:text-[10px] font-black shadow-md ${shadowClass} active:scale-95 transition-all duration-300 cursor-pointer`}
            title="Add to Cart"
          >
            <ShoppingCart className="w-3 h-3" />
            <span className="hidden md:inline">ADD</span>
          </button>
        </div>
      </div>
    </div>
  );
};
