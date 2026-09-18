import * as authService from '../services/auth.service.js';

export const signupUser = async (req, res, next) => {
  try { const result = await authService.signup(req.body); res.status(201).json({ success: true, ...result }); }
  catch (err) { next(err); }
};

export const loginUser = async (req, res, next) => {
  try { const result = await authService.login(req.body); res.json({ success: true, ...result }); }
  catch (err) { next(err); }
};

export const verifyToken = (req, res) => {
  res.json({ success: true, message: 'Token is valid' });
};

export const getUsers = async (req, res, next) => {
  try { res.json(await authService.getAllUsers()); }
  catch (err) { next(err); }
};

export const forgotPassword = async (req, res, next) => {
  try { const result = await authService.forgotPassword(req.body.email); res.json({ success: true, ...result }); }
  catch (err) { next(err); }
};

export const verifyOtp = async (req, res, next) => {
  try { const result = await authService.verifyOtp(req.body.email, req.body.otp); res.json({ success: true, ...result }); }
  catch (err) { next(err); }
};

export const resetPassword = async (req, res, next) => {
  try { const result = await authService.resetPassword(req.body.email, req.body.otp, req.body.newPassword); res.json({ success: true, ...result }); }
  catch (err) { next(err); }
};
