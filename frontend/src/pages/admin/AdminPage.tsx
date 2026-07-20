import React, { useState, useEffect, useMemo } from 'react';
import {
  Lock, KeyRound, ShieldAlert, Cpu,
  Plus, Pencil, Trash2, LogOut, CheckCircle2, Loader2, ChevronUp, ChevronDown,
  Image as ImageIcon, Eye, EyeOff, AlertTriangle,
  Layers, Menu, Package, Tag, LayoutDashboard, Search, Users, ShoppingBag, Calendar, Clock, Check, XCircle, RefreshCw
} from 'lucide-react';
import type { Product, Order } from '../../types';
import { API_URL } from '../../config';

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
  // Avoid unused variable check error
  useEffect(() => { }, [categories]);

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

  // Active view: 'overview' | 'products' | 'categories' | 'users' | 'orders'
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'categories' | 'users' | 'orders'>('overview');

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

  const [toast, setToast] = useState<{
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

  const showToast = (
    title: string,
    message: string,
    type: 'success' | 'error' | 'warning' = 'success'
  ) => {
    setToast({
      isOpen: true,
      title,
      message,
      type
    });
  };

  useEffect(() => {
    if (toast.isOpen) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, isOpen: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.isOpen]);

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
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [prodBrand, setProdBrand] = useState('');
  const [prodRating, setProdRating] = useState('5.0');
  const [prodImageFile, setProdImageFile] = useState<File | null>(null);
  const [prodImagePreview, setProdImagePreview] = useState<string | null>(null);
  const [prodDescription, setProdDescription] = useState('');
  const [prodSpecsText, setProdSpecsText] = useState('');
  const [prodIsHot, setProdIsHot] = useState(false);

  // Search query state
  const [searchQuery, setSearchQuery] = useState('');

  // Sorting state by Rating
  const [ratingSort, setRatingSort] = useState<'asc' | 'desc'>('desc');

  // Pagination
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Mobile drawer visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter products by name, category, and brand case-insensitively
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase().trim();
    return products.filter(p =>
      (p.name?.toLowerCase().includes(query)) ||
      (p.category?.toLowerCase().includes(query)) ||
      (p.brand?.toLowerCase().includes(query))
    );
  }, [products, searchQuery]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const ratingA = parseFloat(a.rating?.toString() || '0');
      const ratingB = parseFloat(b.rating?.toString() || '0');
      return ratingSort === 'asc' ? ratingA - ratingB : ratingB - ratingA;
    });
  }, [filteredProducts, ratingSort]);

  // Count of unique categories in product inventory
  const uniqueCategoriesCount = useMemo(() => {
    const uniq = new Set(
      products
        .map(p => p.category?.trim().toLowerCase())
        .filter(Boolean)
    );
    return uniq.size;
  }, [products]);

  // Reset to page 1 whenever sort, products, or search query changes
  useEffect(() => { setCurrentPage(1); }, [ratingSort, products.length, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / ITEMS_PER_PAGE));
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Category form fields
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catIcon, setCatIcon] = useState('Cpu');

  const openCategoryForm = (cat: any | null = null) => {
    setEditingCategory(cat);
    setFormError('');
    setFormSuccess('');
    if (cat) {
      setCatName(cat.name || '');
      setCatSlug(cat.slug || '');
      setCatIcon(cat.icon || 'Cpu');
    } else {
      setCatName('');
      setCatSlug('');
      setCatIcon('Cpu');
    }
    setIsCategoryModalOpen(true);
  };

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
      'danger',
      'Log Out'
    );
  };

  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const fetchUsers = async () => {
    if (!token) return;
    setLoadingUsers(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users list');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
      fetchOrders();
    }
  }, [token]);

  // Order management state
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'All' | 'Pending' | 'Confirmed' | 'Cancelled'>('All');
  const [orderDateStart, setOrderDateStart] = useState('');
  const [orderDateEnd, setOrderDateEnd] = useState('');
  const [orderSortBy, setOrderSortBy] = useState<'date-desc' | 'date-asc' | 'qty-desc' | 'qty-asc'>('date-desc');
  const [orderCurrentPage, setOrderCurrentPage] = useState(1);
  const ORDERS_PER_PAGE = 10;

  const fetchOrders = async () => {
    if (!token) return;
    setLoadingOrders(true);
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        const formatted = data.map((o: any) => ({
          ...o,
          id: o._id || o.id || o.orderId,
          date: o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : o.date
        }));
        setOrders(formatted);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: 'Pending' | 'Confirmed' | 'Cancelled') => {
    try {
      const response = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        const updated = await response.json();
        setOrders(prev => prev.map(o => (o._id === orderId || o.id === orderId || o.orderId === orderId) ? { ...o, status: updated.status } : o));
        showToast('Status Updated', `Order ${updated.orderId || orderId} status changed to ${newStatus}.`, 'success');
      } else {
        const data = await response.json();
        showCustomAlert('Update Failed', data.message || 'Unable to update order status.', 'error');
      }
    } catch (err) {
      console.error(err);
      showCustomAlert('Connection Error', 'Error connecting to backend server.', 'error');
    }
  };

  // Filter orders by search, status filter, and date range
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Status filter
      if (orderStatusFilter !== 'All') {
        if (order.status?.toLowerCase() !== orderStatusFilter.toLowerCase()) {
          return false;
        }
      }

      // Search query (Product name, Brand, Order ID, Customer Name, Customer Email)
      if (orderSearchQuery.trim()) {
        const query = orderSearchQuery.toLowerCase().trim();
        const matchesOrderId = order.orderId?.toLowerCase().includes(query) || order.id?.toLowerCase().includes(query);
        const matchesCustomer = order.customerName?.toLowerCase().includes(query) || order.customerEmail?.toLowerCase().includes(query);
        const matchesItems = order.items?.some(item => {
          const pName = item.productName || item.product?.name || '';
          const pBrand = item.brand || item.product?.brand || '';
          return pName.toLowerCase().includes(query) || pBrand.toLowerCase().includes(query);
        });

        if (!matchesOrderId && !matchesCustomer && !matchesItems) {
          return false;
        }
      }

      // Date Range filter
      if (orderDateStart || orderDateEnd) {
        const orderTime = new Date(order.createdAt || order.date).getTime();
        if (!isNaN(orderTime)) {
          if (orderDateStart) {
            const startTime = new Date(orderDateStart).setHours(0, 0, 0, 0);
            if (orderTime < startTime) return false;
          }
          if (orderDateEnd) {
            const endTime = new Date(orderDateEnd).setHours(23, 59, 59, 999);
            if (orderTime > endTime) return false;
          }
        }
      }

      return true;
    });
  }, [orders, orderStatusFilter, orderSearchQuery, orderDateStart, orderDateEnd]);

  // Sort orders by date or total quantity
  const sortedOrders = useMemo(() => {
    return [...filteredOrders].sort((a, b) => {
      if (orderSortBy === 'date-desc') {
        const timeA = new Date(a.createdAt || a.date).getTime();
        const timeB = new Date(b.createdAt || b.date).getTime();
        return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
      }
      if (orderSortBy === 'date-asc') {
        const timeA = new Date(a.createdAt || a.date).getTime();
        const timeB = new Date(b.createdAt || b.date).getTime();
        return (isNaN(timeA) ? 0 : timeA) - (isNaN(timeB) ? 0 : timeB);
      }
      if (orderSortBy === 'qty-desc') {
        const qtyA = a.totalQuantity || a.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        const qtyB = b.totalQuantity || b.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        return qtyB - qtyA;
      }
      if (orderSortBy === 'qty-asc') {
        const qtyA = a.totalQuantity || a.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        const qtyB = b.totalQuantity || b.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        return qtyA - qtyB;
      }
      return 0;
    });
  }, [filteredOrders, orderSortBy]);

  useEffect(() => {
    setOrderCurrentPage(1);
  }, [orderStatusFilter, orderSearchQuery, orderDateStart, orderDateEnd, orderSortBy]);

  const totalOrderPages = Math.max(1, Math.ceil(sortedOrders.length / ORDERS_PER_PAGE));
  const paginatedOrders = sortedOrders.slice(
    (orderCurrentPage - 1) * ORDERS_PER_PAGE,
    orderCurrentPage * ORDERS_PER_PAGE
  );

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
      const exists = categories.some(cat => cat.name.toLowerCase() === prod.category.toLowerCase());
      setIsCustomCategory(!exists);
      setProdBrand(prod.brand);
      setProdRating(prod.rating.toString());
      setProdDescription(prod.description);
      setProdSpecsText(prod.specifications ? prod.specifications.join('\n') : '');
      setProdIsHot(!!prod.isHot);
      setProdImageFile(null);
      setProdImagePreview(prod.image);
    } else {
      setProdName('');
      setProdCategory('');
      setIsCustomCategory(false);
      setProdBrand('');
      setProdRating('5.0');
      setProdDescription('');
      setProdSpecsText('');
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

    if (!prodName || !prodCategory || !prodBrand || !prodDescription) {
      setFormError('Please fill in all required fields (Name, Category, Brand, Description).');
      return;
    }

    if (prodIsHot) {
      const currentHotCount = products.filter(p => p.isHot && p.id !== editingProduct?.id).length;
      if (currentHotCount >= 2) {
        setFormError('Only exactly 2 products can be selected as Super Hot Deals. Please deselect another product first.');
        return;
      }
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
      formData.append('rating', prodRating);
      formData.append('description', prodDescription);
      formData.append('specifications', prodSpecsText);
      formData.append('isRecent', 'false');
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

  // Inline toggle for hot status
  const handleToggleHot = async (prod: Product) => {
    const currentHotCount = products.filter(p => p.isHot && p.id !== prod.id).length;
    if (!prod.isHot && currentHotCount >= 2) {
      showCustomAlert(
        'Limit Reached',
        'Only exactly 2 products can be selected as Super Hot Deals. Please deselect another product first.',
        'warning'
      );
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/products/${prod.id}/toggle-hot`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        showToast('Status Updated', `${prod.name} hot status updated.`, 'success');
        onProductsChange();
      } else {
        const data = await response.json();
        showCustomAlert('Update Failed', data.message || 'Unable to update hot status.', 'error');
      }
    } catch (err) {
      console.error(err);
      showCustomAlert('Connection Error', 'Error connecting to the backend server.', 'error');
    }
  };

  // Handle Category Delete Click (Triggers Custom Modal)
  const handleDeleteCategory = (slug: string, name: string) => {
    showCustomConfirm(
      'Delete Category',
      `Are you sure you want to delete the category "${name}"? This action cannot be undone.`,
      () => executeDeleteCategory(slug),
      'danger',
      'Delete Category'
    );
  };

  // Actual category deletion execution
  const executeDeleteCategory = async (slug: string) => {
    try {
      const response = await fetch(`${API_URL}/api/categories/${slug}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        showToast('Category Deleted', 'The category has been successfully removed from the database.', 'success');
        onProductsChange();
      } else {
        const data = await response.json();
        showCustomAlert('Deletion Failed', data.message || 'Unable to delete the category.', 'error');
      }
    } catch (err) {
      console.error(err);
      showCustomAlert('Connection Error', 'Error connecting to the backend server.', 'error');
    }
  };


  // Submit Category Form (Create or Update)
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    const generatedSlug = catSlug || catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    if (!catName || !generatedSlug) {
      setFormError('Name is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const url = editingCategory
        ? `${API_URL}/api/categories/${editingCategory._id || editingCategory.id}`
        : `${API_URL}/api/categories`;
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: catName,
          slug: generatedSlug,
          icon: catIcon || 'Cpu'
        })
      });

      const data = await response.json();

      if (response.ok) {
        onProductsChange();
        setCatName('');
        setCatSlug('');
        setCatIcon('Cpu');
        setIsCategoryModalOpen(false);
        setEditingCategory(null);
        showToast(
          editingCategory ? 'Category Updated' : 'Category Added',
          editingCategory ? 'Category details updated successfully.' : 'The category has been successfully added to the database.',
          'success'
        );
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
          <div className={`p-4 border-b border-slate-200 flex items-center h-16 shrink-0 transition-all ${isCollapsed && !isMobileMenuOpen ? 'justify-center' : 'justify-between'
            }`}>
            <div className="flex items-center gap-3">
              {/* Brand logo container which becomes hoverable when collapsed */}
              <button
                disabled={!isCollapsed || isMobileMenuOpen}
                onClick={() => isCollapsed && !isMobileMenuOpen && setIsCollapsed(false)}
                className={`relative w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 to-blue-600 flex items-center justify-center shadow-md shrink-0 group ${isCollapsed && !isMobileMenuOpen ? 'cursor-ew-resize hover:from-amber-500 hover:to-blue-700' : 'cursor-default'
                  }`}
              >
                <span className={`transition-opacity duration-150 ${isCollapsed && !isMobileMenuOpen ? 'group-hover:opacity-0' : 'opacity-100'}`}>
                  <Layers className="w-4 h-4 text-white" />
                </span>
                {isCollapsed && !isMobileMenuOpen && (
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <Menu className="w-4 h-4 text-white" />
                  </span>
                )}
              </button>
              {(!isCollapsed || isMobileMenuOpen) && (
                <span className="font-black text-slate-805 text-sm tracking-wide uppercase font-sans truncate">
                  Shivam Admin
                </span>
              )}
            </div>

            {/* Desktop toggle sidebar collapse button (only visible when sidebar is NOT collapsed) */}
            {(!isCollapsed || isMobileMenuOpen) && (
              <button
                onClick={() => setIsCollapsed(true)}
                className="hidden md:flex p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-800 transition-colors cursor-ew-resize"
                title="Collapse sidebar"
              >
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M9 3v18"></path>
                </svg>
              </button>
            )}

            {/* Close drawer button for mobile screens */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-800"
            >
              ×
            </button>
          </div>

          <div className="p-3 space-y-4">
            {/* Menu Items */}
            <nav className="flex flex-col gap-1.5 pt-2">
              <button
                onClick={() => {
                  setActiveTab('overview');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-md text-left text-xs font-bold transition-all cursor-pointer ${isCollapsed && !isMobileMenuOpen ? 'justify-center' : ''
                  } ${activeTab === 'overview'
                    ? 'bg-slate-100 text-slate-800 font-bold'
                    : 'text-slate-800 hover:text-slate-850 hover:bg-slate-100'
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
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-md text-left text-xs font-bold transition-all cursor-pointer ${isCollapsed && !isMobileMenuOpen ? 'justify-center' : 'justify-between'
                  } ${activeTab === 'products'
                    ? 'bg-slate-100 text-slate-800 font-bold'
                    : 'text-slate-800 hover:text-slate-850 hover:bg-slate-100'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Cpu className="w-4 h-4 shrink-0" />
                  {(!isCollapsed || isMobileMenuOpen) && <span>Products</span>}
                </div>
                {(!isCollapsed || isMobileMenuOpen) && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-md font-black transition-all ${activeTab === 'products' ? 'bg-slate-300 text-slate-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {products.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab('categories');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-md text-left text-xs font-bold transition-all cursor-pointer ${isCollapsed && !isMobileMenuOpen ? 'justify-center' : 'justify-between'
                  } ${activeTab === 'categories'
                    ? 'bg-slate-100 text-slate-800 font-bold'
                    : 'text-slate-800 hover:text-slate-850 hover:bg-slate-100'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Tag className="w-4 h-4 shrink-0" />
                  {(!isCollapsed || isMobileMenuOpen) && <span>Categories</span>}
                </div>
                {(!isCollapsed || isMobileMenuOpen) && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-md font-black transition-all ${activeTab === 'categories' ? 'bg-slate-300 text-slate-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {categories.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab('users');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-md text-left text-xs font-bold transition-all cursor-pointer ${isCollapsed && !isMobileMenuOpen ? 'justify-center' : 'justify-between'
                  } ${activeTab === 'users'
                    ? 'bg-slate-100 text-slate-800 font-bold'
                    : 'text-slate-800 hover:text-slate-850 hover:bg-slate-100'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 shrink-0" />
                  {(!isCollapsed || isMobileMenuOpen) && <span>Users</span>}
                </div>
                {(!isCollapsed || isMobileMenuOpen) && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-md font-black transition-all ${activeTab === 'users' ? 'bg-slate-300 text-slate-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {users.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab('orders');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-md text-left text-xs font-bold transition-all cursor-pointer ${isCollapsed && !isMobileMenuOpen ? 'justify-center' : 'justify-between'
                  } ${activeTab === 'orders'
                    ? 'bg-slate-100 text-slate-800 font-bold'
                    : 'text-slate-800 hover:text-slate-850 hover:bg-slate-100'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-4 h-4 shrink-0" />
                  {(!isCollapsed || isMobileMenuOpen) && <span>Orders</span>}
                </div>
                {(!isCollapsed || isMobileMenuOpen) && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-md font-black transition-all ${activeTab === 'orders' ? 'bg-slate-300 text-slate-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                    {orders.length}
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
            className={`w-full flex items-center gap-3 px-3.5 py-3 text-slate-500 hover:text-white hover:bg-rose-600 rounded-md text-xs font-bold transition-all cursor-pointer text-left ${isCollapsed && !isMobileMenuOpen ? 'justify-center' : ''
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
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 custom-scrollbar bg-slate-50/50 h-full" data-lenis-prevent>
          {/* --- VIEW: OVERVIEW TAB --- */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200 w-full">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div
                  onClick={() => setActiveTab('products')}
                  className="bg-white border border-slate-200 rounded-2xl sm:rounded-md p-4 sm:p-6 shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-400 hover:shadow-md transition-all group"
                >
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Inventory Size</span>
                    <p className="text-3xl font-black text-slate-800 mt-1">{products.length}</p>
                    <span className="text-[10px] text-blue-600 font-bold block mt-1">Active electronic items →</span>
                  </div>
                  <div className="w-12 h-12 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                    <Package className="w-6 h-6" />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('categories')}
                  className="bg-white border border-slate-200 rounded-2xl sm:rounded-md p-4 sm:p-6 shadow-sm flex items-center justify-between cursor-pointer hover:border-purple-400 hover:shadow-md transition-all group"
                >
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-purple-600 transition-colors">Categories Count</span>
                    <p className="text-3xl font-black text-slate-800 mt-1">{uniqueCategoriesCount}</p>
                    <span className="text-[10px] text-purple-600 font-bold block mt-1">Filters and sections →</span>
                  </div>
                  <div className="w-12 h-12 rounded-md bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-105 transition-transform">
                    <Tag className="w-6 h-6" />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('users')}
                  className="bg-white border border-slate-200 rounded-2xl sm:rounded-md p-4 sm:p-6 shadow-sm flex items-center justify-between cursor-pointer hover:border-indigo-400 hover:shadow-md transition-all group"
                >
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">Registered Customers</span>
                    <p className="text-3xl font-black text-slate-800 mt-1">{users.length}</p>
                    <span className="text-[10px] text-indigo-600 font-bold block mt-1">Database users →</span>
                  </div>
                  <div className="w-12 h-12 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform">
                    <Users className="w-6 h-6" />
                  </div>
                </div>

                <div
                  onClick={() => setActiveTab('orders')}
                  className="bg-white border border-slate-200 rounded-2xl sm:rounded-md p-4 sm:p-6 shadow-sm flex items-center justify-between cursor-pointer hover:border-emerald-400 hover:shadow-md transition-all group"
                >
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">Total Orders</span>
                    <p className="text-3xl font-black text-slate-800 mt-1">{orders.length}</p>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-1">Manage & Update Status →</span>
                  </div>
                  <div className="w-12 h-12 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- VIEW: ORDERS TAB --- */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-in fade-in duration-200 w-full">
              {/* Top Header Metrics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Total Orders</span>
                  <span className="text-2xl font-black text-slate-800 block mt-1">{orders.length}</span>
                </div>
                <div className="bg-amber-50/50 border border-amber-200/80 rounded-md p-4 shadow-sm">
                  <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest block">Pending Orders</span>
                  <span className="text-2xl font-black text-amber-800 block mt-1">
                    {orders.filter(o => o.status === 'Pending').length}
                  </span>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-md p-4 shadow-sm">
                  <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest block">Confirmed Orders</span>
                  <span className="text-2xl font-black text-emerald-800 block mt-1">
                    {orders.filter(o => o.status === 'Confirmed').length}
                  </span>
                </div>
                <div className="bg-rose-50/50 border border-rose-200/80 rounded-md p-4 shadow-sm">
                  <span className="text-[10px] font-black text-rose-700 uppercase tracking-widest block">Cancelled Orders</span>
                  <span className="text-2xl font-black text-rose-800 block mt-1">
                    {orders.filter(o => o.status === 'Cancelled').length}
                  </span>
                </div>
              </div>

              {/* Order Filtering, Search, Date Filter & Sorting Toolbar */}
              <div className="bg-white border border-slate-200 rounded-md p-4 sm:p-5 shadow-sm space-y-4">
                <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
                  
                  {/* Search Input (Product Name, Brand, Order ID) */}
                  <div className="relative flex-1 min-w-[240px]">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={orderSearchQuery}
                      onChange={(e) => setOrderSearchQuery(e.target.value)}
                      placeholder="Search by product name, brand, order ID..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 pl-9 pr-8 py-2 rounded-md text-xs font-bold text-slate-800 outline-none transition-all"
                    />
                    {orderSearchQuery && (
                      <button
                        onClick={() => setOrderSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  {/* Status Filter Dropdown Menu */}
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">
                      Filter Status:
                    </label>
                    <select
                      value={orderStatusFilter}
                      onChange={(e) => setOrderStatusFilter(e.target.value as any)}
                      className="bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 px-3 py-2 rounded-md text-xs font-bold text-slate-800 outline-none cursor-pointer"
                    >
                      <option value="All">All Orders</option>
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Sorting Dropdown */}
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0">
                      Sort By:
                    </label>
                    <select
                      value={orderSortBy}
                      onChange={(e) => setOrderSortBy(e.target.value as any)}
                      className="bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 px-3 py-2 rounded-md text-xs font-bold text-slate-800 outline-none cursor-pointer"
                    >
                      <option value="date-desc">Date (Newest First)</option>
                      <option value="date-asc">Date (Oldest First)</option>
                      <option value="qty-desc">Qty (High → Low)</option>
                      <option value="qty-asc">Qty (Low → High)</option>
                    </select>
                  </div>
                </div>

                {/* Date Filter Range */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => (document.getElementById('orderDateStartInput') as any)?.showPicker?.()}>
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">From Date:</span>
                      <input
                        id="orderDateStartInput"
                        type="date"
                        value={orderDateStart}
                        onChange={(e) => setOrderDateStart(e.target.value)}
                        onClick={(e) => e.currentTarget.showPicker?.()}
                        className="bg-slate-50 border border-slate-200 focus:border-blue-500 px-2.5 py-1.5 rounded-md text-xs font-semibold text-slate-800 outline-none cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => (document.getElementById('orderDateEndInput') as any)?.showPicker?.()}>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">To Date:</span>
                      <input
                        id="orderDateEndInput"
                        type="date"
                        value={orderDateEnd}
                        onChange={(e) => setOrderDateEnd(e.target.value)}
                        onClick={(e) => e.currentTarget.showPicker?.()}
                        className="bg-slate-50 border border-slate-200 focus:border-blue-500 px-2.5 py-1.5 rounded-md text-xs font-semibold text-slate-800 outline-none cursor-pointer"
                      />
                    </div>
                    {(orderDateStart || orderDateEnd || orderSearchQuery || orderStatusFilter !== 'All') && (
                      <button
                        onClick={() => {
                          setOrderSearchQuery('');
                          setOrderStatusFilter('All');
                          setOrderDateStart('');
                          setOrderDateEnd('');
                          setOrderSortBy('date-desc');
                        }}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md text-xs font-bold transition-colors cursor-pointer"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={fetchOrders}
                      disabled={loadingOrders}
                      className="flex items-center gap-1 px-3 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-md text-xs font-bold transition-colors cursor-pointer"
                      title="Refresh Orders"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loadingOrders ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>
                    <span className="text-xs font-semibold text-slate-400">
                      Showing {sortedOrders.length} order(s)
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Orders Table */}
              <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
                {loadingOrders ? (
                  <div className="p-12 text-center space-y-3">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                    <p className="text-xs font-bold text-slate-500">Loading orders database...</p>
                  </div>
                ) : paginatedOrders.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <th className="py-3 px-4 text-center w-12">#</th>
                          <th className="py-3 px-4">Order ID & Date</th>
                          <th className="py-3 px-4">User Name & Email</th>
                          <th className="py-3 px-4">Product Name & Brand</th>
                          <th className="py-3 px-4 text-center">Qty</th>
                          <th className="py-3 px-4 text-center">Status</th>
                          <th className="py-3 px-4 text-center">Toggle Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs">
                        {paginatedOrders.map((order, orderIdx) => {
                          const indexNum = (orderCurrentPage - 1) * 10 + orderIdx + 1;
                          const orderItems = order.items || [];
                          const totalQty = order.totalQuantity || orderItems.reduce((sum, i) => sum + (i.quantity || 1), 0);
                          const currentStatus = order.status || 'Pending';

                          return (
                            <tr key={order._id || order.id || order.orderId} className="hover:bg-slate-50/80 transition-colors">
                              {/* Index */}
                              <td className="py-3.5 px-4 text-center font-bold text-slate-400 align-top">
                                {indexNum}
                              </td>

                              {/* Order ID & Date */}
                              <td className="py-3.5 px-4 align-top">
                                <span className="font-mono font-black text-slate-900 block text-xs">
                                  {order.orderId || order.id}
                                </span>
                                <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                                  {order.date || (order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '—')}
                                </span>
                              </td>

                              {/* User Name & Email */}
                              <td className="py-3.5 px-4 align-top">
                                <span className="font-bold text-slate-800 block text-xs">
                                  {order.customerName || 'N/A'}
                                </span>
                                <span className="text-[11px] text-blue-600 font-medium block">
                                  {order.customerEmail || 'No Email'}
                                </span>
                                {order.customerPhone && (
                                  <span className="text-[10px] text-slate-400 block font-mono">
                                    📞 {order.customerPhone}
                                  </span>
                                )}
                              </td>

                              {/* Product Name & Brand */}
                              <td className="py-3.5 px-4 align-top max-w-xs">
                                <div className="space-y-1.5">
                                  {orderItems.map((item, idx) => {
                                    const pName = item.productName || item.product?.name || 'Electronic Product';
                                    const pBrand = item.brand || item.product?.brand || 'Generic';
                                    return (
                                      <div key={idx} className="flex items-center justify-between gap-2 bg-slate-50 p-1.5 rounded border border-slate-150">
                                        <div className="min-w-0 flex-1">
                                          <span className="font-semibold text-slate-800 text-[11px] block truncate">
                                            {pName}
                                          </span>
                                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                                            Brand: <span className="text-slate-600">{pBrand}</span>
                                          </span>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </td>

                              {/* Total Qty */}
                              <td className="py-3.5 px-4 align-top text-center">
                                <span className="inline-block bg-slate-100 border border-slate-200 text-slate-800 font-black px-2.5 py-1 rounded-full text-xs">
                                  {totalQty}
                                </span>
                              </td>

                              {/* Current Status Badge */}
                              <td className="py-3.5 px-4 align-top text-center">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                  currentStatus === 'Confirmed'
                                    ? 'bg-emerald-100 border border-emerald-200 text-emerald-800'
                                    : currentStatus === 'Cancelled'
                                    ? 'bg-rose-100 border border-rose-200 text-rose-800'
                                    : 'bg-amber-100 border border-amber-200 text-amber-800'
                                }`}>
                                  {currentStatus === 'Confirmed' && <Check className="w-3 h-3 text-emerald-600" />}
                                  {currentStatus === 'Cancelled' && <XCircle className="w-3 h-3 text-rose-600" />}
                                  {currentStatus === 'Pending' && <Clock className="w-3 h-3 text-amber-600" />}
                                  <span>{currentStatus}</span>
                                </span>
                              </td>

                              {/* 3 Status Toggle Buttons: Cancel order, Pending, Confirm */}
                              <td className="py-3.5 px-4 align-top text-center">
                                <div className="inline-flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 gap-1">
                                  {/* Cancel Order Toggle Button */}
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateOrderStatus(order._id || order.id || order.orderId || '', 'Cancelled')}
                                    className={`px-2 py-1 rounded text-[10px] font-black uppercase transition-all cursor-pointer ${
                                      currentStatus === 'Cancelled'
                                        ? 'bg-rose-600 text-white shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                                    }`}
                                  >
                                    Cancel Order
                                  </button>

                                  {/* Pending Toggle Button */}
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateOrderStatus(order._id || order.id || order.orderId || '', 'Pending')}
                                    className={`px-2 py-1 rounded text-[10px] font-black uppercase transition-all cursor-pointer ${
                                      currentStatus === 'Pending'
                                        ? 'bg-amber-500 text-white shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                                    }`}
                                  >
                                    Pending
                                  </button>

                                  {/* Confirm Toggle Button */}
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateOrderStatus(order._id || order.id || order.orderId || '', 'Confirmed')}
                                    className={`px-2 py-1 rounded text-[10px] font-black uppercase transition-all cursor-pointer ${
                                      currentStatus === 'Confirmed'
                                        ? 'bg-emerald-600 text-white shadow-xs'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                                    }`}
                                  >
                                    Confirm
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-16 text-center space-y-3">
                    <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
                    <p className="text-slate-500 text-sm font-bold">No orders found matching the filter criteria.</p>
                    <p className="text-xs text-slate-400">Try adjusting search, status filter, or date range.</p>
                  </div>
                )}

                {/* Pagination Controls (10 orders per page) */}
                {totalOrderPages > 1 && (
                  <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-semibold">
                      Page <span className="font-bold text-slate-800">{orderCurrentPage}</span> of{' '}
                      <span className="font-bold text-slate-800">{totalOrderPages}</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setOrderCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={orderCurrentPage === 1}
                        className="px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalOrderPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => setOrderCurrentPage(pageNum)}
                          className={`w-7 h-7 rounded text-xs font-bold flex items-center justify-center cursor-pointer transition-colors ${
                            orderCurrentPage === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}

                      <button
                        onClick={() => setOrderCurrentPage(prev => Math.min(totalOrderPages, prev + 1))}
                        disabled={orderCurrentPage === totalOrderPages}
                        className="px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
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
                <div className="flex items-center gap-3 flex-1 sm:flex-initial justify-end w-full sm:w-auto">
                  {/* Search Bar */}
                  <div className="relative flex items-center bg-slate-50 border border-slate-200 focus-within:border-blue-500 rounded-md px-3 py-1.5 transition-colors w-full sm:w-64">
                    <span className="text-slate-400 mr-2 shrink-0">
                      <Search className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search name, category, brand..."
                      className="bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none w-full font-semibold"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-slate-400 hover:text-slate-600 transition-colors text-xs font-bold px-1 cursor-pointer"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => openProductForm(null)}
                    className="flex items-center gap-1.5 px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer active:scale-95 border border-transparent shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              {products.length === 0 ? (
                <div className="p-16 text-center space-y-3">
                  <p className="text-slate-400 text-sm font-semibold">No products found in the database catalog.</p>
                  <button
                    onClick={() => openProductForm(null)}
                    className="px-4 py-2 bg-blue-650 text-white text-xs font-bold rounded-lg"
                  >
                    Create First Product
                  </button>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="p-16 text-center space-y-3">
                  <p className="text-slate-400 text-sm font-semibold">No products match your search criteria. Try a different query.</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 bg-slate-105 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-md transition-colors cursor-pointer border border-slate-200"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
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
                        <th className="py-3 px-3 sm:px-6 text-center">Super Hot Deal</th>
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
                          <td className="py-3 px-3 sm:px-6 text-center">
                            <label className="relative inline-flex items-center cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={prod.isHot}
                                onChange={() => handleToggleHot(prod)}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                            </label>
                          </td>
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
                            className={`w-7 h-7 rounded-md text-[10px] font-bold border transition-all ${currentPage === item
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

          {/* --- VIEW: CATEGORIES TAB --- */}
          {activeTab === 'categories' && (
            <div className="bg-white border border-slate-200 rounded-md sm:rounded-md shadow-sm overflow-hidden animate-in fade-in duration-200 flex flex-col w-full">
              <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Dynamic Categories</h3>
                  <p className="text-xs text-slate-400 mt-1">Manage dynamically active categories for filters and navigation.</p>
                </div>
                <button
                  onClick={() => openCategoryForm()}
                  className="flex items-center gap-1.5 px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer active:scale-95 border border-transparent"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Category</span>
                </button>
              </div>

              {categories.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <th className="py-3 px-3 sm:px-6 text-center w-12">#</th>
                        <th className="py-3 px-3 sm:px-6">Category Name</th>
                        <th className="py-3 px-3 sm:px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                      {categories.map((cat, index) => (
                        <tr key={cat.slug} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 sm:px-6 text-center font-bold text-slate-400">
                            {index + 1}
                          </td>
                          <td className="py-3 px-3 sm:px-6">
                            <span className="font-bold text-slate-850 text-sm uppercase">
                              {cat.name}
                            </span>
                          </td>
                          <td className="py-3 px-3 sm:px-6">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => openCategoryForm(cat)}
                                className="p-2 border border-slate-200 hover:border-blue-350 text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 rounded-md transition-colors cursor-pointer"
                                title="Edit category"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(cat.slug, cat.name)}
                                className="p-2 border border-slate-200 hover:border-rose-350 text-slate-500 hover:text-rose-600 hover:bg-rose-50/50 rounded-md transition-colors cursor-pointer"
                                title="Delete category"
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
                  <p className="text-slate-400 text-sm font-semibold">No dynamic categories configured.</p>
                  <button
                    onClick={() => {
                      setFormError('');
                      setFormSuccess('');
                      setIsCategoryModalOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-650 text-white text-xs font-bold rounded-lg cursor-pointer"
                  >
                    Add Your First Category
                  </button>
                </div>
              )}
            </div>
          )}

          {/* --- VIEW: USERS TAB --- */}
          {activeTab === 'users' && (
            <div className="bg-white border border-slate-200 rounded-md sm:rounded-md shadow-sm overflow-hidden animate-in fade-in duration-200 flex flex-col w-full">
              <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Registered Users</h3>
                  <p className="text-xs text-slate-400 mt-1">View list of users signed up in the database.</p>
                </div>
                {loadingUsers && <Loader2 className="w-4 h-4 animate-spin text-blue-600" />}
              </div>

              {users.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <th className="py-3 px-3 sm:px-6 text-center w-12">#</th>
                        <th className="py-3 px-3 sm:px-6">User Details</th>
                        <th className="py-3 px-3 sm:px-6">Email Address</th>
                        <th className="py-3 px-3 sm:px-6">Role</th>
                        <th className="py-3 px-3 sm:px-6">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                      {users.map((usr, index) => (
                        <tr key={usr._id || usr.email} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-3 px-3 sm:px-6 text-center font-bold text-slate-400">
                            {index + 1}
                          </td>
                          <td className="py-3 px-3 sm:px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-600 to-indigo-650 text-white flex items-center justify-center font-black text-[10px] uppercase shrink-0 select-none shadow-sm shadow-blue-500/10 border border-slate-100">
                                {usr.name ? usr.name.trim().charAt(0).toUpperCase() : 'U'}
                              </div>
                              <span className="font-bold text-slate-850 text-xs uppercase tracking-wide">
                                {usr.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-3 sm:px-6 text-slate-600 font-medium">{usr.email}</td>
                          <td className="py-3 px-3 sm:px-6">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${usr.role === 'admin'
                              ? 'bg-blue-50 border border-blue-100 text-blue-600'
                              : 'bg-slate-100 border border-slate-250 text-slate-655'
                              }`}>
                              {usr.role || 'Customer'}
                            </span>
                          </td>
                          <td className="py-3 px-3 sm:px-6 text-slate-500 font-mono">
                            {usr.createdAt ? new Date(usr.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            }) : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-16 text-center space-y-3">
                  <p className="text-slate-400 text-sm font-semibold">No registered users found in the database.</p>
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
                  {!isCustomCategory ? (
                    <select
                      required
                      value={prodCategory}
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setIsCustomCategory(true);
                          setProdCategory('');
                        } else {
                          setProdCategory(e.target.value);
                        }
                      }}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 px-3 py-2.5 rounded-md text-xs font-bold text-slate-700 outline-none transition-all cursor-pointer"
                    >
                      <option value="" disabled className="text-slate-400">Select category...</option>
                      {categories.map((cat) => (
                        <option key={cat.slug} value={cat.name} className="text-slate-700">
                          {cat.name}
                        </option>
                      ))}
                      <option value="__custom__" className="text-blue-600 font-bold">
                        + Type Custom Category...
                      </option>
                    </select>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={prodCategory}
                        onChange={(e) => setProdCategory(e.target.value)}
                        placeholder="Type custom category name..."
                        className="flex-1 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 px-3 py-2.5 rounded-md text-xs font-bold text-slate-700 outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomCategory(false);
                          setProdCategory('');
                        }}
                        className="px-3 border border-slate-200 hover:bg-slate-50 rounded-md text-xs font-bold text-slate-550 cursor-pointer"
                        title="Select from list"
                      >
                        Select Existing
                      </button>
                    </div>
                  )}
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

              {/* Promo Flags / Badges */}
              <div className="bg-slate-50/50 p-4 border border-slate-200 rounded-md space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block">
                      Super Hot Deal Toggle
                    </label>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Show in the "Super Hot Deals Of The Day" section. (Max 2 allowed)
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={prodIsHot}
                      onChange={(e) => setProdIsHot(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
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
          <div className="bg-white border border-slate-200 rounded-md shadow-2xl overflow-hidden w-full max-w-md animate-in fade-in zoom-in-95 duration-200 text-slate-800">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-805 uppercase tracking-wider">
                  {editingCategory ? 'Edit Category' : 'Add Dynamic Category'}
                </h3>
                <p className="text-xs text-slate-400 mt-1">Filters on navbar and sidebar will refresh automatically.</p>
              </div>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="w-8 h-8 rounded-md bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-550 flex items-center justify-center font-bold cursor-pointer"
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

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-55 rounded-md text-xs font-bold text-slate-505 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <span>{editingCategory ? 'Update Category' : 'Add Category'}</span>
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
          <div className="relative w-full max-w-sm bg-white border border-slate-200 rounded-md p-6 shadow-2xl animate-in zoom-in-95 duration-200 space-y-4 text-center text-slate-800">
            <div className="mx-auto w-12 h-12 rounded-md flex items-center justify-center shrink-0 mb-2 bg-slate-50 border border-slate-200">
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

      {/* Toast Notification */}
      {toast.isOpen && (() => {
        let containerBg = 'bg-slate-900 border-slate-800 text-white shadow-slate-950/20';
        let iconBg = 'bg-slate-800 border-slate-700';
        let titleColor = 'text-slate-200';
        let descColor = 'text-slate-400';
        let closeColor = 'text-slate-400 hover:text-white';
        let iconMarkup = null;

        if (toast.type === 'success') {
          containerBg = 'bg-emerald-600 border-emerald-500 text-white shadow-emerald-950/20';
          iconBg = 'bg-emerald-700 border-emerald-600';
          titleColor = 'text-white';
          descColor = 'text-emerald-50';
          closeColor = 'text-emerald-200 hover:text-white';
          iconMarkup = <CheckCircle2 className="w-5.5 h-5.5 text-white" />;
        } else if (toast.type === 'error') {
          containerBg = 'bg-rose-600 border-rose-500 text-white shadow-rose-950/20';
          iconBg = 'bg-rose-700 border-rose-600';
          titleColor = 'text-white';
          descColor = 'text-rose-50';
          closeColor = 'text-rose-200 hover:text-white';
          iconMarkup = <ShieldAlert className="w-5.5 h-5.5 text-white" />;
        } else if (toast.type === 'warning') {
          containerBg = 'bg-amber-500 border-amber-400 text-white shadow-amber-950/20';
          iconBg = 'bg-amber-600 border-amber-500';
          titleColor = 'text-white';
          descColor = 'text-amber-50';
          closeColor = 'text-amber-100 hover:text-white';
          iconMarkup = <AlertTriangle className="w-5.5 h-5.5 text-white" />;
        }

        return (
          <div className={`fixed bottom-6 right-6 z-55 max-w-sm rounded-md p-4 shadow-2xl border flex items-start gap-3.5 animate-in slide-in-from-bottom-5 fade-in duration-300 ${containerBg}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${iconBg}`}>
              {iconMarkup}
            </div>
            <div className="flex-1 min-w-0 pr-4">
              <h4 className={`text-xs font-black uppercase tracking-wider ${titleColor}`}>
                {toast.title}
              </h4>
              <p className={`text-[11px] font-semibold mt-1 leading-relaxed ${descColor}`}>
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => setToast(prev => ({ ...prev, isOpen: false }))}
              className={`transition-colors text-sm font-bold cursor-pointer self-start ${closeColor}`}
            >
              ×
            </button>
          </div>
        );
      })()}
    </div>
  );
};
