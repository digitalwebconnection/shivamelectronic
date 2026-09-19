import express from 'express';
import { protectAdmin } from '../middleware/auth.js';
import { validateSignup, validateLogin } from '../validators/auth.validator.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', validateSignup, authController.signupUser);
router.post('/login', validateLogin, authController.loginUser);
router.get('/verify', protectAdmin, authController.verifyToken);
router.get('/users', protectAdmin, authController.getUsers);
router.post('/forgot-password', authController.forgotPassword);
router.post('/verify-otp', authController.verifyOtp);
router.post('/reset-password', authController.resetPassword);

export default router;
