import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Trash2, ShoppingCart, Heart, User, Sparkles, Terminal } from 'lucide-react';
import type { Product, CartItem, User as UserType } from '../types';

interface ControlPanelProps {
  user: UserType | null;
  onToggleLogin: () => void;
  onClearCart: () => void;
  onClearWishlist: () => void;
  onAddRandomToCart: () => void;
  onAddRandomToWishlist: () => void;
  cartItems: CartItem[];
  wishlist: Product[];
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  user,
  onToggleLogin,
  onClearCart,
  onClearWishlist,
  onAddRandomToCart,
  onAddRandomToWishlist,
  cartItems,
  wishlist,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-4 left-4 z-45 max-w-xs md:max-w-sm transition-all duration-300">
      {/* Toggle button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-950 rounded-xl shadow-lg text-xs font-semibold cursor-pointer select-none"
      >
        <Terminal className="w-3.5 h-3.5 text-blue-600" />
        <span>{isOpen ? 'Close Demo Sandbox' : 'Open Demo Sandbox'}</span>
      </button>

      {/* Control Box */}
      {isOpen && (
        <div className="mt-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-black text-slate-900 tracking-wide uppercase">Navbar Sandbox Controls</h3>
            </div>
            <p className="text-[10px] text-slate-505">
              Use these buttons to simulate different states in the navbar (e.g. before/after login views).
            </p>
          </div>

          {/* User Auth toggle */}
          <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-2">
              <User className={`w-4 h-4 ${user ? 'text-green-600' : 'text-slate-400'}`} />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-800 leading-none">Authentication</span>
                <span className="text-[8px] text-slate-500 mt-0.5">{user ? 'State: Logged In' : 'State: Logged Out'}</span>
              </div>
            </div>
            <button 
              onClick={onToggleLogin}
              className="text-slate-400 hover:text-slate-800 transition-colors"
              title="Toggle Login State"
            >
              {user ? (
                <ToggleRight className="w-8 h-8 text-blue-600" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-300" />
              )}
            </button>
          </div>

          {/* Cart triggers */}
          <div className="space-y-1.5">
            <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Cart Simulation</span>
            <div className="flex gap-2">
              <button 
                onClick={onAddRandomToCart}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[10px] font-bold text-blue-600 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-3 h-3" />
                Add Item
              </button>
              <button 
                onClick={onClearCart}
                disabled={cartItems.length === 0}
                className="flex items-center justify-center p-1.5 bg-slate-50 hover:bg-red-50 hover:text-red-600 disabled:opacity-40 disabled:hover:bg-slate-50 disabled:hover:text-slate-400 text-slate-500 border border-slate-200 rounded-lg transition-all"
                title="Clear Cart"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Wishlist triggers */}
          <div className="space-y-1.5">
            <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Wishlist Simulation</span>
            <div className="flex gap-2">
              <button 
                onClick={onAddRandomToWishlist}
                disabled={!user}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 bg-red-50 hover:bg-red-100 border border-red-200 text-[10px] font-bold text-red-600 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                title={user ? '' : 'Log in first to use wishlist'}
              >
                <Heart className="w-3 h-3" />
                Add Wishlist Item
              </button>
              <button 
                onClick={onClearWishlist}
                disabled={wishlist.length === 0}
                className="flex items-center justify-center p-1.5 bg-slate-50 hover:bg-red-50 hover:text-red-600 disabled:opacity-40 disabled:hover:bg-slate-50 disabled:hover:text-slate-400 text-slate-500 border border-slate-200 rounded-lg transition-all"
                title="Clear Wishlist"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            {!user && (
              <span className="block text-[8px] text-amber-600 font-semibold leading-tight">
                * Note: Wishlist is hidden when logged out.
              </span>
            )}
          </div>

          {/* Debug telemetry */}
          <div className="pt-2 border-t border-slate-200">
            <div className="flex justify-between text-[9px] font-bold text-slate-400 mb-1">
              <span>ACTIVE VARIABLES</span>
              <span className="text-blue-600">Live</span>
            </div>
            <pre className="p-2 bg-slate-50 border border-slate-150 rounded-lg text-[9px] text-slate-600 overflow-x-auto leading-normal">
{`userState: ${user ? 'Logged In (' + user.name + ')' : 'Logged Out'}
cartCount: ${cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
wishlistCount: ${wishlist.length} items`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
