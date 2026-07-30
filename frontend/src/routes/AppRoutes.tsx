/**
 * Centralized routing configuration.
 * This module defines all application routes and their corresponding page components.
 *
 * Note: The current app uses a custom `setCurrentPage` state-based routing system
 * rather than React Router. This file serves as a reference map for the route structure.
 * When migrating to React Router in the future, route definitions should be placed here.
 */

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/product-details/:slug',
  ABOUT: '/about',
  CONTACT: '/contact',
  PROFILE: '/profile',
  ADMIN: '/admin',
  NOT_FOUND: '/404',
} as const;

/**
 * Generate a product detail URL from a product name.
 */
export const getProductDetailUrl = (productName: string): string => {
  const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `/products/product-details/${slug}`;
};
