/**
 * Centralized constants.
 */
export const ROLES = {
  ADMIN: 'admin',
  CUSTOMER: 'Customer',
};

export const ORDER_STATUSES = ['Pending', 'Confirmed', 'Cancelled'];

export const HOT_DEALS_MAX = 2;

export const JWT_EXPIRY = '30d';

export const OTP_EXPIRY_MS = 60 * 1000;           // 60 seconds
export const OTP_SESSION_EXPIRY_MS = 60 * 60 * 1000; // 1 hour after verification

export const MAX_FILE_SIZE = 5 * 1024 * 1024;      // 5 MB
