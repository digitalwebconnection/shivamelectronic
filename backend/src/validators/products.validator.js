import { AppError } from '../errors/AppError.js';

/**
 * Validate product creation request.
 */
export const validateCreateProduct = (req, res, next) => {
  const { name, category, brand, description } = req.body;
  if (!name || !category || !brand || !description) {
    return next(new AppError('Name, category, brand, and description are required', 400));
  }
  next();
};
