import React, { useState, useEffect } from 'react';
import { 
  User as UserIcon, LogOut, Mail, Calendar, ShoppingBag, 
  Clock, CheckCircle2, XCircle, MapPin, Phone, 
  ChevronDown, ChevronUp, RefreshCw, FileText,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import type { Product, User as UserType, Order } from '../../types';
import { API_URL } from '../../config';

interface ProfilePageProps {
  user: UserType | null;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  onLogout: () => void;
  onPromptAuth: () => void;
  orders: Order[];
  onNavigateToProducts?: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onProductClick,
  onLogout,
  onPromptAuth,
  onNavigateToProducts
}) => {
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState('');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  
  // Pagination State for Orders
  const [orderCurrentPage, setOrderCurrentPage] = useState(1);
  const ORDERS_PER_PAGE = 5;

  const totalOrderPages = Math.max(1, Math.ceil(myOrders.length / ORDERS_PER_PAGE));
  const paginatedOrders = myOrders.slice(
    (orderCurrentPage - 1) * ORDERS_PER_PAGE,
    orderCurrentPage * ORDERS_PER_PAGE
  );

  // Reset page to 1 on orders length changes
  useEffect(() => {
    setOrderCurrentPage(1);
  }, [myOrders.length]);

  // Prevent unused variables warning from typescript compiler
  useEffect(() => {
    const dummy = [onToggleWishlist];
    if (dummy.length < 0) console.log(dummy);
  }, [onToggleWishlist]);

  // Fetch customer orders on mount/user change
  const fetchMyOrders = async () => {
    if (!user) return;
    setLoadingOrders(true);
    setErrorOrders('');
    try {
      const token = localStorage.getItem('userToken');
      const res = await fetch(`${API_URL}/api/orders/my`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setMyOrders(data);
      } else {
        setErrorOrders('Failed to load order history from server.');
      }
    } catch (err) {
      console.error('Fetch orders error:', err);
      setErrorOrders('Unable to connect to the server. Please check your internet connection.');
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, [user]);

  /* ── Not logged in ── */
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-sm w-full bg-white border border-slate-200 rounded-3xl p-10 shadow-xl shadow-slate-100 text-center space-y-7 animate-in fade-in duration-300">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <UserIcon className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Please sign in to access your Shivam Electronic World account, order history, and custom quotes.
            </p>
          </div>
          <button
            onClick={onPromptAuth}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer border-none outline-none"
          >
            Sign In / Create Account
          </button>
        </div>
      </div>
    );
  }

  const initial = user.name ? user.name.trim().charAt(0).toUpperCase() : 'U';
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  const toggleExpandOrder = (id: string) => {
    setExpandedOrderId(prev => (prev === id ? null : id));
  };

  // Helper for status badge styling
  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase">
            <CheckCircle2 className="w-3 h-3" />
            Confirmed
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-[10px] font-black uppercase">
            <XCircle className="w-3 h-3" />
            Cancelled
          </span>
        );
      default: // Pending
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-100 text-amber-600 text-[10px] font-black uppercase">
            <Clock className="w-3 h-3 animate-pulse" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Profile Heading Section */}
        <div className="bg-slate-900 rounded-md overflow-hidden shadow-xl text-white relative">
          {/* Subtle design blobs */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_60%)] animate-pulse duration-10000" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(225,29,72,0.1),transparent_50%)]" />
          
          <div className="relative px-6 py-10 sm:p-12 flex flex-col sm:flex-row items-center gap-6 z-10">
            <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-black text-4xl uppercase shadow-2xl select-none shrink-0">
              {initial}
            </div>
            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-wider">
                {user.role || 'Customer'}
              </span>
              <h1 className="text-3xl font-black font-serif tracking-tight">{user.name}</h1>
              <p className="text-sm text-slate-400 font-medium">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Account Details & Actions */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Account Details Card */}
            <div className="bg-white border border-slate-200/80 rounded-md shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-left">Account Specifications</span>
              </div>

              <div className="divide-y divide-slate-100">
                {/* Full Name */}
                <div className="flex items-center gap-4 px-6 py-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-2xs">
                    <UserIcon className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">Full Name</span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5 block">{user.name}</span>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-center gap-4 px-6 py-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-2xs">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0 text-left">
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">Email Address</span>
                    <span className="text-sm font-bold text-slate-800 mt-0.5 block truncate">{user.email}</span>
                  </div>
                </div>

                {/* Joined Date */}
                {joinedDate && (
                  <div className="flex items-center gap-4 px-6 py-4">
                    <div className="w-10 h-10 rounded-md bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 shadow-2xs">
                      <Calendar className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0 text-left">
                      <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">Member Since</span>
                      <span className="text-sm font-bold text-slate-800 mt-0.5 block">{joinedDate}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="bg-white border border-slate-200/80 rounded-md p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-slate-50 rounded-md border border-slate-200">
                  <span className="block text-3xl font-black text-slate-900">{myOrders.length}</span>
                  <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block mt-1">Total Quotes</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-md border border-slate-200">
                  <span className="block text-3xl font-black text-amber-600">
                    {myOrders.filter(o => o.status === 'Pending').length}
                  </span>
                  <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block mt-1">Pending</span>
                </div>
              </div>
            </div>

            {/* Wishlist Quick Actions Card */}
            {wishlist.length > 0 && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4 text-left">Saved in Wishlist</span>
                <div className="space-y-3.5">
                  {wishlist.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-10 h-10 rounded-xl object-cover border border-slate-100 cursor-pointer hover:opacity-85 transition-opacity"
                        onClick={() => onProductClick(item)}
                      />
                      <div className="flex-1 min-w-0 text-left">
                        <p 
                          className="text-xs font-bold text-slate-800 truncate hover:text-blue-650 cursor-pointer"
                          onClick={() => onProductClick(item)}
                        >
                          {item.name}
                        </p>
                        <p className="text-[9px] text-slate-400 font-extrabold uppercase mt-0.5">{item.brand}</p>
                      </div>
                      <button
                        onClick={() => onAddToCart(item)}
                        className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-650 text-[10px] font-bold rounded-lg transition-colors cursor-pointer border-none"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                  {wishlist.length > 3 && (
                    <div className="text-center pt-1 border-t border-slate-100 mt-2">
                      <span className="text-[10px] text-slate-400 font-bold">and {wishlist.length - 3} more items...</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sign Out Button */}
            <button
              onClick={() => setShowConfirmLogout(true)}
              className="w-full flex items-center justify-center gap-2.5 py-4 bg-white border border-rose-250 hover:bg-rose-50 hover:border-rose-350 text-rose-600 font-bold text-xs uppercase tracking-wider rounded-full shadow-xs hover:shadow-md transition-all active:scale-98 cursor-pointer font-sans"
            >
              <LogOut className="w-4 h-4" />
              Sign Out Account
            </button>
          </div>

          {/* Right Column: Order History */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1 text-left">
                <h2 className="text-2xl font-black text-slate-900 font-serif tracking-tight">Your Quote & Order History</h2>
                <p className="text-xs text-slate-500 font-medium">Track and view quotes you requested on WhatsApp for electronic components.</p>
              </div>
              <button
                onClick={fetchMyOrders}
                disabled={loadingOrders}
                className="p-2 text-slate-400 hover:text-slate-800 bg-white border border-slate-200 hover:border-slate-350 rounded-md shadow-xs transition-colors shrink-0 cursor-pointer disabled:opacity-50"
                title="Refresh order history"
              >
                <RefreshCw className={`w-4 h-4 ${loadingOrders ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Loading state */}
            {loadingOrders && (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white border border-slate-200/85 rounded-md p-6 space-y-4 animate-pulse">
                    <div className="flex justify-between items-center">
                      <div className="h-5 bg-slate-200 rounded-md w-32" />
                      <div className="h-5 bg-slate-200 rounded-md w-24" />
                    </div>
                    <div className="h-4 bg-slate-100 rounded-md w-3/4" />
                    <div className="h-4 bg-slate-100 rounded-md w-1/2" />
                  </div>
                ))}
              </div>
            )}

            {/* Error state */}
            {!loadingOrders && errorOrders && (
              <div className="bg-rose-50/50 border border-rose-250 rounded-3xl p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center text-rose-600 mx-auto">
                  <XCircle className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-extrabold text-slate-900">Failed to Retrieve Quotes</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto font-medium">{errorOrders}</p>
                </div>
                <button
                  onClick={fetchMyOrders}
                  className="px-4 py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Try Again
                </button>
              </div>
            )}

            {/* Empty state */}
            {!loadingOrders && !errorOrders && myOrders.length === 0 && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center space-y-5 shadow-xs">
                <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1.5 max-w-md mx-auto">
                  <h3 className="text-base font-black text-slate-900">No Inquiries Found</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    You haven't requested any custom electronic component inquiries or WhatsApp quotes yet.
                  </p>
                </div>
                {onNavigateToProducts && (
                  <button
                    onClick={onNavigateToProducts}
                    className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer border-none"
                  >
                    Browse Components Catalog
                  </button>
                )}
              </div>
            )}

            {/* Orders list */}
            {!loadingOrders && !errorOrders && myOrders.length > 0 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {paginatedOrders.map((order) => {
                    const isExpanded = expandedOrderId === order.orderId;
                    const dateStr = order.createdAt 
                      ? new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
                      : order.date;
                    
                    const itemCount = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
                    const hasPrice = order.totalAmount && order.totalAmount > 0;

                    return (
                      <div 
                        key={order.orderId || order.id}
                        className="bg-white border border-slate-250 rounded-md overflow-hidden shadow-xs hover:border-slate-305 transition-all text-left"
                      >
                        {/* Order Summary Header */}
                        <div 
                          onClick={() => toggleExpandOrder(order.orderId || order.id || '')}
                          className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/40 transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-black text-slate-900 font-mono">
                                #{order.orderId}
                              </span>
                              {getStatusBadge(order.status)}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                              <span>Placed: <strong className="text-slate-800 font-bold">{dateStr}</strong></span>
                              <span className="hidden sm:inline text-slate-300">•</span>
                              <span>Quantity: <strong className="text-slate-800 font-bold">{itemCount} {itemCount === 1 ? 'item' : 'items'}</strong></span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                            <div className="text-left sm:text-right">
                              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider block">Estimated Quote</span>
                              <span className="text-sm sm:text-base font-black text-blue-655 tracking-tight block">
                                {hasPrice ? `₹${order.totalAmount?.toLocaleString('en-IN')}` : 'Quote on Request'}
                              </span>
                            </div>
                            <div className="p-1.5 bg-slate-50 border border-slate-100 rounded-md text-slate-400 group-hover:text-slate-700 shrink-0">
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </div>
                          </div>
                        </div>

                        {/* Expanded Section Details */}
                        {isExpanded && (
                          <div className="border-t border-slate-100 bg-slate-50/30 p-6 space-y-6">
                            
                            {/* Shipping / Inquiry Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-slate-200 p-5 rounded-md">
                              <div className="space-y-3 text-left">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                                  Delivery Address
                                </h4>
                                <div className="text-xs space-y-1 font-medium text-slate-655 pl-5">
                                  <p className="font-bold text-slate-800">{order.customerName}</p>
                                  <p className="leading-relaxed">{order.customerAddress}</p>
                                </div>
                              </div>

                              <div className="space-y-3 text-left">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                                  Contact Details
                                </h4>
                                <div className="text-xs space-y-1 pl-5 text-slate-655 font-medium">
                                  <p>WhatsApp: <strong className="text-slate-800 font-bold">{order.customerPhone}</strong></p>
                                  <p>Email: <strong className="text-slate-800 font-semibold">{order.customerEmail || user.email}</strong></p>
                                </div>
                              </div>

                              {order.customerNote && (
                                <div className="md:col-span-2 space-y-2 border-t border-slate-100 pt-4 text-left">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Inquiry Client Notes</span>
                                  <p className="text-xs font-medium text-slate-600 bg-slate-50/80 p-3 rounded-xl border border-slate-100 italic">
                                    "{order.customerNote}"
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Items In Quote */}
                            <div className="space-y-3 text-left">
                              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5 text-slate-400" />
                                Requested Items ({order.items?.length || 0})
                              </h4>

                              <div className="divide-y divide-slate-100 border border-slate-205 rounded-md bg-white overflow-hidden">
                                {order.items?.map((item, idx) => {
                                  const priceVal = item.price;
                                  const hasItemPrice = priceVal && priceVal > 0;
                                  return (
                                    <div 
                                      key={item.productId || idx} 
                                      className="flex items-center gap-4 p-4 hover:bg-slate-50/30 transition-colors"
                                    >
                                      {/* Thumbnail */}
                                      <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                                        {item.image ? (
                                          <img 
                                            src={item.image} 
                                            alt={item.productName} 
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          <ShoppingBag className="w-5 h-5 text-slate-300" />
                                        )}
                                      </div>

                                      {/* Info */}
                                      <div className="flex-1 min-w-0">
                                        <h5 className="text-xs font-bold text-slate-800 truncate">
                                          {item.productName}
                                        </h5>
                                        <p className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">
                                          {item.brand} • Qty: <strong className="text-slate-700">{item.quantity}</strong>
                                        </p>
                                      </div>

                                      {/* Price/Quote */}
                                      <div className="text-right shrink-0">
                                        <span className="text-xs font-bold text-slate-855 block">
                                          {hasItemPrice ? `₹${priceVal.toLocaleString('en-IN')}` : 'Quote Requested'}
                                        </span>
                                        {hasItemPrice && (
                                          <span className="text-[9px] text-slate-400 block font-semibold">
                                            Total: ₹{(priceVal * item.quantity).toLocaleString('en-IN')}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Pagination Controls */}
                {totalOrderPages > 1 && (
                  <div className="flex items-center justify-between border border-slate-200 bg-white px-4 py-3 sm:px-6 rounded-md shadow-2xs mt-4">
                    {/* Mobile view controls */}
                    <div className="flex flex-1 justify-between sm:hidden">
                      <button
                        onClick={() => setOrderCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={orderCurrentPage === 1}
                        className="relative inline-flex items-center rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setOrderCurrentPage((prev) => Math.min(prev + 1, totalOrderPages))}
                        disabled={orderCurrentPage === totalOrderPages}
                        className="relative ml-3 inline-flex items-center rounded-md border border-slate-205 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Next
                      </button>
                    </div>

                    {/* Tablet/Desktop view controls */}
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between w-full">
                      <div>
                        <p className="text-xs text-slate-500 font-medium">
                          Showing{' '}
                          <span className="font-bold text-slate-800">
                            {(orderCurrentPage - 1) * ORDERS_PER_PAGE + 1}
                          </span>{' '}
                          to{' '}
                          <span className="font-bold text-slate-800">
                            {Math.min(orderCurrentPage * ORDERS_PER_PAGE, myOrders.length)}
                          </span>{' '}
                          of <span className="font-bold text-slate-800">{myOrders.length}</span> quotes
                        </p>
                      </div>

                      <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-2xs" aria-label="Pagination">
                          {/* Prev button */}
                          <button
                            onClick={() => setOrderCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={orderCurrentPage === 1}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer bg-white"
                          >
                            <span className="sr-only">Previous</span>
                            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                          </button>

                          {/* Numbered buttons */}
                          {Array.from({ length: totalOrderPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                              key={pageNum}
                              onClick={() => setOrderCurrentPage(pageNum)}
                              aria-current={orderCurrentPage === pageNum ? 'page' : undefined}
                              className={`relative inline-flex items-center px-3.5 py-2 text-xs font-black ring-1 ring-inset focus:z-20 focus:outline-offset-0 transition-all cursor-pointer ${
                                orderCurrentPage === pageNum
                                  ? 'z-10 bg-blue-600 text-white ring-blue-600'
                                  : 'text-slate-900 bg-white hover:bg-slate-50 ring-slate-200'
                              }`}
                            >
                              {pageNum}
                            </button>
                          ))}

                          {/* Next button */}
                          <button
                            onClick={() => setOrderCurrentPage((prev) => Math.min(prev + 1, totalOrderPages))}
                            disabled={orderCurrentPage === totalOrderPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer bg-white"
                          >
                            <span className="sr-only">Next</span>
                            <ChevronRight className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* ── Confirm Logout Modal ── */}
      {showConfirmLogout && (
        <div
          className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setShowConfirmLogout(false)}
        >
          <div
            className="w-full max-w-sm bg-white border border-slate-200 rounded-md shadow-2xl p-8 text-center space-y-6 animate-in fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto w-14 h-14 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
              <LogOut className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-slate-900">Sign Out?</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Are you sure you want to log out of your Shivam Electronic World account?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmLogout(false)}
                className="flex-1 py-3 bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-md transition-all cursor-pointer border-none"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowConfirmLogout(false); onLogout(); }}
                className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-lg shadow-rose-500/25 active:scale-95 transition-all cursor-pointer border-none"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
