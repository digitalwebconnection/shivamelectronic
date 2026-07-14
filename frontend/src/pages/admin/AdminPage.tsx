import React, { useState, useEffect, useMemo } from 'react';
import {
  Lock, KeyRound, ShieldAlert, Cpu, 
  Plus, Pencil, Trash2, LogOut, CheckCircle2, Loader2, ChevronUp, ChevronDown,
  Image as ImageIcon, Eye, EyeOff, AlertTriangle,
  Layers, Menu, Package, Tag, LayoutDashboard
} from 'lucide-react';
import type { Product } from '../../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface AdminPageProps {
  products: Product[];
  categories: any[];
  onProductsChange: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  products,
  categories,
  onProductsChange
}) => {
  // Auth state
  const [token, setToken] = useState<string | null>(() => {
    const saved = localStorage.getItem('adminToken');
    if (!saved || saved === 'null' || saved === 'undefined' || saved === '') {
      return null;
    }
    return saved;
  });
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active view: 'overview' | 'products' | 'categories'
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories'>('overview');

  // Sidebar collapse state
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Form modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // --- CUSTOM POPUP MODAL STATES ---
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    type: 'warning' | 'danger' | 'info';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmLabel: 'Confirm',
    type: 'warning',
    onConfirm: () => { }
  });

  const [alertModal, setAlertModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning';
  }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success'
  });

  // Custom Trigger Helpers
  const showCustomConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    type: 'warning' | 'danger' | 'info' = 'warning',
    confirmLabel: string = 'Confirm'
  ) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      confirmLabel,
      type,
      onConfirm: () => {
        onConfirm();
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const showCustomAlert = (
    title: string,
    message: string,
    type: 'success' | 'error' | 'warning' = 'success'
  ) => {
    setAlertModal({
      isOpen: true,
      title,
      message,
      type
    });
  };

  // Product form fields
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('');
  const [prodBrand, setProdBrand] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodRating, setProdRating] = useState('5.0');
  const [prodImageFile, setProdImageFile] = useState<File | null>(null);
  const [prodImagePreview, setProdImagePreview] = useState<string | null>(null);
  const [prodDescription, setProdDescription] = useState('');
  const [prodSpecsText, setProdSpecsText] = useState('');
  const [prodIsNew, setProdIsNew] = useState(false);
  const [prodIsHot, setProdIsHot] = useState(false);

  // Sorting state by Rating
  const [ratingSort, setRatingSort] = useState<'asc' | 'desc'>('desc');

  // Pagination
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile drawer visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const ratingA = parseFloat(a.rating?.toString() || '0');
      const ratingB = parseFloat(b.rating?.toString() || '0');
      return ratingSort === 'asc' ? ratingA - ratingB : ratingB - ratingA;
    });
  }, [products, ratingSort]);

  // Reset to page 1 whenever sort or products change
  useEffect(() => { setCurrentPage(1); }, [ratingSort, products.length]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Category form fields
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catDescription, setCatDescription] = useState('');
  const [catIcon, setCatIcon] = useState('Cpu');

  // Status/Error states for forms
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate stored token on mount
  useEffect(() => {
    if (token) {
      fetch(`${API_URL}/api/auth/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (!res.ok) {
            // Token is invalid/expired or fake, clear it
            localStorage.removeItem('adminToken');
            setToken(null);
          }
        })
        .catch(err => {
          console.error('Error verifying token:', err);
        });
    }
  }, [token]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      setAuthError('Please enter both Admin ID/Email and Password.');
      return;
    }

    setIsLoggingIn(true);
    setAuthError('');

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput, password: passwordInput })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
        showCustomAlert('Login Successful', 'Welcome to Shivam Control Console.', 'success');
      } else {
        setAuthError(data.message || 'Invalid admin credentials.');
      }
    } catch (err) {
      console.error(err);
      setAuthError('Unable to connect to backend server. Make sure server is running.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setIsMobileMenuOpen(false);
  };

  // Handle Logout Button Click (Shows Confirmation warning popup)
  const handleLogoutClick = () => {
    showCustomConfirm(
      'Confirm Logout',
      'Are you sure you want to log out from the Shivam Admin Control Console?',
      handleLogout,
      'warning',
      'Log Out'
    );
  };

  // Auto-fill category slug on name change
  useEffect(() => {
    if (!editingProduct) {
      const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setCatSlug(slug);
    }
  }, [catName]);

  // Open product form (for add or edit)
  const openProductForm = (prod: Product | null = null) => {
    setEditingProduct(prod);
    setFormError('');
    setFormSuccess('');

    if (prod) {
      setProdName(prod.name);
      setProdCategory(prod.category);
      setProdBrand(prod.brand);
      setProdPrice(prod.price.toString());
      setProdRating(prod.rating.toString());
      setProdDescription(prod.description);
      setProdSpecsText(prod.specifications ? prod.specifications.join('\n') : '');
      setProdIsNew(!!prod.isNew);
      setProdIsHot(!!prod.isHot);
      setProdImageFile(null);
      setProdImagePreview(prod.image);
    } else {
      setProdName('');
      setProdCategory('');
      setProdBrand('');
      setProdPrice('0');
      setProdRating('5.0');
      setProdDescription('');
      setProdSpecsText('');
      setProdIsNew(false);
      setProdIsHot(false);
      setProdImageFile(null);
      setProdImagePreview(null);
    }

    setIsProductModalOpen(true);
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProdImageFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setProdImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Product Form (Create or Update)
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!prodName || !prodCategory || !prodBrand || !prodPrice || !prodDescription) {
      setFormError('Please fill in all required fields (Name, Category, Brand, Price, Description).');
      return;
    }

    if (!editingProduct && !prodImageFile) {
      setFormError('Please upload a product image.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('name', prodName);
      formData.append('category', prodCategory);
      formData.append('brand', prodBrand);
      formData.append('price', prodPrice);
      formData.append('rating', prodRating);
      formData.append('description', prodDescription);
      formData.append('specifications', prodSpecsText);
      formData.append('isNew', prodIsNew.toString());
      formData.append('isHot', prodIsHot.toString());

      if (prodImageFile) {
        formData.append('image', prodImageFile);
      }

      const url = editingProduct
        ? `${API_URL}/api/products/${editingProduct.id}`
        : `${API_URL}/api/products`;

      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setFormSuccess(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
        onProductsChange();
        setTimeout(() => {
          setIsProductModalOpen(false);
          setEditingProduct(null);
        }, 1500);
      } else {
        setFormError(data.message || 'Error saving product details.');
      }
    } catch (err) {
      console.error(err);
      setFormError('Failed to connect to backend server. Make sure it is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Product Delete Click (Triggers Custom Modal)
  const handleDeleteProduct = (id: string, name: string) => {
    showCustomConfirm(
      'Delete Product',
      `Are you sure you want to delete the product "${name}"? This action cannot be undone.`,
      () => executeDeleteProduct(id),
      'danger',
      'Delete Product'
    );
  };

  // Actual product deletion execution
  const executeDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        showCustomAlert('Product Deleted', 'The product has been successfully removed from the database.', 'success');
        onProductsChange();
      } else {
        const data = await response.json();
        showCustomAlert('Deletion Failed', data.message || 'Unable to delete the product.', 'error');
      }
    } catch (err) {
      console.error(err);
      showCustomAlert('Connection Error', 'Error connecting to the backend server.', 'error');
    }
  };

  // Submit Category Form
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!catName || !catSlug) {
      setFormError('Name and Slug are required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: catName,
          slug: catSlug,
          description: catDescription,
          icon: catIcon
        })
      });

      const data = await response.json();

      if (response.ok) {
        setFormSuccess('Category created successfully!');
        onProductsChange();
        setCatName('');
        setCatSlug('');
        setCatDescription('');
        setCatIcon('Cpu');
        setTimeout(() => {
          setIsCategoryModalOpen(false);
        }, 1500);
      } else {
        setFormError(data.message || 'Failed to save category.');
      }
    } catch (err) {
      console.error(err);
      setFormError('Connection to server failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDER LOGIN VIEW (LIGHT THEME) ---
  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Colorful Background Gradients */}
        <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-blue-100/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-rose-100/40 rounded-full blur-3xl animate-pulse" />

        <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-8 shadow-2xl relative z-10">
          <div className="text-center space-y-3">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/10">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight font-serif">
              Admin Gateway
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Please enter your admin credentials to access the console.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">
                  Admin ID / Email
                </label>
                <div className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-blue-500 rounded-md px-4 py-3 transition-colors">
                  <span className="text-slate-400 mr-3">
                    <KeyRound className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="admin@shivam.com"
                    className="bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none w-full font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">
                  Password
                </label>
                <div className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-blue-500 rounded-md px-4 py-3 transition-colors">
                  <span className="text-slate-400 mr-3">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none w-full font-semibold pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {authError && (
              <div className="flex items-center gap-2.5 p-3.5 bg-rose-50 border border-rose-100 text-rose-700 text-xs rounded-md">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500" />
                <span className="font-semibold">{authError}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-md text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-blue-600 hover:opacity-95 focus:outline-none transition-all cursor-pointer shadow-lg shadow-blue-500/10 active:scale-98"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <span>Log In to Dashboard</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER ADMIN DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 flex flex-col md:flex-row font-sans overflow-hidden w-full h-screen relative">
      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Left Sidebar (Collapsible drawer on mobile, static on desktop) */}
      <aside
        className={`bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 transition-transform md:transition-all duration-300 select-none z-40
          fixed inset-y-0 left-0 md:relative md:flex h-full md:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'md:w-18' : 'md:w-64 w-64'}
        `}
      >
        <div>
          {/* Logo Brand Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between h-16 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 to-blue-600 flex items-center justify-center shadow-md shrink-0">
                <Layers className="w-4 h-4 text-white" />
              </div>
              {(!isCollapsed || isMobileMenuOpen) && (
                <span className="font-black text-slate-805 text-sm tracking-wide uppercase font-sans truncate">
                  Shivam Admin
                </span>
              )}
            </div>
            {/* Close drawer button for mobile screens */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-800"
            >
              ×
            </button>
          </div>

          <div className="p-3 space-y-4">
            {/* Collapse Trigger Button (Desktop Only) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden md:flex w-full items-center gap-3 px-3 py-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-all text-xs font-bold cursor-pointer text-left"
            >
              <Menu className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Collapse Menu</span>}
            </button>

            {/* Menu Items */}
            <nav className="flex flex-col gap-1.5 pt-2">
              <button
                onClick={() => {
                  setActiveTab('overview');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-md text-left text-xs font-bold transition-all cursor-pointer ${activeTab === 'overview'
                  ? 'border border-amber-500/30 bg-amber-500/5 text-amber-600 font-extrabold'
                  : 'text-slate-500 hover:text-slate-850 hover:bg-slate-100'
                  }`}
              >
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                {(!isCollapsed || isMobileMenuOpen) && <span>Overview Stats</span>}
              </button>

              <button
                onClick={() => {
                  setActiveTab('products');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-md text-left text-xs font-bold transition-all cursor-pointer ${activeTab === 'products'
                  ? 'border border-amber-500/30 bg-amber-500/5 text-amber-600 font-extrabold'
                  : 'text-slate-500 hover:text-slate-850 hover:bg-slate-100'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Cpu className="w-4 h-4 shrink-0" />
                  {(!isCollapsed || isMobileMenuOpen) && <span>Products</span>}
                </div>
                {(!isCollapsed || isMobileMenuOpen) && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-md font-black transition-all ${activeTab === 'products' ? 'bg-amber-500/10 text-amber-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {products.length}
                  </span>
                )}

              </button>
            </nav>
          </div>
        </div>

        {/* Sidebar Footer - Log Out Button */}
        <div className="p-3 border-t border-slate-200 bg-slate-50">
          <button
            onClick={handleLogoutClick}
            className={`w-full flex items-center gap-3 px-3.5 py-3 text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 rounded-md text-xs font-bold transition-all cursor-pointer text-left ${isCollapsed && !isMobileMenuOpen ? 'justify-center' : ''
              }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {(!isCollapsed || isMobileMenuOpen) && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Top Header Bar */}
        <header className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 h-16 w-full shrink-0 z-20 shadow-xs select-none">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 hover:bg-slate-100 rounded-md text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-black text-slate-805 text-xs tracking-wider uppercase font-sans">
            Shivam Admin
          </span>
          <div className="w-9" /> {/* Visual spacer balancing menu icon */}
        </header>

        {/* Right Main Details Content (Light) */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 custom-scrollbar bg-slate-50/50 h-full">
          {/* --- VIEW: OVERVIEW TAB --- */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200 w-full">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-md p-4 sm:p-6 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inventory Size</span>
                    <p className="text-3xl font-black text-slate-800 mt-1">{products.length}</p>
                    <span className="text-[10px] text-slate-455 font-bold block mt-1">Active electronic items</span>
                  </div>
                  <div className="w-12 h-12 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <Package className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-md p-4 sm:p-6 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Categories Count</span>
                    <p className="text-3xl font-black text-slate-800 mt-1">{categories.length}</p>
                    <span className="text-[10px] text-slate-455 font-bold block mt-1">Filters and sections</span>
                  </div>
                  <div className="w-12 h-12 rounded-md bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                    <Tag className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- VIEW: PRODUCTS TAB --- */}
          {activeTab === 'products' && (
            <div className="bg-white border border-slate-200 rounded-md sm:rounded-md shadow-sm overflow-hidden animate-in fade-in duration-200 flex flex-col w-full">
              <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Product Inventory</h3>
                  <p className="text-xs text-slate-400 mt-1">Add, edit, or delete items from the database catalog.</p>
                </div>
                <button
                  onClick={() => openProductForm(null)}
                  className="flex items-center gap-1.5 px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer active:scale-95 border border-transparent"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>

              {products.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <th className="py-3 px-3 sm:px-6 text-center w-12">#</th>
                        <th className="py-3 px-3 sm:px-6">Product Details</th>
                        <th className="py-3 px-3 sm:px-6">Category</th>
                        <th className="py-3 px-3 sm:px-6">Brand</th>
                        <th
                          className="py-3 px-3 sm:px-6 text-center cursor-pointer select-none hover:bg-slate-100 transition-colors"
                          onClick={() => setRatingSort(prev => prev === 'asc' ? 'desc' : 'asc')}
                        >
                          <div className="flex items-center justify-center gap-1">
                            <span>Rating</span>
                            <div className="flex flex-col -space-y-1">
                              <ChevronUp className={`w-3 h-3 ${ratingSort === 'asc' ? 'text-blue-600 font-bold' : 'text-slate-300'}`} />
                              <ChevronDown className={`w-3 h-3 ${ratingSort === 'desc' ? 'text-blue-600 font-bold' : 'text-slate-300'}`} />
                            </div>
                          </div>
                        </th>
                        <th className="py-3 px-3 sm:px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                      {paginatedProducts.map((prod, index) => (
                        <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 sm:px-6 text-center font-bold text-slate-400">
                            {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                          </td>
                          <td className="py-3 px-3 sm:px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-slate-50 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                                <img src={prod.image} alt={prod.name} className="w-full h-full object-contain" />
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 max-w-xs truncate" title={prod.name}>{prod.name}</p>
                                <span className="text-[9px] text-slate-400 truncate max-w-xs block mt-0.5" title={prod.description}>{prod.description}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 sm:px-6">
                            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-black text-[10px] uppercase">
                              {prod.category}
                            </span>
                          </td>
                          <td className="py-3 px-3 sm:px-6 font-bold text-slate-800">{prod.brand}</td>
                          <td className="py-3 px-3 sm:px-6 text-center font-bold text-amber-605">{prod.rating} ⭐</td>
                          <td className="py-3 px-3 sm:px-6">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => openProductForm(prod)}
                                className="p-2 border border-slate-200 hover:border-blue-300 text-slate-555 hover:text-blue-600 hover:bg-blue-50/50 rounded-md transition-colors cursor-pointer"
                                title="Edit product"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(prod.id, prod.name)}
                                className="p-2 border border-slate-200 hover:border-rose-300 text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 rounded-md transition-colors cursor-pointer"
                                title="Delete product"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-16 text-center space-y-3">
                  <p className="text-slate-400 text-sm font-semibold">No products found in the database catalog.</p>
                  <button
                    onClick={() => openProductForm(null)}
                    className="px-4 py-2 bg-blue-650 text-white text-xs font-bold rounded-lg"
                  >
                    Create First Product
                  </button>
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="px-4 sm:px-6 py-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[10px] font-bold text-slate-400">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length)} of {sortedProducts.length} products
                  </span>
                  <div className="flex items-center gap-1">
                    {/* Prev */}
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-2.5 py-1.5 rounded-md text-[10px] font-bold border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      ‹ Prev
                    </button>

                    {/* Page number buttons */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                      .reduce<(number | 'ellipsis')[]>((acc, p, idx, arr) => {
                        if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('ellipsis');
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((item, idx) =>
                        item === 'ellipsis' ? (
                          <span key={`ellipsis-${idx}`} className="px-1 text-slate-300 text-[10px] font-bold select-none">…</span>
                        ) : (
                          <button
                            key={item}
                            onClick={() => setCurrentPage(item as number)}
                            className={`w-7 h-7 rounded-md text-[10px] font-bold border transition-all ${
                              currentPage === item
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                : 'border-slate-200 text-slate-500 hover:bg-slate-100'
                            }`}
                          >
                            {item}
                          </button>
                        )
                      )
                    }

                    {/* Next */}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-2.5 py-1.5 rounded-md text-[10px] font-bold border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Next ›
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* --- MODAL: PRODUCT FORM --- */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs overflow-y-auto" data-lenis-prevent>
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-md shadow-2xl overflow-hidden max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 text-slate-805">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-800 uppercase tracking-wider">
                  {editingProduct ? 'Edit Product Details' : 'Add New Catalog Product'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">Specify specifications, description, categories, and brand.</p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="w-8 h-8 rounded-md bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-505 hover:text-slate-800 transition-colors flex items-center justify-center cursor-pointer font-bold"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleProductSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
              {formError && (
                <div className="p-3.5 bg-rose-50 border border-rose-100 text-rose-700 text-xs rounded-md flex items-center gap-2 font-semibold">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{formError}</span>
                </div>
              )}
              {formSuccess && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs rounded-md flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                  <span>{formSuccess}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="e.g. GX16 4-Pin Aviation Plug"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 px-3 py-2.5 rounded-md text-xs font-bold text-slate-700 outline-none transition-all"
                  />
                </div>

                {/* Brand */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={prodBrand}
                    onChange={(e) => setProdBrand(e.target.value)}
                    placeholder="e.g. MCT, Anjali, Shivam"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 px-3 py-2.5 rounded-md text-xs font-bold text-slate-700 outline-none transition-all"
                  />
                </div>

                {/* Category Selection */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    list="category-suggestions"
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    placeholder="Select or type category..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 px-3 py-2.5 rounded-md text-xs font-bold text-slate-700 outline-none transition-all"
                  />
                  <datalist id="category-suggestions">
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </datalist>
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    Rating (1-5 Stars) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    required
                    value={prodRating}
                    onChange={(e) => setProdRating(e.target.value)}
                    placeholder="5.0"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 px-3 py-2.5 rounded-md text-xs font-bold text-slate-700 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Product Image Upload */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                  Product Image {editingProduct ? '(Optional to replace)' : '*'}
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-center bg-slate-50 border border-slate-200 border-dashed rounded-md p-4">
                  <div className="w-24 h-24 rounded-md bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center relative">
                    {prodImagePreview ? (
                      <img src={prodImagePreview} alt="Preview" className="w-full h-full object-contain" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-300" />
                    )}
                  </div>
                  <div className="space-y-1.5 grow text-center sm:text-left">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="text-xs text-slate-550 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-black file:bg-blue-50 file:text-blue-700 file:hover:bg-blue-100 cursor-pointer"
                    />
                    <p className="text-[10px] text-slate-400">Supported types: JPG, PNG, WEBP. Max size: 5MB.</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                  Product Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={prodDescription}
                  onChange={(e) => setProdDescription(e.target.value)}
                  placeholder="Provide a comprehensive description of features, materials, and potential applications."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 px-3.5 py-2.5 rounded-md text-xs font-bold text-slate-700 outline-none transition-all resize-y"
                />
              </div>

              {/* Specifications List */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    Key Specifications
                  </label>
                  <span className="text-[8px] bg-slate-100 border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-black">
                    One specification per line
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={prodSpecsText}
                  onChange={(e) => setProdSpecsText(e.target.value)}
                  placeholder="e.g.&#10;Pin Configuration: 4-Pin&#10;Thread size: GX16 standard&#10;Working Voltage: 250V AC&#10;Contacts: Gold-plated brass"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 px-3.5 py-2.5 rounded-md text-xs font-mono font-bold text-slate-700 outline-none transition-all resize-y"
                />
              </div>



              {/* Form Actions */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-md text-xs font-bold text-slate-500 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving to Cloud...</span>
                    </>
                  ) : (
                    <span>Save Product</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: CATEGORY FORM --- */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs" data-lenis-prevent>
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden w-full max-w-md animate-in fade-in zoom-in-95 duration-200 text-slate-800">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-805 uppercase tracking-wider">Add Dynamic Category</h3>
                <p className="text-xs text-slate-400 mt-1">Filters on navbar and sidebar will refresh automatically.</p>
              </div>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-550 flex items-center justify-center font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 text-xs rounded-md flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-550" />
                  <span>{formError}</span>
                </div>
              )}
              {formSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs rounded-md flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{formSuccess}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="e.g. Microcontrollers"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 px-3 py-2.5 rounded-md text-xs font-bold text-slate-700 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                  Slug (Auto-generated) *
                </label>
                <input
                  type="text"
                  required
                  value={catSlug}
                  onChange={(e) => setCatSlug(e.target.value.toLowerCase())}
                  placeholder="microcontrollers"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 px-3 py-2.5 rounded-md text-xs font-mono font-bold text-slate-700 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                  Icon Representer
                </label>
                <select
                  value={catIcon}
                  onChange={(e) => setCatIcon(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 px-3 py-2.5 rounded-md text-xs font-bold text-slate-700 outline-none transition-all cursor-pointer"
                >
                  <option value="Cpu" className="text-slate-700">Cpu (Connectors, Chips)</option>
                  <option value="Cable" className="text-slate-700">Cable (Wires, Power cords)</option>
                  <option value="Power" className="text-slate-700">Power (Switches, Relays)</option>
                  <option value="Settings" className="text-slate-700">Settings (Hardware, Spacers)</option>
                  <option value="Sun" className="text-slate-700">Sun (LEDs, Lights, Screens)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={catDescription}
                  onChange={(e) => setCatDescription(e.target.value)}
                  placeholder="Brief summary of electronic products in this category..."
                  className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 px-3 py-2 rounded-md text-xs font-bold text-slate-700 outline-none transition-all"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-md text-xs font-bold text-slate-500 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2 bg-blue-650 hover:bg-blue-600 text-white rounded-md text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <span>Add Category</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CUSTOM DIALOG: CONFIRMATION MODAL --- */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-955/40 backdrop-blur-xs animate-in fade-in duration-250">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-md p-6 shadow-2xl animate-in zoom-in-95 duration-200 space-y-4 text-slate-800">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${confirmModal.type === 'danger' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                }`}>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">{confirmModal.title}</h4>
            </div>

            <p className="text-xs font-semibold text-slate-600 leading-relaxed">
              {confirmModal.message}
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-55 rounded-md text-xs font-bold text-slate-500 transition-all cursor-pointer select-none"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmModal.onConfirm}
                className={`px-5 py-2 text-white rounded-md text-xs font-bold transition-all cursor-pointer shadow-md select-none ${confirmModal.type === 'danger'
                  ? 'bg-rose-600 hover:bg-rose-550 shadow-rose-500/10'
                  : 'bg-amber-600 hover:bg-amber-550 shadow-amber-500/10'
                  }`}
              >
                {confirmModal.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CUSTOM DIALOG: ALERT MODAL --- */}
      {alertModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-955/40 backdrop-blur-xs animate-in fade-in duration-250">
          <div className="relative w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 space-y-4 text-center text-slate-800">
            <div className="mx-auto w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mb-2 bg-slate-50 border border-slate-200">
              {alertModal.type === 'success' && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
              {alertModal.type === 'error' && <ShieldAlert className="w-6 h-6 text-rose-600" />}
              {alertModal.type === 'warning' && <AlertTriangle className="w-6 h-6 text-amber-600" />}
            </div>

            <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">{alertModal.title}</h4>
            <p className="text-xs font-semibold text-slate-600 leading-relaxed">
              {alertModal.message}
            </p>

            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
                className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold transition-all cursor-pointer shadow-md select-none border border-transparent"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
