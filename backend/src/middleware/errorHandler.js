import { logger } from '../utils/logger.js';

/**
 * Global error handler middleware.
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' && statusCode === 500
    ? 'Internal Server Error'
    : err.message;

  logger.error(`[${req.method}] ${req.originalUrl} — ${err.message}`);

  res.status(statusCode).json({
    success: false,
    message,
  });
};
