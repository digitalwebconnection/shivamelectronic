import React from 'react';
import { User as UserIcon, LogOut, Mail, Calendar } from 'lucide-react';
import type { Product, User as UserType, Order } from '../../types';

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
  React.useEffect(() => {
    const dummy = [wishlist, onToggleWishlist, onAddToCart, onProductClick, orders];
    if (dummy.length < 0) console.log(dummy);
  }, [wishlist, onToggleWishlist, onAddToCart, onProductClick, orders]);

  const [showConfirmLogout, setShowConfirmLogout] = React.useState(false);

  /* ── Not logged in ── */
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center p-6">
        <div className="max-w-sm w-full bg-white border border-slate-200 rounded-3xl p-10 shadow-2xl shadow-slate-200/60 text-center space-y-7 animate-in fade-in zoom-in-95 duration-300">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/25">
            <UserIcon className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Welcome Back</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Sign in to access your Shivam Electronic World account.
            </p>
          </div>
          <button
            onClick={onPromptAuth}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-500/25 active:scale-95 transition-all cursor-pointer border-none outline-none"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/40 flex items-start justify-center py-14 px-4 animate-in fade-in duration-300">
      <div className="w-full max-w-md space-y-5">

        {/* ── Hero Card ── */}
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-3xl overflow-hidden shadow-2xl shadow-blue-600/30 p-8">
          {/* decorative blobs */}
          <div className="absolute -top-8 -right-8 w-44 h-44 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-900/30 rounded-full blur-2xl pointer-events-none" />

          <div className="relative flex flex-col items-center text-center gap-4">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-white font-black text-5xl uppercase shadow-2xl select-none">
              {initial}
            </div>

            {/* Name */}
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">{user.name}</h1>
              <p className="text-blue-200 text-sm mt-1">{user.email}</p>
            </div>
          </div>
        </div>

        {/* ── Signup Details ── */}
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account Details</p>
          </div>

          {/* Name */}
          <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
              <UserIcon className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{user.name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
              <Mail className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5 truncate">{user.email}</p>
            </div>
          </div>

          {/* Joined */}
          {joinedDate && (
            <div className="flex items-center gap-4 px-6 py-5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                <Calendar className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Member Since</p>
                <p className="text-sm font-bold text-slate-800 mt-0.5">{joinedDate}</p>
              </div>
            </div>
          )}
        </div>

        {/* ── Logout ── */}
        <button
          onClick={() => setShowConfirmLogout(true)}
          className="w-full flex items-center justify-center gap-2.5 py-4 bg-white border border-rose-200 hover:bg-rose-50 hover:border-rose-300 text-rose-600 font-bold text-sm rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </button>

      </div>

      {/* ── Confirm Logout Modal ── */}
      {showConfirmLogout && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setShowConfirmLogout(false)}
        >
          <div
            className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl shadow-2xl p-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
              <LogOut className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-black text-slate-900">Log Out?</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Are you sure you want to log out of your account?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmLogout(false)}
                className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-2xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowConfirmLogout(false); onLogout(); }}
                className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-rose-500/25 active:scale-95 transition-all cursor-pointer"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
