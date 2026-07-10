import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';


// Pages
import { Home } from './pages/home/Home';
import { ProductsPage } from './pages/products/ProductsPage';
import { AboutPage } from './pages/about/AboutPage';
import { ContactPage } from './pages/contact/ContactPage';
import { ProductDetailPage } from './pages/product-details/ProductDetailPage';
import { ProfilePage } from './pages/profile/ProfilePage';

// Footer (globally at bottom of active page layout)
import { Footer } from './components/sections/Footer';

import type { Product, CartItem, User, Order } from './types';
import { products } from './data/products';
import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // App States
  const [currentPage, setCurrentPageState] = useState<'home' | 'products' | 'about' | 'contact' | 'product-details' | 'profile'>('home');

  const setCurrentPage = (page: 'home' | 'products' | 'about' | 'contact' | 'product-details' | 'profile') => {
    setCurrentPageState(page);
    if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  // Sync page state when URL changes
  useEffect(() => {
    const path = location.pathname;
    if (path === '/' || path === '/home') {
      setCurrentPageState('home');
    } else if (path === '/about') {
      setCurrentPageState('about');
    } else if (path === '/products') {
      setCurrentPageState('products');
    } else if (path === '/contact') {
      setCurrentPageState('contact');
    } else if (path === '/product-details') {
      setCurrentPageState('product-details');
    } else if (path === '/profile') {
      setCurrentPageState('profile');
    }
  }, [location.pathname]);
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Start with a default item for illustration
    { product: products[2], quantity: 1 } // KCD4 Rocker Switch
  ]);
  const [wishlist, setWishlist] = useState<Product[]>([
    products[0], // 14-Pin IC Socket
    products[1]  // Anjali Power Cord
  ]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-984310',
      date: 'July 04, 2026',
      status: 'Delivered',
      total: products[0].price,
      paymentMethod: 'Credit Card',
      items: [
        {
          product: products[0],
          quantity: 1
        }
      ]
    },
    {
      id: 'ORD-874291',
      date: 'June 20, 2026',
      status: 'In Transit',
      total: products[2].price,
      paymentMethod: 'UPI / GooglePay',
      items: [
        {
          product: products[2],
          quantity: 1
        }
      ]
    },
    {
      id: 'ORD-731092',
      date: 'May 12, 2026',
      status: 'Delivered',
      total: products[1].price,
      paymentMethod: 'Bank Transfer',
      items: [
        {
          product: products[1],
          quantity: 1
        }
      ]
    }
  ]);

  const handlePlaceOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
  };

  // Drawer / Modal triggers
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Search & sorting states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');



  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.product.id === product.id);
      if (existing) {
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
    // Visual cue
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setWishlist(prevList => {
      const exists = prevList.some(item => item.id === product.id);
      if (exists) {
        return prevList.filter(item => item.id !== product.id);
      }
      return [...prevList, product];
    });
  };

  const handleMoveToCart = (product: Product) => {
    handleAddToCart(product);
    // Remove from wishlist
    setWishlist(prevList => prevList.filter(item => item.id !== product.id));
  };

  // Product Selection Details Page
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* NAVBAR */}
      <Navbar 
        cartItems={cartItems}
        wishlist={wishlist}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={() => setUser(null)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onProductClick={handleSelectProduct}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* MAIN ROUTED PAGES */}
      <main className="grow">
        {currentPage === 'home' && (
          <Home 
            products={products}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            isLoggedIn={user !== null}
            onPromptAuth={() => setIsAuthOpen(true)}
            onNavigateToProducts={() => setCurrentPage('products')}
            onSelectCategory={setSelectedCategory}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage 
            products={products}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            isLoggedIn={user !== null}
            onPromptAuth={() => setIsAuthOpen(true)}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'profile' && (
          <ProfilePage 
            user={user}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onProductClick={handleSelectProduct}
            onLogout={() => setUser(null)}
            onPromptAuth={() => setIsAuthOpen(true)}
            orders={orders}
          />
        )}

        {currentPage === 'product-details' && selectedProduct && (
          <ProductDetailPage 
            product={selectedProduct}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            isLoggedIn={user !== null}
            onPromptAuth={() => setIsAuthOpen(true)}
            onBack={() => setCurrentPage('products')}
          />
        )}
      </main>

      {/* GLOBAL FOOTER */}
      <Footer onNavigate={setCurrentPage} />

      {/* DRAWERS & MODALS CONTAINER */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setUser(user);
          setIsAuthOpen(false);
        }}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        user={user}
        onPromptAuth={() => setIsAuthOpen(true)}
        onPlaceOrder={handlePlaceOrder}
      />

      <WishlistDrawer 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => setWishlist(prev => prev.filter(p => p.id !== id))}
        onMoveToCart={handleMoveToCart}
      />


    </div>
  );
}

export default App;
