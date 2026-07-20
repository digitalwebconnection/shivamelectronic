import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, User, ShieldCheck, KeyRound, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { API_URL } from '../config';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; avatar: string; role: string }) => void;
}

type Mode = 'login' | 'signup' | 'forgot' | 'otp' | 'reset' | 'reset-success';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // OTP step
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset step
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: any = null;
    if (mode === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [mode, timer]);

  useEffect(() => {
    if (isOpen) {
      setMode('login');
      resetAll();
    }
  }, [isOpen]);

  const resetAll = () => {
    setEmail(''); setName(''); setPassword('');
    setOtp(['', '', '', '', '', '']);
    setNewPassword(''); setConfirmPassword('');
    setError(''); setLoading(false); setTimer(60);
    setShowPassword(false); setShowNew(false); setShowConfirm(false);
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setError('');
  };

  const handleResendOtp = async () => {
    setError('');
    setLoading(true);
    setOtp(['', '', '', '', '', '']);
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTimer(60);
      } else {
        setError(data.message || 'Failed to resend OTP.');
      }
    } catch {
      setError('Connection to server failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  /* ── OTP box handlers ── */
  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[index] = val.slice(-1);
    setOtp(next);
    if (val && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      otpRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  /* ── Submit handlers per step ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      /* LOGIN */
      if (mode === 'login') {
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok && data.success) { onLoginSuccess(data.user); onClose(); }
        else setError(data.message || 'Invalid email or password.');

      /* SIGNUP */
      } else if (mode === 'signup') {
        const res = await fetch(`${API_URL}/api/auth/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (res.ok && data.success) { onLoginSuccess(data.user); onClose(); }
        else setError(data.message || 'Registration failed.');

      /* STEP 1 – send OTP */
      } else if (mode === 'forgot') {
        const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (res.ok && data.success) { setTimer(60); switchMode('otp'); }
        else setError(data.message || 'Failed to send OTP.');

      /* STEP 2 – verify OTP */
      } else if (mode === 'otp') {
        const otpStr = otp.join('');
        if (otpStr.length < 6) { setError('Please enter all 6 digits.'); setLoading(false); return; }
        const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: otpStr }),
        });
        const data = await res.json();
        if (res.ok && data.success) { switchMode('reset'); }
        else setError(data.message || 'Incorrect or expired OTP.');

      /* STEP 3 – reset password */
      } else if (mode === 'reset') {
        if (newPassword.length < 6) { setError('Password must be at least 6 characters.'); setLoading(false); return; }
        if (newPassword !== confirmPassword) { setError('Passwords do not match.'); setLoading(false); return; }
        const otpStr = otp.join('');
        const res = await fetch(`${API_URL}/api/auth/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: otpStr, newPassword }),
        });
        const data = await res.json();
        if (res.ok && data.success) { switchMode('reset-success'); }
        else setError(data.message || 'Failed to reset password.');
      }
    } catch {
      setError('Connection to server failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Title & Subtitle per mode ── */
  const titles: Record<Mode, string> = {
    login: 'Welcome Back',
    signup: 'Create Account',
    forgot: 'Forgot Password',
    otp: 'Enter OTP',
    reset: 'New Password',
    'reset-success': 'Password Reset!',
  };
  const subtitles: Record<Mode, string> = {
    login: 'Log in to your Shivam Electronics account',
    signup: 'Sign up to access special member features',
    forgot: 'Enter your email — we\'ll send a 6-digit OTP',
    otp: `We sent a code to ${email}`,
    reset: 'Choose a strong new password',
    'reset-success': 'Your password has been changed successfully.',
  };

  /* ── Step indicator (forgot flow: 3 steps) ── */
  const isForgotFlow = ['forgot', 'otp', 'reset'].includes(mode);
  const stepIndex = { forgot: 0, otp: 1, reset: 2 }[mode as 'forgot' | 'otp' | 'reset'] ?? -1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div
        className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-8 pt-7 pb-7">

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-13 h-13 flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
              {mode === 'reset-success'
                ? <CheckCircle2 className="w-7 h-7" />
                : mode === 'otp' || mode === 'reset'
                ? <KeyRound className="w-7 h-7" />
                : <ShieldCheck className="w-7 h-7" />}
            </div>
          </div>

          {/* Step dots for forgot flow */}
          {isForgotFlow && (
            <div className="flex justify-center gap-2 mb-4">
              {[0, 1, 2].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s <= stepIndex ? 'bg-blue-600 w-6' : 'bg-slate-200 w-3'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="text-2xl font-black text-center text-slate-900 mb-1">{titles[mode]}</h2>
          <p className="text-xs text-center text-slate-500 mb-5 leading-relaxed">{subtitles[mode]}</p>

          {/* Error */}
          {error && (
            <div className="p-3 mb-4 bg-rose-50 border border-rose-100 text-rose-700 text-xs rounded-xl text-center leading-relaxed font-semibold">
              {error}
            </div>
          )}

          {/* ── RESET SUCCESS ── */}
          {mode === 'reset-success' ? (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-center text-xs text-emerald-800 leading-relaxed font-semibold">
                You can now log in with your new password.
              </div>
              <button
                onClick={() => { resetAll(); switchMode('login'); }}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all text-sm cursor-pointer"
              >
                Go to Login
              </button>
            </div>

          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* ── LOGIN / SIGNUP / FORGOT – Name ── */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text" required value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-900 placeholder-slate-400 rounded-xl outline-none text-sm transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              {(mode === 'login' || mode === 'signup' || mode === 'forgot') && (
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email" required value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-900 placeholder-slate-400 rounded-xl outline-none text-sm transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Password (login / signup) */}
              {(mode === 'login' || mode === 'signup') && (
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'} required value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-900 placeholder-slate-400 rounded-xl outline-none text-sm transition-all"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Forgot password link */}
              {mode === 'login' && (
                <div className="flex justify-end -mt-1">
                  <button type="button" onClick={() => switchMode('forgot')}
                    className="text-xs text-blue-600 hover:text-blue-700 hover:underline font-bold cursor-pointer">
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* ── OTP INPUT & 60s TIMER ── */}
              {mode === 'otp' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">6-Digit OTP</label>
                    <span className={`text-[11px] font-bold ${timer > 0 ? 'text-blue-600 font-mono' : 'text-rose-500 font-semibold'}`}>
                      {timer > 0 ? `Expires in 00:${timer < 10 ? '0' : ''}${timer}` : 'OTP Expired'}
                    </span>
                  </div>

                  <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => { otpRefs.current[i] = el; }}
                        type="text" inputMode="numeric" maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className={`w-11 h-13 text-center text-xl font-black border-2 rounded-xl outline-none transition-all bg-slate-50 text-slate-900 ${
                          digit ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 focus:border-blue-500'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={timer > 0 || loading}
                      className="text-xs text-blue-600 hover:text-blue-700 font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                    </button>
                  </div>
                </div>
              )}

              {/* ── NEW PASSWORD FIELDS ── */}
              {mode === 'reset' && (
                <>
                  <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl mb-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-xs font-extrabold text-emerald-800">OTP Verified Successfully</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showNew ? 'text' : 'password'} required value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-900 placeholder-slate-400 rounded-xl outline-none text-sm transition-all"
                      />
                      <button type="button" onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                        {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showConfirm ? 'text' : 'password'} required value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter your password"
                        className={`w-full pl-10 pr-10 py-3 bg-slate-50 border-2 focus:ring-2 text-slate-900 placeholder-slate-400 rounded-xl outline-none text-sm transition-all ${
                          confirmPassword
                            ? confirmPassword === newPassword
                              ? 'border-emerald-400 focus:ring-emerald-500/10'
                              : 'border-rose-400 focus:ring-rose-500/10'
                            : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/10'
                        }`}
                      />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Submit */}
              <button
                type="submit" disabled={loading}
                className="w-full py-3.5 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all text-sm cursor-pointer disabled:opacity-60"
              >
                {loading ? 'Please wait…' : (
                  <>
                    {mode === 'login' && 'Log In'}
                    {mode === 'signup' && 'Create Account'}
                    {mode === 'forgot' && 'Send OTP'}
                    {mode === 'otp' && 'Verify OTP'}
                    {mode === 'reset' && 'Reset Password'}
                  </>
                )}
              </button>
            </form>
          )}

          {/* ── Bottom links ── */}
          {mode !== 'reset-success' && (
            <div className="mt-5 text-center">
              {(mode === 'forgot' || mode === 'otp' || mode === 'reset') ? (
                <button onClick={() => { resetAll(); switchMode('login'); }}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer transition-colors">
                  ← Back to Login
                </button>
              ) : (
                <button onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer transition-colors">
                  {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
