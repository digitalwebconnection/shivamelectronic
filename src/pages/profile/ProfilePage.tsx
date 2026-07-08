import React, { useState } from 'react';
import { 
  User as UserIcon, ShoppingBag, Heart, MapPin, Settings, LogOut, 
  ChevronRight, Plus, Edit2, Trash2, CheckCircle2, Truck, Box, 
  Bell, Shield, Key, Mail, Phone, Calendar, Globe
} from 'lucide-react';
import type { Product, User as UserType, Order } from '../../types';
import { products } from '../../data/products';

interface ProfilePageProps {
  user: UserType | null;
  wishlist: Product[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  onLogout: () => void;
  onPromptAuth: () => void;
  orders: Order[];
}

interface Address {
  id: string;
  type: 'Shipping' | 'Billing';
  isDefault: boolean;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onProductClick,
  onLogout,
  onPromptAuth,
  orders
}) => {
  // Fallback demo user details for guest view or instant preview
  const demoUser: UserType = {
    name: 'Shivam Gupta',
    email: 'shivam@shivamelectronicworld.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150',
    role: 'Administrator & VIP Buyer'
  };

  const currentUser = user || demoUser;

  // Active tab selection
  const [activeTab, setActiveTab] = useState<'overview' | 'personal' | 'orders' | 'addresses' | 'wishlist' | 'settings'>('overview');

  // Address State Management
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      type: 'Shipping',
      isDefault: true,
      name: 'Shivam Gupta',
      street: '102, Shanti Vihar, Sector 4, Rohini',
      city: 'New Delhi',
      state: 'Delhi',
      zip: '110085',
      phone: '+91 98765 43210'
    },
    {
      id: 'addr-2',
      type: 'Billing',
      isDefault: false,
      name: 'Shivam Electronics Store',
      street: 'GT Road, Near Clock Tower',
      city: 'Kanpur',
      state: 'Uttar Pradesh',
      zip: '208001',
      phone: '+91 91234 56789'
    }
  ]);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressFormData, setAddressFormData] = useState<Omit<Address, 'id'>>({
    type: 'Shipping',
    isDefault: false,
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  // Mock Order History Data
  const mockOrders = orders && orders.length > 0 ? orders : [
    {
      id: 'ORD-984310',
      date: 'July 04, 2026',
      status: 'Delivered',
      total: 3499.00,
      paymentMethod: 'Credit Card',
      items: [
        {
          product: products[0], // 14-Pin DIP IC Socket
          quantity: 1
        }
      ]
    },
    {
      id: 'ORD-874291',
      date: 'June 20, 2026',
      status: 'In Transit',
      total: 199.00,
      paymentMethod: 'UPI / GooglePay',
      items: [
        {
          product: products[2], // KCD4 Rocker Switch (Black)
          quantity: 1
        }
      ]
    },
    {
      id: 'ORD-731092',
      date: 'May 12, 2026',
      status: 'Delivered',
      total: 1799.00,
      paymentMethod: 'Bank Transfer',
      items: [
        {
          product: products[1], // Anjali Power Cord
          quantity: 1
        }
      ]
    }
  ];

  // Address edit / add actions
  const handleEditAddress = (addr: Address) => {
    setEditingAddress(addr);
    setAddressFormData({
      type: addr.type,
      isDefault: addr.isDefault,
      name: addr.name,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      phone: addr.phone
    });
    setShowAddressForm(true);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      // Edit existing Address
      setAddresses(prev => prev.map(addr => {
        if (addr.id === editingAddress.id) {
          const updated = { ...addr, ...addressFormData };
          if (addressFormData.isDefault) {
            // Uncheck other defaults
            return updated;
          }
          return updated;
        }
        return addressFormData.isDefault ? { ...addr, isDefault: false } : addr;
      }));
    } else {
      // Add new Address
      const newId = `addr-${Date.now()}`;
      const newAddress: Address = {
        id: newId,
        ...addressFormData
      };
      setAddresses(prev => {
        const list = addressFormData.isDefault 
          ? prev.map(a => ({ ...a, isDefault: false })) 
          : prev;
        return [...list, newAddress];
      });
    }
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddressFormData({
      type: 'Shipping',
      isDefault: false,
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      phone: ''
    });
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/50 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(59,130,246,0.05),transparent_40%)] pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-center gap-6 z-10">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-600 to-rose-600 blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="relative w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
            <div className="text-center sm:text-left space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-black text-slate-900">{currentUser.name}</h1>
                <span className="bg-linear-to-r from-[#e11d48]/10 to-[#0057ff]/10 text-blue-650 border border-blue-100 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {currentUser.role || 'Member'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium flex items-center justify-center sm:justify-start gap-1.5">
                <Mail className="w-3.5 h-3.5" /> {currentUser.email}
              </p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Client ID: SEW-2026-{(user ? '849' : 'DEMO')}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {!user ? (
              <button 
                onClick={onPromptAuth}
                className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-all"
              >
                Sign In to Sync Account
              </button>
            ) : (
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold text-xs px-5 py-3 rounded-xl active:scale-95 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-3xl p-4 shadow-md space-y-1">
            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 mb-2">
              Navigation Menu
            </span>
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-blue-50 text-blue-650 font-black border-l-4 border-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'overview' ? 'rotate-90 text-blue-600' : 'text-slate-400'}`} />
            </button>

            <button
              onClick={() => setActiveTab('personal')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'personal'
                  ? 'bg-blue-50 text-blue-650 font-black border-l-4 border-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserIcon className="w-4 h-4" />
                <span>Personal Profile</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'personal' ? 'rotate-90 text-blue-600' : 'text-slate-400'}`} />
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-blue-50 text-blue-650 font-black border-l-4 border-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4" />
                <span>Order History</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'orders' ? 'rotate-90 text-blue-600' : 'text-slate-400'}`} />
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'addresses'
                  ? 'bg-blue-50 text-blue-650 font-black border-l-4 border-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4" />
                <span>Address Book</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'addresses' ? 'rotate-90 text-blue-600' : 'text-slate-400'}`} />
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'wishlist'
                  ? 'bg-blue-50 text-blue-650 font-black border-l-4 border-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4" />
                  <span>My Wishlist</span>
                </div>
                <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-[9px] font-black">
                  {wishlist.length}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                activeTab === 'settings'
                  ? 'bg-blue-50 text-blue-650 font-black border-l-4 border-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-black'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeTab === 'settings' ? 'rotate-90 text-blue-600' : 'text-slate-400'}`} />
            </button>
          </div>

          {/* Right Main Panel Content */}
          <div className="lg:col-span-9 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md min-h-[480px]">
            
            {/* TABS 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="space-y-1.5">
                  <h2 className="text-lg font-black text-slate-900">Dashboard Overview</h2>
                  <p className="text-xs text-slate-500">Summary metrics, recent shopping behaviors, and status levels.</p>
                </div>

                {/* Stats Panel */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-center space-y-1">
                    <span className="block text-2xl font-black text-slate-950">{mockOrders.length}</span>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Total Orders</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-center space-y-1">
                    <span className="block text-2xl font-black text-slate-950">{wishlist.length}</span>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">In Wishlist</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-center space-y-1">
                    <span className="block text-2xl font-black text-slate-950">{addresses.length}</span>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Addresses</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-center space-y-1">
                    <span className="block text-2xl font-black text-slate-950">Platinum</span>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">User Level</span>
                  </div>
                </div>

                {/* Address and Tier Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  
                  {/* Default shipping address preview */}
                  <div className="border border-slate-200 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-blue-600" /> Shipping Destination (Default)
                      </span>
                      <button 
                        onClick={() => setActiveTab('addresses')}
                        className="text-[10px] font-black text-blue-600 hover:text-blue-800"
                      >
                        Manage
                      </button>
                    </div>
                    {addresses.find(a => a.isDefault && a.type === 'Shipping') ? (
                      <div className="text-xs space-y-1.5">
                        <p className="font-extrabold text-slate-800">{addresses.find(a => a.isDefault && a.type === 'Shipping')?.name}</p>
                        <p className="text-slate-500 leading-relaxed">
                          {addresses.find(a => a.isDefault && a.type === 'Shipping')?.street}, <br />
                          {addresses.find(a => a.isDefault && a.type === 'Shipping')?.city}, {addresses.find(a => a.isDefault && a.type === 'Shipping')?.state} - {addresses.find(a => a.isDefault && a.type === 'Shipping')?.zip}
                        </p>
                        <p className="text-slate-400">Phone: {addresses.find(a => a.isDefault && a.type === 'Shipping')?.phone}</p>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400 italic">No default shipping address set.</p>
                    )}
                  </div>

                  {/* Tier status rewards */}
                  <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-linear-to-r from-blue-50/20 to-rose-50/10">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-amber-600" /> Tier Rewards & Benefits
                      </span>
                      <span className="text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-black">VIP ACTIVE</span>
                    </div>
                    <ul className="text-xs space-y-2 text-slate-600 font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Free Express Shipping on select items
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Priority 24/7 technical customer support
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Extended 30-day no-questions return policy
                      </li>
                    </ul>
                  </div>

                </div>

                {/* Recent Order Preview */}
                <div className="border border-slate-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-rose-600" /> Recent Order Summary
                    </span>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="text-[10px] font-black text-blue-600 hover:text-blue-800"
                    >
                      View All Orders
                    </button>
                  </div>
                  
                  {/* Single order card */}
                  <div className="flex items-center justify-between gap-4 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 overflow-hidden flex items-center justify-center p-1.5">
                        <img src={mockOrders[0].items[0].product.image} className="w-full h-full object-contain" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-900 truncate max-w-[200px] sm:max-w-xs">{mockOrders[0].items[0].product.name}</h4>
                        <p className="text-[10px] text-slate-400">Order ID: {mockOrders[0].id} • Date: {mockOrders[0].date}</p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Price On Request</span>
                      <span className="inline-block bg-emerald-100 text-emerald-800 border border-emerald-200 text-[8px] font-black px-1.5 py-0.5 rounded uppercase">
                        {mockOrders[0].status}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TABS 2: PERSONAL INFO */}
            {activeTab === 'personal' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="space-y-1.5">
                  <h2 className="text-lg font-black text-slate-900">Personal Information</h2>
                  <p className="text-xs text-slate-500">View and update your contact records and gender identity attributes.</p>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        defaultValue={currentUser.name}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-xs font-bold text-slate-800 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <input 
                        type="email" 
                        defaultValue={currentUser.email}
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-xs font-bold text-slate-800 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <input 
                        type="tel" 
                        defaultValue="+91 98765 43210"
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-xs font-bold text-slate-800 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <input 
                        type="date" 
                        defaultValue="1995-08-12"
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-xs font-bold text-slate-800 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Gender</label>
                    <select className="w-full px-4 py-3 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-xs font-bold text-slate-800 transition-all outline-none bg-white">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other / Prefer not to say</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Country / Region</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        defaultValue="India"
                        className="w-full pl-11 pr-4 py-3 border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl text-xs font-bold text-slate-800 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 pt-4">
                    <button
                      type="submit"
                      onClick={(e) => { e.preventDefault(); alert("Profile details saved!"); }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TABS 3: ORDER HISTORY */}
            {activeTab === 'orders' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="space-y-1.5">
                  <h2 className="text-lg font-black text-slate-900">Order History</h2>
                  <p className="text-xs text-slate-500">Track and review details of all electronic products you purchased from us.</p>
                </div>

                {mockOrders.length > 0 ? (
                  <div className="space-y-6">
                    {mockOrders.map((order, idx) => (
                      <div key={idx} className="border border-slate-250 rounded-2xl overflow-hidden shadow-sm">
                        
                        {/* Order Header bar */}
                        <div className="bg-slate-50/80 border-b border-slate-200 px-4 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex gap-4">
                            <div>
                              <p className="text-[10px] text-slate-400 font-extrabold uppercase">Order Placed</p>
                              <p className="font-extrabold text-slate-700 mt-0.5">{order.date}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 font-extrabold uppercase">Order ID</p>
                              <p className="font-black text-slate-900 mt-0.5">{order.id}</p>
                            </div>
                            <div className="hidden sm:block">
                              <p className="text-[10px] text-slate-400 font-extrabold uppercase">Payment</p>
                              <p className="font-bold text-slate-500 mt-0.5">{order.paymentMethod}</p>
                            </div>
                          </div>
                          <div className="text-right">
                           <p className="font-black text-blue-650 mt-0.5 text-[10px] uppercase tracking-wider">Price On Request</p>
                          </div>
                        </div>

                        {/* Order Items list */}
                        <div className="p-4 space-y-4">
                          {order.items.map((item, itemIdx) => (
                            <div key={itemIdx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="w-16 h-16 bg-white border border-slate-200 rounded-xl overflow-hidden p-2 shrink-0 flex items-center justify-center">
                                  <img src={item.product.image} className="w-full h-full object-contain" />
                                </div>
                                <div className="space-y-0.5">
                                  <h4 
                                    onClick={() => onProductClick(item.product)}
                                    className="text-xs font-black text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                                  >
                                    {item.product.name}
                                  </h4>
                                  <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                                  <p className="text-[9px] text-blue-500 font-bold uppercase">{item.product.category}</p>
                                </div>
                              </div>

                              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                                <span className={`inline-flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-md uppercase border ${
                                  order.status === 'Delivered'
                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                    : 'bg-blue-50 border-blue-200 text-blue-700'
                                }`}>
                                  {order.status === 'Delivered' ? <CheckCircle2 className="w-3 h-3" /> : <Truck className="w-3 h-3" />}
                                  {order.status}
                                </span>
                                <div className="flex items-center gap-2">
                                  <button 
                                    onClick={() => onAddToCart(item.product)}
                                    className="px-3 py-1.5 bg-[#0057ff] text-white rounded-lg text-[10px] font-black hover:bg-blue-700 transition-colors"
                                  >
                                    Buy Again
                                  </button>
                                  <button 
                                    onClick={() => alert(`Tracking info for order ${order.id}: Status is ${order.status}`)}
                                    className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-[10px] font-bold text-slate-700 transition-all"
                                  >
                                    Track Pack
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-3">
                    <Box className="w-12 h-12 text-slate-300 mx-auto" />
                    <p className="text-sm text-slate-500 font-medium">You haven't placed any orders yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* TABS 4: ADDRESS BOOK */}
            {activeTab === 'addresses' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="space-y-1.5">
                    <h2 className="text-lg font-black text-slate-900">Address Book</h2>
                    <p className="text-xs text-slate-500">Add or modify delivery destinations for checkout convenience.</p>
                  </div>
                  {!showAddressForm && (
                    <button
                      onClick={() => {
                        setEditingAddress(null);
                        setAddressFormData({
                          type: 'Shipping',
                          isDefault: false,
                          name: currentUser.name,
                          street: '',
                          city: '',
                          state: '',
                          zip: '',
                          phone: ''
                        });
                        setShowAddressForm(true);
                      }}
                      className="flex items-center gap-1.5 bg-slate-950 text-white text-xs font-black px-4 py-2.5 rounded-xl hover:bg-blue-650 transition-colors active:scale-95 shadow-md shadow-slate-950/10"
                    >
                      <Plus className="w-4 h-4" /> Add Address
                    </button>
                  )}
                </div>

                {showAddressForm ? (
                  <form onSubmit={handleSaveAddress} className="border border-slate-250 rounded-3xl p-5 space-y-5 bg-slate-50/50">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      {editingAddress ? 'Modify Address Record' : 'Create Shipping Destination'}
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Address Type</label>
                        <select
                          value={addressFormData.type}
                          onChange={(e) => setAddressFormData({ ...addressFormData, type: e.target.value as 'Shipping' | 'Billing' })}
                          className="w-full px-3 py-2.5 border border-slate-200 focus:border-blue-500 rounded-xl text-xs font-bold bg-white outline-none"
                        >
                          <option value="Shipping">Shipping Address</option>
                          <option value="Billing">Billing Address</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Recipient Name</label>
                        <input
                          type="text"
                          required
                          value={addressFormData.name}
                          onChange={(e) => setAddressFormData({ ...addressFormData, name: e.target.value })}
                          className="w-full px-3 py-2.5 border border-slate-200 focus:border-blue-500 rounded-xl text-xs font-bold outline-none"
                          placeholder="e.g. Shivam Gupta"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Street Address</label>
                        <input
                          type="text"
                          required
                          value={addressFormData.street}
                          onChange={(e) => setAddressFormData({ ...addressFormData, street: e.target.value })}
                          className="w-full px-3 py-2.5 border border-slate-200 focus:border-blue-500 rounded-xl text-xs font-bold outline-none"
                          placeholder="House No, Apartment, Street, Landmark"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">City</label>
                        <input
                          type="text"
                          required
                          value={addressFormData.city}
                          onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
                          className="w-full px-3 py-2.5 border border-slate-200 focus:border-blue-500 rounded-xl text-xs font-bold outline-none"
                          placeholder="New Delhi"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">State / UT</label>
                        <input
                          type="text"
                          required
                          value={addressFormData.state}
                          onChange={(e) => setAddressFormData({ ...addressFormData, state: e.target.value })}
                          className="w-full px-3 py-2.5 border border-slate-200 focus:border-blue-500 rounded-xl text-xs font-bold outline-none"
                          placeholder="Delhi"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Postal / ZIP Code</label>
                        <input
                          type="text"
                          required
                          value={addressFormData.zip}
                          onChange={(e) => setAddressFormData({ ...addressFormData, zip: e.target.value })}
                          className="w-full px-3 py-2.5 border border-slate-200 focus:border-blue-500 rounded-xl text-xs font-bold outline-none"
                          placeholder="110085"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={addressFormData.phone}
                          onChange={(e) => setAddressFormData({ ...addressFormData, phone: e.target.value })}
                          className="w-full px-3 py-2.5 border border-slate-200 focus:border-blue-500 rounded-xl text-xs font-bold outline-none"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="default-chk"
                        checked={addressFormData.isDefault}
                        onChange={(e) => setAddressFormData({ ...addressFormData, isDefault: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="default-chk" className="text-xs text-slate-700 font-bold select-none cursor-pointer">
                        Set as default address
                      </label>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-md transition-colors"
                      >
                        Save Address
                      </button>
                      <button
                        type="button"
                        onClick={() => { setShowAddressForm(false); setEditingAddress(null); }}
                        className="border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs px-5 py-3 rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((addr) => (
                      <div 
                        key={addr.id} 
                        className={`border rounded-2xl p-5 space-y-4 shadow-sm relative ${
                          addr.isDefault 
                            ? 'border-blue-300 bg-blue-50/10' 
                            : 'border-slate-250 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] bg-slate-900 text-white font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {addr.type}
                          </span>
                          
                          {addr.isDefault && (
                            <span className="text-[8px] bg-blue-100 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-black uppercase">
                              Default
                            </span>
                          )}
                        </div>

                        <div className="text-xs space-y-1">
                          <p className="font-extrabold text-slate-900">{addr.name}</p>
                          <p className="text-slate-505 leading-relaxed">
                            {addr.street}, <br />
                            {addr.city}, {addr.state} - {addr.zip}
                          </p>
                          <p className="text-slate-400 font-medium">Phone: {addr.phone}</p>
                        </div>

                        <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3">
                          {!addr.isDefault && (
                            <button
                              onClick={() => handleSetDefaultAddress(addr.id)}
                              className="text-[10px] font-black text-blue-650 hover:text-blue-800"
                            >
                              Set Default
                            </button>
                          )}
                          <div className="flex items-center gap-3 ml-auto">
                            <button
                              onClick={() => handleEditAddress(addr)}
                              className="text-slate-500 hover:text-blue-600 transition-colors p-1"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteAddress(addr.id)}
                              className="text-slate-500 hover:text-rose-600 transition-colors p-1"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TABS 5: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="space-y-1.5">
                  <h2 className="text-lg font-black text-slate-900">My Wishlist</h2>
                  <p className="text-xs text-slate-500">Your curated collection of premium gadgets. Add them to your cart to checkout.</p>
                </div>

                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map((prod) => (
                      <div 
                        key={prod.id} 
                        onClick={() => onProductClick(prod)}
                        className="flex items-center gap-4 p-3 bg-white border border-slate-200 hover:border-slate-350 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 relative group"
                      >
                        <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden p-1.5 flex items-center justify-center shrink-0">
                          <img src={prod.image} alt={prod.name} className="w-full h-full object-contain" />
                        </div>
                        
                        <div className="grow space-y-1.5 min-w-0 pr-4">
                          <h4 className="text-xs font-black text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                            {prod.name}
                          </h4>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-bold text-blue-650 uppercase tracking-wider">Price On Request</span>
                            <span className="text-[9px] bg-blue-50 text-blue-600 border border-blue-100 px-1.5 py-0.5 rounded font-bold uppercase">
                              {getShortCategoryName(prod.category)}
                            </span>
                          </div>
                        </div>

                        {/* Actions block overlay */}
                        <div className="flex flex-col gap-1 items-center justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart(prod);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 transition-colors"
                            title="Add to Cart"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleWishlist(prod);
                            }}
                            className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg p-2 transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 space-y-3">
                    <Heart className="w-12 h-12 text-slate-300 mx-auto" />
                    <p className="text-sm text-slate-500 font-medium">Your wishlist is currently empty.</p>
                  </div>
                )}
              </div>
            )}

            {/* TABS 6: ACCOUNT SETTINGS */}
            {activeTab === 'settings' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                
                {/* Security change password */}
                <div className="space-y-5">
                  <div className="space-y-1.5 border-b border-slate-100 pb-2">
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <Key className="w-4 h-4 text-blue-600" /> Security: Update Password
                    </h3>
                    <p className="text-[11px] text-slate-450">Change your password credentials periodically to protect your transactions.</p>
                  </div>

                  <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Password</label>
                      <input 
                        type="password" 
                        className="w-full px-3 py-2.5 border border-slate-200 focus:border-blue-500 rounded-xl text-xs font-bold outline-none" 
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">New Password</label>
                      <input 
                        type="password" 
                        className="w-full px-3 py-2.5 border border-slate-200 focus:border-blue-500 rounded-xl text-xs font-bold outline-none" 
                        placeholder="Min 8 characters"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Confirm Password</label>
                      <input 
                        type="password" 
                        className="w-full px-3 py-2.5 border border-slate-200 focus:border-blue-500 rounded-xl text-xs font-bold outline-none" 
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="sm:col-span-2 pt-2">
                      <button
                        type="submit"
                        onClick={(e) => { e.preventDefault(); alert("Password updated successfully!"); }}
                        className="bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all"
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>

                {/* Email Notifications preferences */}
                <div className="space-y-5 pt-4">
                  <div className="space-y-1.5 border-b border-slate-100 pb-2">
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <Bell className="w-4 h-4 text-rose-600" /> Notifications Settings
                    </h3>
                    <p className="text-[11px] text-slate-450">Subscribe or unsubscribe from product launch newsletters and tracking updates.</p>
                  </div>

                  <div className="space-y-4 max-w-xl text-xs font-bold text-slate-700">
                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-slate-50/50">
                      <div>
                        <p className="text-slate-900">Order & Shipping Alerts</p>
                        <p className="text-[10px] text-slate-400 font-medium">Get SMS and Email alerts regarding dispatch, transit, and delivery.</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-650 rounded focus:ring-blue-500" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-slate-50/50">
                      <div>
                        <p className="text-slate-900">Flash Deals & Promotional Offers</p>
                        <p className="text-[10px] text-slate-400 font-medium">Receive weekly newsletters showing coupon deals and discounts.</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-650 rounded focus:ring-blue-500" />
                    </div>

                    <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-slate-50/50">
                      <div>
                        <p className="text-slate-900">Upcoming Hardware Launches</p>
                        <p className="text-[10px] text-slate-400 font-medium">Be the first to know about graphics cards, consoles, and headphones.</p>
                      </div>
                      <input type="checkbox" className="w-4 h-4 text-blue-650 rounded focus:ring-blue-500" />
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

// Helper: category slug shortener helper
function getShortCategoryName(slug: string): string {
  const mapping: { [key: string]: string } = {
    'laptops': 'Laptops',
    'phones': 'Mobiles',
    'headphones': 'Audio',
    'watches': 'Wearables',
    'cameras': 'Cameras',
    'gaming': 'Gaming',
    'components': 'PC Parts'
  };
  return mapping[slug.toLowerCase()] || slug;
}
