import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { protectAdmin } from '../middleware/auth.js';
import { sendOtpEmail } from '../utils/sendEmail.js';

dotenv.config();

const router = express.Router();

const generateToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'creasun_super_secret_jwt_key_2025',
    { expiresIn: '30d' }
  );
};

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@shivam.com';
    if (email.toLowerCase() === adminEmail.toLowerCase()) {
      return res.status(400).json({ success: false, message: 'Invalid registration request' });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: 'Customer'
    });

    const token = generateToken({ id: user._id, email: user.email, role: 'customer' });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: 'Customer',
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ success: false, message: 'Server error during signup' });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user (Admin or Customer) and get token
 * @access  Public
 */
router.post('/login', async (req, res) => {
  const { email, password, id } = req.body;
  const inputEmail = (email || id || '').toLowerCase();

  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@shivam.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

  if (inputEmail === adminEmail && password === adminPassword) {
    const token = generateToken({ email: adminEmail, role: 'admin' });
    return res.json({
      success: true,
      token,
      user: {
        email: adminEmail,
        name: 'Admin',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150'
      }
    });
  }

  try {
    const user = await User.findOne({ email: inputEmail });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken({ id: user._id, email: user.email, role: 'customer' });
      return res.json({
        success: true,
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: 'Customer',
          avatar: user.avatar
        }
      });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

/**
 * @route   GET /api/auth/verify
 * @desc    Verify admin token
 * @access  Private/Admin
 */
router.get('/verify', protectAdmin, (req, res) => {
  res.json({ success: true, message: 'Token is valid' });
});

/**
 * @route   GET /api/auth/users
 * @desc    Get all users (Admin only)
 * @access  Private/Admin
 */
router.get('/users', protectAdmin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Fetch users error:', error.message);
    res.status(500).json({ message: 'Server error fetching users' });
  }
});

/**
 * @route   POST /api/auth/forgot-password
 * @desc    Generate 6-digit OTP and send to user email
 * @access  Public
 */
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Return success anyway to avoid email enumeration
      return res.json({ success: true, message: 'If this email exists, an OTP has been sent.' });
    }

    // Generate 6-digit OTP (valid for 60 seconds)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 60 * 1000); // 60 seconds (1 minute)

    user.otpCode = otp;
    user.otpExpiry = expiry;
    await user.save();

    try {
      await sendOtpEmail(user.email, otp);
      console.log(`[OTP Email Success] Sent to ${user.email}`);
    } catch (emailErr) {
      console.error('[OTP Email Warning] SMTP Email sending failed:', emailErr.message || emailErr);
      console.log(`========================================`);
      console.log(`[SERVER FALLBACK OTP FOR ${user.email}]: ${otp}`);
      console.log(`========================================`);
    }

    res.json({ success: true, message: 'OTP sent to your email address (valid for 60 seconds).' });
  } catch (error) {
    console.error('Forgot password error:', error.message || error);
    res.status(500).json({ success: false, message: 'Failed to generate OTP. Server error.' });
  }
});

/**
 * @route   POST /api/auth/verify-otp
 * @desc    Verify the OTP is valid and not expired
 * @access  Public
 */
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP are required' });

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.otpCode || !user.otpExpiry) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    if (user.otpCode !== otp.trim()) {
      return res.status(400).json({ success: false, message: 'Incorrect OTP. Please try again.' });
    }

    if (new Date() > user.otpExpiry) {
      user.otpCode = null;
      user.otpExpiry = null;
      await user.save();
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
    }

    // Once OTP is verified, extend expiry session to 1 hour so user has unlimited time to set their new password
    user.otpExpiry = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    res.json({ success: true, message: 'OTP verified successfully.' });
  } catch (error) {
    console.error('Verify OTP error:', error.message);
    res.status(500).json({ success: false, message: 'Server error verifying OTP' });
  }
});

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset password after OTP is verified
 * @access  Public
 */
router.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !user.otpCode || user.otpCode !== otp.trim()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired session. Please restart.' });
    }
    if (new Date() > user.otpExpiry) {
      user.otpCode = null;
      user.otpExpiry = null;
      await user.save();
      return res.status(400).json({ success: false, message: 'OTP expired. Please restart the process.' });
    }

    user.password = newPassword;
    user.otpCode = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ success: true, message: 'Password reset successfully. You can now log in.' });
  } catch (error) {
    console.error('Reset password error:', error.message);
    res.status(500).json({ success: false, message: 'Server error resetting password' });
  }
});

export default router;
