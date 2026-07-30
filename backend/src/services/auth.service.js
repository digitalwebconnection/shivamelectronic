import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendOtpEmail } from '../utils/sendEmail.js';
import { AppError } from '../errors/AppError.js';
import { JWT_EXPIRY, OTP_EXPIRY_MS, OTP_SESSION_EXPIRY_MS } from '../constants/index.js';
import { logger } from '../utils/logger.js';

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'creasun_super_secret_jwt_key_2025', { expiresIn: JWT_EXPIRY });
};

export const signup = async ({ name, email, password }) => {
  if (!name || !email || !password) throw new AppError('All fields are required', 400);

  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) throw new AppError('User already exists with this email', 400);

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@shivam.com';
  if (email.toLowerCase() === adminEmail.toLowerCase()) throw new AppError('Invalid registration request', 400);

  const user = await User.create({ name, email: email.toLowerCase(), password, role: 'Customer' });
  const token = generateToken({ id: user._id, email: user.email, role: 'customer' });

  return { token, user: { id: user._id, email: user.email, name: user.name, role: 'Customer', avatar: user.avatar } };
};

export const login = async ({ email, password, id }) => {
  const inputEmail = (email || id || '').toLowerCase();
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@shivam.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

  if (inputEmail === adminEmail && password === adminPassword) {
    const token = generateToken({ email: adminEmail, role: 'admin' });
    return {
      token,
      user: { email: adminEmail, name: 'Admin', role: 'admin', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150' },
    };
  }

  const user = await User.findOne({ email: inputEmail });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken({ id: user._id, email: user.email, role: 'customer' });
    return { token, user: { id: user._id, email: user.email, name: user.name, role: 'Customer', avatar: user.avatar } };
  }

  throw new AppError('Invalid email or password', 401);
};

export const getAllUsers = async () => {
  return User.find({}).select('-password').sort({ createdAt: -1 });
};

export const forgotPassword = async (email) => {
  if (!email) throw new AppError('Email is required', 400);
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return { message: 'If this email exists, an OTP has been sent.' };

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otpCode = otp;
  user.otpExpiry = new Date(Date.now() + OTP_EXPIRY_MS);
  await user.save();

  try {
    await sendOtpEmail(user.email, otp);
    logger.info(`OTP sent to ${user.email}`);
  } catch (emailErr) {
    logger.error('SMTP Email sending failed:', emailErr.message);
    logger.info(`[FALLBACK OTP for ${user.email}]: ${otp}`);
  }

  return { message: 'OTP sent to your email address (valid for 60 seconds).' };
};

export const verifyOtp = async (email, otp) => {
  if (!email || !otp) throw new AppError('Email and OTP are required', 400);
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !user.otpCode || !user.otpExpiry) throw new AppError('Invalid or expired OTP', 400);
  if (user.otpCode !== otp.trim()) throw new AppError('Incorrect OTP. Please try again.', 400);
  if (new Date() > user.otpExpiry) {
    user.otpCode = null; user.otpExpiry = null; await user.save();
    throw new AppError('OTP has expired. Please request a new one.', 400);
  }
  user.otpExpiry = new Date(Date.now() + OTP_SESSION_EXPIRY_MS);
  await user.save();
  return { message: 'OTP verified successfully.' };
};

export const resetPassword = async (email, otp, newPassword) => {
  if (!email || !otp || !newPassword) throw new AppError('All fields are required', 400);
  if (newPassword.length < 6) throw new AppError('Password must be at least 6 characters', 400);
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !user.otpCode || user.otpCode !== otp.trim()) throw new AppError('Invalid or expired session.', 400);
  if (new Date() > user.otpExpiry) {
    user.otpCode = null; user.otpExpiry = null; await user.save();
    throw new AppError('OTP expired. Please restart the process.', 400);
  }
  user.password = newPassword;
  user.otpCode = null;
  user.otpExpiry = null;
  await user.save();
  return { message: 'Password reset successfully. You can now log in.' };
};
