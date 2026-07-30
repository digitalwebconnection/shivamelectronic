import React, { useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Star, Sparkles } from 'lucide-react';
import type { Product } from '../../types';
// import { ProductGrid } from '../../components/ProductGrid'; // Keep import in case needed later, or removed if strictly unused
interface ProductDetailPageProps {
  product: Product;
  products: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isLoggedIn: boolean;
  onPromptAuth: () => void;
  onBack: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  isLoggedIn,
  onPromptAuth,
  onBack,
}) => {
  const allProducts = products;
  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const isWishlisted = wishlist.some(item => item.id === product.id);

  const handleWishlistClick = () => {
    if (!isLoggedIn) {
      onPromptAuth();
    } else {
      onToggleWishlist(product);
    }
  };

  // Get up to 4 related products in the same category
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // If we have fewer than 4 related items, fill up with other hot products
  if (relatedProducts.length < 4) {
    const existingIds = new Set(relatedProducts.map(p => p.id));
    existingIds.add(product.id);
    const extraProducts = allProducts
      .filter(p => !existingIds.has(p.id))
      .slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...extraProducts);
  }

  return (
    <div className="py-4 lg:py-10 bg-slate-50/30 lg:bg-slate-50/30 animate-in fade-in duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-4 lg:mb-6">
          <button 
            onClick={onBack}
            className="inline-flex items-center justify-center w-8 h-8 lg:w-auto lg:h-auto lg:px-4 lg:py-2 bg-white lg:hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-full lg:rounded-md transition-all shadow-sm cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 lg:w-3.5 lg:h-3.5 lg:mr-1.5" />
            <span className="hidden lg:inline">Back to Products</span>
          </button>
        </div>

        {/* Product Split Details */}
        <div className="bg-white lg:bg-transparent rounded-2xl lg:rounded-none shadow-sm lg:shadow-none border border-slate-100 lg:border-none p-4 sm:p-6 lg:p-0 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-10 lg:mb-16 relative overflow-hidden">
          {/* Ambient background decoration - Desktop only */}
          <div className="hidden lg:block absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Image Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center bg-white lg:bg-slate-50/50 lg:border lg:border-slate-100 rounded-xl relative aspect-square lg:shadow-lg lg:shadow-black/5">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain p-2 lg:p-0 transition-transform duration-700"
            />
            {product.isHot && (
              <span className="absolute top-4 left-4 bg-linear-to-r from-red-600 to-rose-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full lg:rounded-md shadow-md shadow-red-500/10 z-10">
                Hot Seller
              </span>
            )}
            
            {/* Wishlist Button on Image for mobile */}
            <button
              onClick={handleWishlistClick}
              className={`lg:hidden absolute top-4 right-4 p-2.5 rounded-full transition-all duration-300 shadow-md z-10 ${
                isWishlisted 
                  ? 'bg-rose-500 text-white shadow-rose-500/20' 
                  : 'bg-white text-slate-400 border border-slate-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current scale-110' : ''}`} />
            </button>
          </div>

          {/* Right Column: Spec content */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-4 lg:space-y-5">
              {/* Category */}
              <div>
                <span className="text-[10px] text-blue-600 uppercase tracking-widest font-black block mb-1.5 lg:mb-1">
                  {product.category}
                </span>
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-serif leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-slate-200'}`} 
                    />
                  ))}
                  <span className="text-[10px] lg:text-xs font-bold text-slate-650 ml-1.5">{product.rating} Rating</span>
                </div>
                <span className="text-slate-200 hidden sm:inline">|</span>
                <span className="text-[10px] lg:text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">In Stock</span>
              </div>

              {/* Price */}
              <div className="text-xl lg:text-lg font-black text-slate-900 lg:text-blue-600 mt-2 lg:mt-0">
                Request Quote
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {product.description}
              </p>

              {/* Specifications List */}
              <div className="space-y-2 pt-3 lg:pt-2">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Key Specifications
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 lg:gap-2">
                  {product.specifications.map((spec, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-start lg:items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1 lg:mt-0" />
                      <span className="leading-tight">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 lg:pt-8 mt-auto">
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 py-3.5 lg:py-3.5 px-6 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl lg:rounded-md shadow-lg shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer active:scale-95"
              >
                <ShoppingCart className="w-4 h-4 lg:w-4 lg:h-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleWishlistClick}
                className={`hidden lg:flex p-3.5 border rounded-md transition-all duration-300 items-center justify-center cursor-pointer active:scale-95 ${
                  isWishlisted 
                    ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/15' 
                    : 'bg-white border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-300'
                }`}
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 transition-transform duration-300 ${isWishlisted ? 'fill-current text-white scale-110' : 'text-slate-400'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div>
          <div className="flex items-center gap-2 mb-4 lg:mb-6">
            <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 font-serif tracking-tight">
                Related Components
              </h2>
              <p className="text-[10px] lg:text-xs text-slate-400 mt-0.5 hidden sm:block">
                Explore other premium choices from our high-performance electronic categories.
              </p>
            </div>
          </div>

          {/* Horizontal scroll list for related products */}
          <div className="flex overflow-x-auto gap-3 pb-6 snap-x hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {relatedProducts.map(relProduct => (
              <div 
                key={relProduct.id}
                onClick={() => onSelectProduct(relProduct)}
                className="shrink-0 w-36 sm:w-48 lg:w-56 flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden cursor-pointer snap-start hover:shadow-lg transition-all group"
              >
                <div className="w-full aspect-square bg-white relative p-3 flex items-center justify-center border-b border-slate-100">
                  <img src={relProduct.image} alt={relProduct.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                  {relProduct.isHot && (
                    <span className="absolute top-2 left-2 bg-rose-500 text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm z-10">
                      Hot
                    </span>
                  )}
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between bg-slate-50/30">
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{relProduct.name}</h4>
                    <div className="flex items-center text-yellow-500 mt-1.5">
                      <Star className="w-3 h-3 fill-yellow-500" />
                      <span className="text-[10px] font-bold text-slate-600 ml-1">{relProduct.rating}</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs font-black text-slate-900">Request Quote</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(relProduct);
                      }}
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <ShoppingCart className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
