import React, { useState } from 'react';
import { X, Mail, Lock, User, ShieldCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; avatar: string; role: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'forgot-success'>('login');
  const [email, setEmail] = useState('demo@shivamelectronics.com');
  const [name, setName] = useState('John Doe');
  const [password, setPassword] = useState('password123');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login' || mode === 'signup') {
      onLoginSuccess({
        name: mode === 'login' ? (email === 'demo@shivamelectronics.com' ? 'Shivam Gupta' : name) : name,
        email: email,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
        role: email === 'demo@shivamelectronics.com' ? 'Admin' : 'Premium Member'
      });
      onClose();
    } else if (mode === 'forgot') {
      setMode('forgot-success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm transition-all duration-300">
      <div 
        className="relative w-full max-w-md overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-slate-800 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200/60 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="px-8 pt-8 pb-6">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'forgot' && 'Reset Password'}
            {mode === 'forgot-success' && 'Reset Link Sent'}
          </h2>
          <p className="text-sm text-center text-slate-500 mb-6">
            {mode === 'login' && 'Log in to your Shivam Electronics account'}
            {mode === 'signup' && 'Sign up to access special member features'}
            {mode === 'forgot' && 'Enter your email to receive a password reset link'}
            {mode === 'forgot-success' && "We've sent a password reset link to your email address."}
          </p>

          {mode === 'forgot-success' ? (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs rounded-xl text-center leading-relaxed">
                We sent an email to <span className="font-bold">{email}</span>. Click the link inside the email to reset your password.
              </div>
              <button
                onClick={() => setMode('login')}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-[0.98] text-sm text-center"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-900 placeholder-slate-400 rounded-xl transition-all outline-none text-sm"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-900 placeholder-slate-400 rounded-xl transition-all outline-none text-sm"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-900 placeholder-slate-400 rounded-xl transition-all outline-none text-sm"
                    />
                  </div>
                </div>
              )}

              {mode === 'login' && (
                <div className="flex justify-end">
                  <button 
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-xs text-blue-600 hover:underline hover:text-blue-700 font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-[0.98] text-sm"
              >
                {mode === 'login' && 'Log In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'forgot' && 'Send Reset Link'}
              </button>
            </form>
          )}

          {mode !== 'forgot-success' && (
            <div className="mt-6 text-center">
              {mode === 'forgot' ? (
                <button
                  onClick={() => setMode('login')}
                  className="text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium"
                >
                  Back to Login
                </button>
              ) : (
                <button
                  onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium"
                >
                  {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
                </button>
              )}
            </div>
          )}

          {/* Sandbox logins only visible in login/signup views */}
          {(mode === 'login' || mode === 'signup') && (
            <>
              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-slate-150"></div>
                <span className="flex-shrink mx-4 text-slate-400 text-[10px] uppercase font-bold tracking-widest">Demo Sandbox Logins</span>
                <div className="flex-grow border-t border-slate-150"></div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEmail('demo@shivamelectronics.com');
                    setName('Shivam Gupta');
                    setMode('login');
                  }}
                  className="flex-1 py-1.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] text-slate-600 transition-all font-medium"
                >
                  Autofill Shivam (Admin)
                </button>
                <button
                  onClick={() => {
                    setEmail('john@example.com');
                    setName('John Doe');
                    setMode('login');
                  }}
                  className="flex-1 py-1.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-[11px] text-slate-600 transition-all font-medium"
                >
                  Autofill John (Customer)
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
