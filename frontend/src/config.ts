// Dynamic backend API URL configuration
const getApiUrl = (): string => {
  // In development, always dynamically detect the active hostname (localhost or Wi-Fi IP)
  // to avoid caching issues when your local network IP changes.
  if (import.meta.env.DEV) {
    const hostname = window.location.hostname;
    return `http://${hostname}:5000`;
  }

  // In production, use VITE_API_URL if set, otherwise fallback to the current hostname
  return import.meta.env.VITE_API_URL || `http://${window.location.hostname}:5000`;
};

export const API_URL = getApiUrl();
