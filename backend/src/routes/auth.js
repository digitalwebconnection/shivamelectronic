import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { protectAdmin } from '../middleware/auth.js';

dotenv.config();

const router = express.Router();

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate admin and get token
 * @access  Public
 */
router.post('/login', (req, res) => {
  const { email, password, id } = req.body;

  // Accept email or id interchangeably for ease of use
  const inputEmail = email || id;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@shivam.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';

  if (inputEmail === adminEmail && password === adminPassword) {
    // Generate JWT token
    const token = jwt.sign(
      { email: adminEmail, role: 'admin' },
      process.env.JWT_SECRET || 'creasun_super_secret_jwt_key_2025',
      { expiresIn: '30d' } // Long-lived login for dashboard convenience
    );

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
  } else {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid Admin Credentials' 
    });
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

export default router;
