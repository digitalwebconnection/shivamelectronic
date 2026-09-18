import { AppError } from '../errors/AppError.js';

/**
 * Validate signup request body.
 */
export const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return next(new AppError('Name, email, and password are required', 400));
  if (password.length < 1) return next(new AppError('Password is required', 400));
  next();
};

/**
 * Validate login request body.
 */
export const validateLogin = (req, res, next) => {
  const { email, password, id } = req.body;
  if ((!email && !id) || !password) return next(new AppError('Email/ID and password are required', 400));
  next();
};
