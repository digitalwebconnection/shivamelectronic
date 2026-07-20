import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search, ShoppingCart, Heart,  LogOut, ChevronDown,
  Menu, X, Cpu,
  Power, Cable, Settings, Sun
} from 'lucide-react';
import type { Product, CartItem, User as UserType } from '../types';
import logo from "../assets/image.png"

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
  currentPage?: 'home' | 'products' | 'about' | 'contact' | 'product-details' | 'profile' | 'admin';
  setCurrentPage?: (page: 'home' | 'products' | 'about' | 'contact' | 'product-details' | 'profile' | 'admin') => void;

  // Dynamic products and categories from backend
  categories: any[];
  products: Product[];
}

const getShortCategoryName = (slug: string) => {
  switch (slug.toLowerCase()) {
    case 'connectors':
      return 'Connectors';
    case 'cables':
      return 'Cables';
    case 'switches':
      return 'Switches';
    case 'hardware':
      return 'Hardware';
    case 'optoelectronics':
      return 'Opto';
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

  currentPage = 'home',
  setCurrentPage,
  categories,
  products
}) => {
  // Navigation states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setIsProfileDropdownOpen] = useState(false);


  // Smart Navbar Scroll States
  const [isScrolled, setIsScrolled] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const [isBottomCatDropdownOpen, setIsBottomCatDropdownOpen] = useState(false);
  const [isStickyCatDropdownOpen, setIsStickyCatDropdownOpen] = useState(false);
  const bottomCatRef = useRef<HTMLDivElement>(null);
  const stickyCatRef = useRef<HTMLDivElement>(null);

  // Localized search inputs so typing in one does not update the text in the other
  const [bottomSearchQuery, setBottomSearchQuery] = useState(searchQuery);
  const [stickySearchQuery, setStickySearchQuery] = useState(searchQuery);

  // Sync inputs if parent search query is cleared (e.g. clear filters)
  useEffect(() => {
    if (searchQuery === '') {
      setBottomSearchQuery('');
      setStickySearchQuery('');
    }
  }, [searchQuery]);

  const toSlug = (str: string) => {
    if (!str) return '';
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // Dynamically calculate unique categories from products list
  const dynamicCategories = useMemo(() => {
    const uniqNames = Array.from(new Set(products.map(p => p.category?.trim()).filter(Boolean)));
    return uniqNames.map(name => {
      const slug = toSlug(name);
      const existing = categories.find(c => c.slug.toLowerCase() === slug || c.name.toLowerCase() === name.toLowerCase());
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        slug: slug,
        icon: existing ? existing.icon || 'Cpu' : 'Cpu'
      };
    });
  }, [products, categories]);

  // Compute search suggestions for a given query
  const getSuggestions = (query: string) => {
    if (query.trim() === '') return [];
    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }

      if (bottomCatRef.current && !bottomCatRef.current.contains(event.target as Node)) {
        setIsBottomCatDropdownOpen(false);
      }
      if (stickyCatRef.current && !stickyCatRef.current.contains(event.target as Node)) {
        setIsStickyCatDropdownOpen(false);
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
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Cable': return <Cable className="w-4 h-4" />;
      case 'Power': return <Power className="w-4 h-4" />;
      case 'Settings': return <Settings className="w-4 h-4" />;
      case 'Sun': return <Sun className="w-4 h-4" />;
      default: return <Cpu className="w-4 h-4" />;
    }
  };


  // Reusable search bar render helper
  const renderSearchBar = (isCompact: boolean) => {
    const currentQuery = isCompact ? stickySearchQuery : bottomSearchQuery;
    const searchResults = getSuggestions(currentQuery);
    const isDropdownOpen = isCompact ? isStickyCatDropdownOpen : isBottomCatDropdownOpen;
    const dropdownRef = isCompact ? stickyCatRef : bottomCatRef;

    const handleInputChange = (val: string) => {
      if (isCompact) {
        setStickySearchQuery(val);
      } else {
        setBottomSearchQuery(val);
      }
      setSearchQuery(val);
    };

    const handleClearInput = () => {
      if (isCompact) {
        setStickySearchQuery('');
      } else {
        setBottomSearchQuery('');
      }
      setSearchQuery('');
    };

    const toggleDropdown = (e: React.MouseEvent) => {
      e.preventDefault();
      if (isCompact) {
        setIsStickyCatDropdownOpen(!isStickyCatDropdownOpen);
      } else {
        setIsBottomCatDropdownOpen(!isBottomCatDropdownOpen);
      }
    };

    const closeDropdown = () => {
      if (isCompact) {
        setIsStickyCatDropdownOpen(false);
      } else {
        setIsBottomCatDropdownOpen(false);
      }
    };

    return (
      <div className={`relative grow flex items-center bg-white border border-slate-200 hover:border-slate-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:shadow-md rounded-full transition-all duration-300 ${isCompact
        ? 'h-9 pl-3 pr-1 max-w-[280px] lg:max-w-sm'
        : 'h-11 pl-4 pr-1.5 w-full shadow-sm'
        }`}>
        <span className="text-slate-400 mr-2 shrink-0">
          <Search className="w-3.5 h-3.5" />
        </span>

        <input
          type="text"
          value={currentQuery}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Search electronic components..."
          className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none"
        />

        {currentQuery && (
          <button
            onClick={handleClearInput}
            className="text-slate-400 hover:text-black shrink-0 mr-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Separator line */}
        <div className="border-l border-slate-250 h-5 mx-2.5 shrink-0" />

        {/* Categories Dropdown inside Searchbar */}
        <div ref={dropdownRef} className="relative shrink-0">
          <button
            type="button"
            onClick={toggleDropdown}
            className="flex items-center gap-1 text-[10px] font-black text-slate-700 hover:text-blue-600 tracking-wide uppercase px-2.5 py-1 rounded-full hover:bg-slate-100 transition-all select-none cursor-pointer"
          >
            <span className="max-w-[70px] sm:max-w-[100px] truncate">
              {selectedCategory === 'All' ? 'Categories' : getShortCategoryName(selectedCategory)}
            </span>
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 shrink-0 ${isDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-[calc(100%+8px)] right-0 w-[240px] bg-white border border-slate-200 rounded-md shadow-2xl overflow-hidden z-[60] animate-in fade-in slide-in-from-top-1 duration-150 p-1.5">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2 border-b border-slate-100 text-left">
                Select Category
              </span>
              <div className="space-y-0.5 mt-1 max-h-[250px] overflow-y-auto">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('All');
                    closeDropdown();
                    if (setCurrentPage) setCurrentPage('products');
                    setTimeout(() => {
                      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition-all ${selectedCategory === 'All'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-black'
                    }`}
                >
                  All Categories
                </button>
                {dynamicCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      closeDropdown();
                      if (setCurrentPage) setCurrentPage('products');
                      setTimeout(() => {
                        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-xl transition-all ${selectedCategory === cat.slug
                      ? 'bg-blue-50 text-blue-650 font-black'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-black'
                      }`}
                  >
                    <span className="truncate pr-2 text-left">{cat.name}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md font-bold shrink-0">
                      {products.filter((p: any) => toSlug(p.category) === cat.slug).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

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
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-50 border border-slate-200 shrink-0">
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
                    handleClearInput();
                  }}
                  className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg transition-all shrink-0 hover:shadow-sm"
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
          ? 'bg-linear-to-r from-white/95 via-blue-50/20 to-slate-50/50 backdrop-blur-md shadow-md shadow-slate-600/40 border-slate-200/85 border-b'
          : 'bg-linear-to-r from-slate-50/80 via-white to-blue-50/30 border-slate-150 border-b'
          }`}
      >
        <div className="relative max-w-7xl mx-auto px-0 h-16 flex items-center justify-between gap-4">

          {/* Left Side: Logo & Primary Links */}
          <div className="flex items-center gap-8 shrink-0">


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
                className={`relative h-full flex items-center text-sm font-bold py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-linear-to-r after:from-[#e11d48] after:to-[#0057ff] after:transition-transform after:duration-300 ${currentPage === 'about'
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
                className={`relative h-full flex items-center text-sm font-bold py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-linear-to-r after:from-[#e11d48] after:to-[#0057ff] after:transition-transform after:duration-300 ${currentPage === 'contact'
                  ? 'text-slate-950 after:scale-x-100'
                  : 'text-slate-800 hover:text-slate-900 after:scale-x-0 hover:after:scale-x-100 after:origin-left'
                  }`}
              >
                Contact
              </a>

           
              <button
                onClick={() => {
                  if (setCurrentPage) setCurrentPage('products');
                }}
                className={`relative h-full flex items-center text-sm font-bold py-2 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-linear-to-r after:from-[#e11d48] after:to-[#0057ff] after:transition-transform after:duration-300 ${currentPage === 'products'
                  ? 'text-slate-950 after:scale-x-100'
                  : 'text-slate-800 hover:text-slate-900 after:scale-x-0 hover:after:scale-x-100 after:origin-left cursor-pointer'
                  }`}
              >
                Products
              </button>


            </nav>
          </div>
          {/* Logo - Behance text-style with Red & Blue branding */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (setCurrentPage) setCurrentPage('home');
            }}
            className="flex items-center"
          >
            <img src={logo} alt="logo" className="h-14 md:h-28 w-auto object-contain" />
          </a>
          {/* Center: Search Bar (ONLY shown when scrolled - making it clean single line) */}
          {isScrolled && (
            <div className="hidden md:flex grow justify-center max-w-sm mx-4 animate-in fade-in duration-200">
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
          <div className="flex items-center gap-3 shrink-0">
            {/* Wishlist Icon button (Only after login) */}
            {user && (
              <button
                onClick={onOpenWishlist}
                className="p-2.5 text-slate-655 cursor-pointer hover:text-red-500 hover:bg-red-50/50 rounded-full transition-colors relative"
                title="Wishlist"
              >
                <Heart className="w-5 h-5 transition-transform hover:scale-110 active:scale-95" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[8px] font-black rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
            )}

            {/* Cart Icon button */}
            <button
              onClick={onOpenCart}
              className="bg-blue-50 hover:bg-blue-100/90 cursor-pointer text-blue-600 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 flex items-center gap-1.5 border border-blue-100 hover:shadow-md hover:shadow-blue-500/5 hover:-translate-y-px active:translate-y-0 active:scale-95"
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
                <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer text-white flex items-center justify-center font-black text-xs uppercase border border-slate-200 hover:border-blue-600 transition-colors select-none shadow-sm shadow-blue-500/10">
                  {user.name ? user.name.trim().charAt(0).toUpperCase() : 'U'}
                </div>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-linear-to-r from-[#e11d48] to-[#0057ff] hover:opacity-90 hover:scale-102 text-white rounded-full px-5 py-2.5 text-xs font-bold transition-all shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-px active:translate-y-0 active:scale-95"
              >
                Sign In
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
                    
                </a>
              </div>

              {/* Categories segment */}
              <div className="space-y-3">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Product Categories
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {dynamicCategories.map((cat) => (
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
                    <div className="w-9 h-9 rounded-full bg-linear-to-r from-blue-600 to-indigo-650 text-white flex items-center justify-center font-black text-sm uppercase shrink-0 select-none shadow-sm shadow-blue-500/10 border border-slate-100">
                      {user.name ? user.name.trim().charAt(0).toUpperCase() : 'U'}
                    </div>
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
      {currentPage !== 'profile' && (
        <div 
          className={`w-full bg-slate-50/50 transition-all duration-300 ease-in-out relative z-20 ${
            isScrolled 
              ? 'opacity-0 h-0 overflow-hidden pointer-events-none' 
              : 'opacity-100 h-[69px] overflow-visible border-b border-gray-300 shadow-sm'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-3 w-full">
            {renderSearchBar(false)}
          </div>
        </div>
      )}
    </>
  );
};;
