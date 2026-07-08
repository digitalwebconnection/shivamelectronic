import React from 'react';
import { Hero } from '../../components/sections/Hero';
import type { Product } from '../../types';

// Refactored Sub-Sections
import { CategoriesQuickNav } from './components/CategoriesQuickNav';
import { BestSellers } from './components/BestSellers';
import { FlashSale } from './components/FlashSale';
import { LaptopsSection } from './components/LaptopsSection';
import { SmartphonesSection } from './components/SmartphonesSection';
import { AudioSection } from './components/AudioSection';
import { WearablesSection } from './components/WearablesSection';
import { CamerasSection } from './components/CamerasSection';
import { BrandMarquee } from './components/BrandMarquee';
import { Guarantees } from './components/Guarantees';
import { PromoParallaxBanner } from './components/PromoParallaxBanner';

interface HomeProps {
  products: Product[];
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isLoggedIn: boolean;
  onPromptAuth: () => void;
  onNavigateToProducts: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Home: React.FC<HomeProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  isLoggedIn,
  onPromptAuth,
  onNavigateToProducts,
  onSelectCategory
}) => {
  const handleCategoryViewAll = (slug: string) => {
    if (onSelectCategory) {
      onSelectCategory(slug);
    }
    onNavigateToProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-in fade-in duration-300">
      {/* Hero Presentation */}
      <Hero 
        onSelectProduct={onSelectProduct} 
        onNavigateToProducts={onNavigateToProducts}
      />

      {/* Categories Quick Navigation */}
      <CategoriesQuickNav products={products} />

      {/* Featured / Best Sellers */}
      <BestSellers 
        products={products}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        isLoggedIn={isLoggedIn}
        onPromptAuth={onPromptAuth}
        onNavigateToProducts={onNavigateToProducts}
      />

      {/* Hot Flash Sale of the Day */}
      <FlashSale 
        products={products}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
      />

      {/* 1. Connectors & Sockets */}
      <LaptopsSection 
        products={products}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        isLoggedIn={isLoggedIn}
        onPromptAuth={onPromptAuth}
        onViewAll={handleCategoryViewAll}
      />

      {/* 2. Cables & Power Cords */}
      <SmartphonesSection 
        products={products}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        isLoggedIn={isLoggedIn}
        onPromptAuth={onPromptAuth}
        onViewAll={handleCategoryViewAll}
      />

      {/* Mid-page Promo Parallax Banner */}
      <PromoParallaxBanner onNavigateToProducts={onNavigateToProducts} />

      {/* 3. Switches & Push Buttons */}
      <AudioSection 
        products={products}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        isLoggedIn={isLoggedIn}
        onPromptAuth={onPromptAuth}
        onViewAll={handleCategoryViewAll}
      />

      {/* 4. Hardware & Accessories */}
      <WearablesSection 
        products={products}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        isLoggedIn={isLoggedIn}
        onPromptAuth={onPromptAuth}
        onViewAll={handleCategoryViewAll}
      />

      {/* 5. Spotlight Optoelectronics */}
      <CamerasSection 
        products={products}
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
        onAddToCart={onAddToCart}
        onSelectProduct={onSelectProduct}
        isLoggedIn={isLoggedIn}
        onPromptAuth={onPromptAuth}
        onViewAll={handleCategoryViewAll}
      />

      {/* Brand Spotlight */}
      <BrandMarquee />

      {/* Service Guarantees */}
      <Guarantees />

    </div>
  );
};
