import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { API_URL } from './config';


// Pages
import { Home } from './pages/home/Home';
import { ProductsPage } from './pages/products/ProductsPage';
import { AboutPage } from './pages/about/AboutPage';
import { ContactPage } from './pages/contact/ContactPage';
import { ProductDetailPage } from './pages/product-details/ProductDetailPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { AdminPage } from './pages/admin/AdminPage';

// Footer (globally at bottom of active page layout)
import { Footer } from './components/sections/Footer';

import type { Product, CartItem, User, Order } from './types';
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
  const [currentPage, setCurrentPageState] = useState<'home' | 'products' | 'about' | 'contact' | 'product-details' | 'profile' | 'admin'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const setCurrentPage = (page: 'home' | 'products' | 'about' | 'contact' | 'product-details' | 'profile' | 'admin') => {
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
      setSelectedCategory('All');
    } else if (path === '/about') {
      setCurrentPageState('about');
      setSelectedCategory('All');
    } else if (path === '/products') {
      setCurrentPageState('products');
    } else if (path === '/contact') {
      setCurrentPageState('contact');
      setSelectedCategory('All');
    } else if (path === '/product-details') {
      setCurrentPageState('product-details');
    } else if (path === '/profile') {
      setCurrentPageState('profile');
      setSelectedCategory('All');
    } else if (path === '/admin') {
      setCurrentPageState('admin');
      setSelectedCategory('All');
    }
  }, [location.pathname]);

  // Dynamic products and categories state (loaded from backend API)
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [, setLoading] = useState(true);

  // Fetch from Express Backend API
  const fetchProductsAndCategories = async () => {
    try {
      const prodRes = await fetch(`${API_URL}/api/products`);
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        // Map _id to id for frontend compatibility
        const formattedProducts = prodData.map((p: any) => ({
          ...p,
          id: p._id || p.id
        }));
        setProducts(formattedProducts);
      }

      const catRes = await fetch(`${API_URL}/api/categories`);
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
      }
    } catch (error) {
      console.warn('Backend server connection failed. No products to display.', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    setCurrentPage('home');
  };
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handlePlaceOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
  };

  // Drawer / Modal triggers
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);



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
    <ErrorBoundary>
      <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
        
        {/* NAVBAR */}
        {currentPage !== 'admin' && (
          <Navbar 
            cartItems={cartItems}
            wishlist={wishlist}
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
            onLogout={handleLogout}
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
            categories={categories}
            products={products}
          />
        )}

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
              categories={categories}
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
              categories={categories}
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
              onLogout={handleLogout}
              onPromptAuth={() => setIsAuthOpen(true)}
              orders={orders}
              onNavigateToProducts={() => setCurrentPage('products')}
            />
          )}

          {currentPage === 'product-details' && selectedProduct && (
            <ProductDetailPage 
              product={selectedProduct}
              products={products}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onAddToCart={handleAddToCart}
              onSelectProduct={handleSelectProduct}
              isLoggedIn={user !== null}
              onPromptAuth={() => setIsAuthOpen(true)}
              onBack={() => setCurrentPage('products')}
            />
          )}

          {currentPage === 'admin' && (
            <AdminPage 
              products={products}
              categories={categories}
              onProductsChange={fetchProductsAndCategories}
            />
          )}
        </main>

        {/* GLOBAL FOOTER */}
        {currentPage !== 'admin' && <Footer onNavigate={setCurrentPage} />}

        {/* DRAWERS & MODALS CONTAINER */}
        <AuthModal 
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={(user, token) => {
            setUser(user);
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('userToken', token);
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
          onStartShopping={() => {
            setIsCartOpen(false);
            setCurrentPage('products');
          }}
        />

        <WishlistDrawer 
          isOpen={isWishlistOpen}
          onClose={() => setIsWishlistOpen(false)}
          wishlist={wishlist}
          onRemoveFromWishlist={(id) => setWishlist(prev => prev.filter(p => p.id !== id))}
          onMoveToCart={handleMoveToCart}
          onExploreProducts={() => {
            setIsWishlistOpen(false);
            setCurrentPage('products');
          }}
        />

      </div>
    </ErrorBoundary>
  );
}


export default App;
