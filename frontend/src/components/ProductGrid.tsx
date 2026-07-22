import React from 'react';
import { Heart, ShoppingCart, Star, Eye, ArrowRight } from 'lucide-react';
import type { Product } from '../types';

interface ProductGridProps {
  products?: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isLoggedIn: boolean;
  onPromptAuth: () => void;
  hideHeader?: boolean;
  onNavigateToProducts?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products = [],
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  isLoggedIn,
  onPromptAuth,
  hideHeader = false,
  onNavigateToProducts,
}) => {
  const isWishlisted = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const handleWishlistClick = (product: Product) => {
    if (!isLoggedIn) {
      onPromptAuth();
    } else {
      onToggleWishlist(product);
    }
  };

  const content = (
    <div className="w-full">
      {/* Section Header */}
      {!hideHeader && (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="max-w-xl">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-1">
              Featured Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">
              Latest Hot Electronics
            </h2>
            <p className="mt-2 text-slate-505 text-xs sm:text-sm leading-relaxed">
              Explore the newest arrivals from premium global electronics brands. High performance components, beautiful design, and certified warranty.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <span className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-500 rounded-full">
              {products.length} Products Available
            </span>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const hasHeart = isWishlisted(product.id);
          return (
            <div 
              key={product.id}
              className="group relative flex flex-col bg-slate-50/40 hover:bg-white border border-slate-200/80 hover:border-slate-350 rounded-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1"
            >
              {/* Badges (Hot / New) */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                {product.isHot && (
                  <span className="bg-linear-to-r from-rose-600 to-red-500 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md shadow-md shadow-red-500/10">
                    Hot
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => handleWishlistClick(product)}
                className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-300 border cursor-pointer ${
                  hasHeart 
                    ? 'bg-rose-500 border-rose-500 text-white shadow-md shadow-rose-500/20' 
                    : 'bg-white/90 border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-300 hover:bg-white'
                }`}
                title={hasHeart ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-3.5 h-3.5 transition-transform duration-300 ${hasHeart ? 'fill-current text-white scale-110' : 'text-slate-400'}`} />
              </button>

              {/* Product Image Panel */}
              <div 
                onClick={() => onSelectProduct(product)}
                className="relative aspect-square w-full bg-slate-100/40 group-hover:bg-slate-50/50 overflow-hidden cursor-pointer border-b border-slate-100 flex items-center justify-center "
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_10px_20px_rgba(0,0,0,0.06)]"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-slate-950/15 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/90 hover:bg-white backdrop-blur-md text-slate-800 text-[10px] font-bold rounded-md border border-slate-200 transition-all shadow-md">
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    Quick View
                  </span>
                </div>
              </div>

              {/* Product Details Panel */}
              <div className="p-4.5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category */}
                  <span className="text-[9px] text-blue-600 uppercase tracking-widest font-black block mb-1">
                    {product.category}
                  </span>
                  
                  {/* Title */}
                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 min-h-[36px] group-hover:text-blue-600 transition-colors cursor-pointer leading-tight mb-2"
                  >
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
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

                <div className="flex items-center justify-between mt-auto pt-3.5 border-t border-slate-100">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Quote on Request
                  </span>
                  <button
                    onClick={() => onAddToCart(product)}
                    className="flex items-center justify-center gap-1 py-1.5 px-3.5 rounded-md bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-[10px] font-black shadow-md shadow-blue-600/10 active:scale-95 transition-all duration-300 cursor-pointer"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    <span>ADD</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Redirect View All Products CTA */}
      {onNavigateToProducts && (
        <div className="flex justify-center mt-12">
          <button
            onClick={onNavigateToProducts}
            className="flex items-center gap-1.5 px-7 py-3.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black rounded-md shadow-lg hover:shadow-xl hover:shadow-blue-500/25 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );

  if (hideHeader) {
    return content;
  }

  return (
    <section id="products" className="py-12 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    </section>
  );
};
