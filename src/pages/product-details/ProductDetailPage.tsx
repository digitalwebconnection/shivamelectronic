import React, { useEffect } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Star, Shield, RotateCcw, Truck, Sparkles } from 'lucide-react';
import type { Product } from '../../types';
import { ProductGrid } from '../../components/ProductGrid';
import { products as allProducts } from '../../data/products';

interface ProductDetailPageProps {
  product: Product;
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
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  isLoggedIn,
  onPromptAuth,
  onBack,
}) => {
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
    <div className="py-10 bg-slate-50/30 animate-in fade-in duration-300 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-6">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </button>
        </div>

        {/* Product Split Details */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 relative overflow-hidden">
          {/* Ambient background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Left Column: Image Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-50/50 border border-slate-100 rounded-2xl p-8 relative aspect-square">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-[80%] h-[80%] object-contain transition-transform duration-700 hover:scale-105 drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)]"
            />
            {product.isHot && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-rose-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-md shadow-red-500/10">
                Hot Seller
              </span>
            )}
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg shadow-md shadow-blue-500/10">
                New Release
              </span>
            )}
          </div>

          {/* Right Column: Spec content */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Category */}
              <div>
                <span className="text-[10px] text-blue-600 uppercase tracking-widest font-black block mb-1">
                  {product.category}
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-slate-200'}`} 
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-650 ml-1.5">{product.rating} Rating</span>
                </div>
                <span className="text-slate-200">|</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-lg">In Stock</span>
              </div>

              {/* Price */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 text-xs font-extrabold uppercase tracking-wider">
                Price on Request
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Specifications List */}
              <div className="space-y-2 pt-2">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Key Specifications
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.specifications.map((spec, idx) => (
                    <li key={idx} className="text-xs text-slate-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipping, Returns & Trust badge cards */}
              <div className="grid grid-cols-3 gap-3 py-4 border-y border-slate-100 text-[10px] text-slate-500 font-medium">
                <div className="flex flex-col items-center text-center gap-1.5 p-2 bg-slate-50/50 border border-slate-100 rounded-xl">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 p-2 bg-slate-50/50 border border-slate-100 rounded-xl">
                  <RotateCcw className="w-4 h-4 text-blue-600" />
                  <span>30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1.5 p-2 bg-slate-50/50 border border-slate-100 rounded-xl">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span>2-Year Warranty</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6">
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/15 transition-all duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleWishlistClick}
                className={`p-3.5 border rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 ${
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

        {/* Related Products Grid (4 layout grid) */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Related Technical Gear
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Explore other premium choices from our high-performance electronic categories.
              </p>
            </div>
          </div>

          <ProductGrid 
            products={relatedProducts}
            wishlist={wishlist}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            onSelectProduct={onSelectProduct}
            isLoggedIn={isLoggedIn}
            onPromptAuth={onPromptAuth}
            hideHeader={true}
          />
        </div>

      </div>
    </div>
  );
};
