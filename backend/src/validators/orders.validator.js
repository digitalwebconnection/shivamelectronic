import { AppError } from '../errors/AppError.js';

/**
 * Validate order placement request.
 */
export const validatePlaceOrder = (req, res, next) => {
  const { customerName, customerPhone, customerAddress, items } = req.body;
  if (!customerName || !customerPhone || !customerAddress) {
    return next(new AppError('Customer name, phone, and address are required', 400));
  }
  if (!items || !Array.isArray(items) || items.length === 0) {
    return next(new AppError('At least one item is required', 400));
  }
  next();
};
