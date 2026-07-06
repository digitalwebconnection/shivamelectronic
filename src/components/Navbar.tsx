import React, { useState, useEffect, useRef } from 'react';
import {
  Search, ShoppingCart, Heart,  LogOut, ChevronDown,
  Menu, X, Laptop, Smartphone, Headphones, Watch, Camera,
  Gamepad2, Cpu,  ShoppingBag, SlidersHorizontal, Tag
} from 'lucide-react';
import type { Product, CartItem, User as UserType } from '../types';
import { categories, products } from '../data/products';

interface NavbarProps {
  cartItems: CartItem[];
  wishlist: Product[];
  user: UserType | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onProductClick: (product: Product) => void;

  // Behance-style search & category synchronization
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;

  // Multi-page routing support
  currentPage?: 'home' | 'products' | 'about' | 'contact' | 'product-details' | 'profile';
  setCurrentPage?: (page: 'home' | 'products' | 'about' | 'contact' | 'product-details' | 'profile') => void;
}

const getShortCategoryName = (slug: string) => {
  switch (slug.toLowerCase()) {
    case 'laptops':
    case 'laptops-computers':
      return 'Laptops';
    case 'mobiles':
    case 'smartphones-tablets':
      return 'Mobiles';
    case 'audio':
    case 'audio-headphones':
      return 'Audio';
    case 'wearables':
    case 'smartwatches-wearables':
      return 'Watches';
    case 'cameras':
    case 'cameras-imaging':
      return 'Cameras';
    case 'gaming':
    case 'gaming-accessories':
      return 'Gaming';
    default:
      return slug;
  }
};

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  wishlist,
  user,
  onOpenAuth,
  onLogout,
  onOpenCart,
  onOpenWishlist,
  onProductClick,

  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,

  currentPage = 'home',
  setCurrentPage
}) => {
  // Navigation states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [, setIsProfileDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);


  // Smart Navbar Scroll States
  const [isScrolled, setIsScrolled] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Compute search suggestions
  const searchResults = searchQuery.trim() === ''
    ? []
    : products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortDropdownOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Smart Glassmorphism Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Dynamically map icon strings to Lucide components
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop': return <Laptop className="w-4 h-4" />;
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'Headphones': return <Headphones className="w-4 h-4" />;
      case 'Watch': return <Watch className="w-4 h-4" />;
      case 'Camera': return <Camera className="w-4 h-4" />;
      case 'Gamepad2': return <Gamepad2 className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };

  // Small black tag list (Behance footer tags style)
  const quickTags = [
    { label: 'store', query: 'store' },
    { label: 'website', query: 'website' },
    { label: 'macbook', query: 'MacBook' },
    { label: 'iphone', query: 'iPhone' },
    { label: 'clean', query: 'clean' },
    { label: 'audio', query: 'Sony' },
    { label: 'repair', query: 'warranty' },
    { label: 'gadget store website', query: 'Pro' },
    { label: 'website ui', query: 'Ultra' },
    { label: 'website design', query: 'Wireless' }
  ];

  // Reusable search bar render helper
  const renderSearchBar = (isCompact: boolean) => {
    return (
      <div className={`relative flex-grow flex items-center bg-white border border-slate-200 hover:border-slate-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:shadow-md rounded-full transition-all duration-300 ${isCompact
        ? 'h-9 pl-3 pr-3.5 max-w-[280px] lg:max-w-sm'
        : 'h-11 pl-4 pr-1.5 w-full shadow-sm'
        }`}>
        <span className="text-slate-400 mr-2 flex-shrink-0">
          <Search className="w-3.5 h-3.5" />
        </span>

        {/* Tag inside search box if a category is selected */}
        {selectedCategory !== 'All' && (
          <div className="flex items-center gap-1 bg-gradient-to-r from-blue-50 to-[#0057ff]/10 border border-[#0057ff]/20 text-[#0057ff] text-[10px] font-extrabold px-2 py-0.5 rounded-full mr-2 select-none flex-shrink-0 animate-in zoom-in-95 duration-150">
            <Tag className="w-2.5 h-2.5" />
            <span>{getShortCategoryName(selectedCategory)}</span>
            <button
              onClick={() => setSelectedCategory('All')}
              className="hover:text-blue-800 font-extrabold ml-0.5"
            >
              ×
            </button>
          </div>
        )}

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search electronic gadgets..."
          className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-slate-400 hover:text-black flex-shrink-0 mr-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Inner Category Tabs & Separator (only in expanded Row 2 mode) */}
        {!isCompact && (
          <>
            {/* Vertical separator */}
            <div className="hidden md:block border-l border-slate-250 h-5 mx-2.5 flex-shrink-0" />

            {/* Inner Category Tabs */}
            <div className="hidden md:flex items-center gap-1.5 flex-shrink-0 mr-1">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3 py-1 rounded-full transition-all text-xs font-bold ${selectedCategory === 'All'
                  ? 'bg-slate-100 text-slate-950 font-black'
                  : 'bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                Projects
              </button>
              {categories.slice(0, 3).map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3 py-1 rounded-full transition-all text-xs font-bold whitespace-nowrap ${selectedCategory === cat.slug
                    ? 'bg-slate-100 text-slate-950 font-black'
                    : 'bg-transparent text-slate-500 hover:text-black hover:bg-slate-50'
                    }`}
                >
                  {getShortCategoryName(cat.slug)}
                </button>
              ))}
            </div>

            {/* Camera / Image search icon (matches cloud-upload icon in Behance) */}
            <button className="h-8 w-8 rounded-full text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all flex-shrink-0 flex items-center justify-center mr-0.5 tooltip" title="Search by Image">
              <Camera className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Suggestions Dropdown */}
        {searchResults.length > 0 && (
          <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150 p-2 space-y-1">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1.5 border-b border-slate-100 text-left">
              Suggested Products
            </span>
            {searchResults.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-2 hover:bg-blue-50/50 rounded-xl transition-all duration-200 gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-50 border border-slate-200 flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800 line-clamp-1">{product.name}</p>
                    <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">{getShortCategoryName(product.category)}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onProductClick(product);
                    setSearchQuery('');
                  }}
                  className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg transition-all flex-shrink-0 hover:shadow-sm"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Sticky Top Bar (Row 1) */}
      <header
        className={`sticky top-0 z-30 w-full transition-[background-color,border-color,box-shadow] duration-200 border-gray-300 ${isScrolled
          ? 'bg-gradient-to-r from-white/95 via-blue-50/20 to-slate-50/50 backdrop-blur-md shadow-md shadow-slate-600/40 border-slate-200/85 border-b'
          : 'bg-gradient-to-r from-slate-50/80 via-white to-blue-50/30 border-slate-150 border-b'
          }`}
      >
        <div className="relative max-w-7xl mx-auto px-0 h-16 flex items-center justify-between gap-4">

          {/* Left Side: Logo & Primary Links */}
          <div className="flex items-center gap-8 flex-shrink-0">


            {/* Primary Nav Links */}
            <nav className="hidden lg:flex items-center gap-6 h-16">
              {/* Product Dropdown link */}
              {/* About link */}
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  if (setCurrentPage) setCurrentPage('about');
                }}
                className={`relative h-full flex items-center text-sm font-bold py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-[#e11d48] after:to-[#0057ff] after:transition-transform after:duration-300 ${currentPage === 'about'
                  ? 'text-slate-950 after:scale-x-100'
                  : 'text-slate-800 hover:text-slate-900 after:scale-x-0 hover:after:scale-x-100 after:origin-left'
                  }`}
              >
                About
              </a>

              {/* Contact link */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  if (setCurrentPage) setCurrentPage('contact');
                }}
                className={`relative h-full flex items-center text-sm font-bold py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-[#e11d48] after:to-[#0057ff] after:transition-transform after:duration-300 ${currentPage === 'contact'
                  ? 'text-slate-950 after:scale-x-100'
                  : 'text-slate-800 hover:text-slate-900 after:scale-x-0 hover:after:scale-x-100 after:origin-left'
                  }`}
              >
                Contact
              </a>

           
              <div ref={categoryRef} className="relative h-full flex items-center">
                <button
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className={`relative h-full flex items-center gap-1.5 text-sm font-bold transition-all cursor-pointer py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-[#e11d48] after:to-[#0057ff] after:transition-transform after:duration-300 ${isCategoryDropdownOpen || currentPage === 'products'
                    ? 'text-slate-950 after:scale-x-100'
                    : 'text-slate-800 hover:text-slate-900 after:scale-x-0 hover:after:scale-x-100 after:origin-left'
                    }`}
                >
                  <span>Products</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                </button>

                {/* megamenu popover */}
                {isCategoryDropdownOpen && (
                  <div className="absolute top-16 left-0 w-[500px] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                    <div className="w-[45%] bg-slate-50 border-r border-slate-100 p-3 space-y-1">
                      <span className="block text-[10px] font-bold text-black uppercase tracking-widest px-3 py-1.5">
                        Categories
                      </span>
                      {categories.map((cat, index) => (
                        <button
                          key={cat.slug}
                          onMouseEnter={() => setActiveCategoryIndex(index)}
                          onClick={() => {
                            setSelectedCategory(cat.slug);
                            setIsCategoryDropdownOpen(false);
                            if (setCurrentPage) setCurrentPage('products');
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold tracking-wide transition-all ${activeCategoryIndex === index
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10'
                            : 'text-slate-660 hover:text-slate-900 hover:bg-slate-150'
                            }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {renderCategoryIcon(cat.icon)}
                            <span>{cat.name}</span>
                          </div>
                          <ChevronDown className="-rotate-90 w-3 h-3 opacity-60" />
                        </button>
                      ))}
                    </div>

                    <div className="w-[55%] p-5 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-950 mb-1.5">
                          {categories[activeCategoryIndex].name}
                        </h4>
                        <p className="text-xs text-slate-555 leading-relaxed mb-4">
                          {categories[activeCategoryIndex].description}
                        </p>

                        <div className="space-y-2">
                          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Popular Gear
                          </span>
                          <ul className="space-y-1.5">
                            {categories[activeCategoryIndex].featured.map((item, i) => (
                              <li
                                key={i}
                                onClick={() => {
                                  setSearchQuery(item);
                                  setIsCategoryDropdownOpen(false);
                                  if (setCurrentPage) setCurrentPage('products');
                                }}
                                className="flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* View All Products CTA */}
                      <div className="pt-4 border-t border-slate-100 mt-4">
                        <button
                          onClick={() => {
                            setSelectedCategory('All');
                            setIsCategoryDropdownOpen(false);
                            if (setCurrentPage) setCurrentPage('products');
                          }}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-50 hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer"
                        >
                          <span>View All Products</span>
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>


            </nav>
          </div>
          {/* Logo - Behance text-style with Red & Blue branding */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (setCurrentPage) setCurrentPage('home');
            }}
            className="flex items-center group transition-transform duration-300 hover:scale-102"
          >
            <span className="text-2xl font-black font-sans tracking-tighter select-none">
              <span className="text-[#e11d48] group-hover:text-[#0057ff] transition-colors duration-300">shiv</span>
              <span className="text-[#0057ff] group-hover:text-[#e11d48] transition-colors duration-300">am</span>
              <span className="text-[#e11d48] relative inline-block group-hover:translate-x-0.5 transition-transform duration-300">
                .
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#0057ff] rounded-full animate-ping opacity-75" />
              </span>
            </span>
          </a>
          {/* Center: Search Bar (ONLY shown when scrolled - making it clean single line) */}
          {isScrolled && (
            <div className="hidden md:flex flex-grow justify-center max-w-sm mx-4 animate-in fade-in duration-200">
              {renderSearchBar(true)}
            </div>
          )}

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-slate-655 hover:text-black rounded-xl hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Wishlist Icon button (Only after login) */}
            {user && (
              <button
                onClick={onOpenWishlist}
                className="p-2.5 text-slate-655 hover:text-red-500 hover:bg-red-50/50 rounded-full transition-colors relative"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 transition-transform hover:scale-110 active:scale-95" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border border-white animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </button>
            )}

            {/* Cart Icon button */}
            <button
              onClick={onOpenCart}
              className="bg-blue-50 hover:bg-blue-100/90 text-blue-600 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 flex items-center gap-1.5 border border-blue-100 hover:shadow-md hover:shadow-blue-500/5 hover:-translate-y-[1px] active:translate-y-0 active:scale-95"
              title="Cart Drawer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
              {totalCartQuantity > 0 && (
                <span className="bg-[#0057ff] text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce shadow-sm shadow-blue-500/20">
                  {totalCartQuantity}
                </span>
              )}
            </button>

            {/* User profile or Blue Login button */}
            {user ? (
              <button
                onClick={() => {
                  if (setCurrentPage) setCurrentPage('profile');
                }}
                className="flex items-center gap-1 focus:outline-none hover:scale-105 active:scale-95 transition-all"
                title="My Account"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-250 hover:border-blue-600 transition-colors">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-gradient-to-r from-[#e11d48] to-[#0057ff] hover:opacity-90 hover:scale-102 text-white rounded-full px-5 py-2.5 text-xs font-bold transition-all shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-[1px] active:translate-y-0 active:scale-95"
              >
                Start Free Trial
              </button>
            )}
          </div>
        </div>

        {/* MOBILE BURGER DRAWER */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed top-16 left-0 w-full h-[calc(100vh-64px)] bg-white z-40 flex flex-col p-6 animate-in fade-in duration-200">
            <div className="flex-1 overflow-y-auto space-y-6">

              {/* Primary links */}
              <div className="space-y-4">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Navigation
                </span>
                <a
                  href="#products"
                  onClick={() => {
                    setSelectedCategory('All');
                    setIsMobileMenuOpen(false);
                    if (setCurrentPage) setCurrentPage('products');
                  }}
                  className="block text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  Products
                </a>
                <a
                  href="#about"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (setCurrentPage) setCurrentPage('about');
                  }}
                  className="block text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  About Us
                </a>
                <a
                  href="#contact"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (setCurrentPage) setCurrentPage('contact');
                  }}
                  className="block text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="#profile"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (setCurrentPage) setCurrentPage('profile');
                  }}
                  className="block text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  My Account
                </a>
              </div>

              {/* Categories segment */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Product Categories
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        setSelectedCategory(cat.slug);
                        setIsMobileMenuOpen(false);
                        if (setCurrentPage) setCurrentPage('products');
                      }}
                      className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 transition-all text-left"
                    >
                      {renderCategoryIcon(cat.icon)}
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer of Mobile Drawer */}
            <div className="pt-6 border-t border-slate-100">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={user.avatar} className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[10px] text-slate-505">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-2 text-red-600 hover:text-red-750 bg-red-50 rounded-xl"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuth();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-[#0057ff] text-white text-xs font-bold rounded-full text-center"
                >
                  Login/Signup
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ROW 2 & ROW 3 (Non-sticky, scrolls away naturally) */}
      <div className="w-full bg-slate-50/50">
        {/* ROW 2: Behance Filter & Search & Category Tabs */}
        <div className="border-b border-gray-300 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-3 w-full">

            {/* Filter button with dropdown */}
            <div ref={filterRef} className="relative flex-shrink-0">
              <button
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className={`flex items-center gap-1.5 px-4 py-2.5 border text-xs font-bold rounded-full transition-all duration-300 cursor-pointer shadow-sm select-none flex-shrink-0 active:scale-95 ${isFilterDropdownOpen || selectedCategory !== 'All'
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 hover:text-blue-600 text-slate-700'
                  }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{selectedCategory === 'All' ? 'Filter' : getShortCategoryName(selectedCategory)}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isFilterDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Filter Dropdown */}
              {isFilterDropdownOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-[240px] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150 p-1.5">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2 border-b border-slate-100 text-left">
                    Filter by Category
                  </span>
                  <div className="space-y-0.5 mt-1">
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        setIsFilterDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-all ${selectedCategory === 'All'
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-black'
                        }`}
                    >
                      All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => {
                          setSelectedCategory(cat.slug);
                          setIsFilterDropdownOpen(false);
                          document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xl transition-all ${selectedCategory === cat.slug
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-black'
                          }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-bold">
                          {products.filter(p => p.category === cat.slug).length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Bar (Centered, fills middle space) */}
            <div className="flex-1 min-w-[200px]">
              {renderSearchBar(false)}
            </div>

            {/* Right Side: Sort Dropdown */}
            <div ref={sortRef} className="relative flex-shrink-0">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center gap-1.5 bg-white border border-slate-200 hover:border-slate-300 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer select-none transition-all duration-300 shadow-sm active:scale-95 text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 rotate-90" />
                <span>{sortBy === 'default' ? 'Recommended' : sortBy === 'low' ? 'Price: Low' : sortBy === 'high' ? 'Price: High' : 'Rating'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isSortDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>

              {isSortDropdownOpen && (
                <div className="absolute top-[calc(100%+8px)] right-0 w-[140px] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in duration-100">
                  <div className="p-1 space-y-0.5">
                    <button
                      onClick={() => { setSortBy('default'); setIsSortDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-black rounded-lg"
                    >
                      Recommended
                    </button>
                    <button
                      onClick={() => { setSortBy('low'); setIsSortDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-black rounded-lg"
                    >
                      Price: Low-High
                    </button>
                    <button
                      onClick={() => { setSortBy('high'); setIsSortDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-black rounded-lg"
                    >
                      Price: High-Low
                    </button>
                    <button
                      onClick={() => { setSortBy('rating'); setIsSortDropdownOpen(false); }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-black rounded-lg"
                    >
                      Top Rated
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ROW 3: Behance Small black capsule tags */}
        <div className="py-2 border-b border-gray-300">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-start gap-1.5">
            {quickTags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => {
                  setSearchQuery(tag.query);
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-[#e11d48] hover:to-[#0057ff] text-[10px] font-extrabold px-4.5 py-2 rounded-full cursor-pointer transition-all duration-300 hover:-translate-y-[1.5px] hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 select-none"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
