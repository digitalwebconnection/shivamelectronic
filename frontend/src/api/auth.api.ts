import { apiClient } from './client';

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post('/api/auth/login', { email, password }),

  signup: (name: string, email: string, password: string) =>
    apiClient.post('/api/auth/signup', { name, email, password }),

  verifyToken: (token: string) =>
    apiClient.get('/api/auth/verify', token),

  getUsers: (token: string) =>
    apiClient.get('/api/auth/users', token),

  forgotPassword: (email: string) =>
    apiClient.post('/api/auth/forgot-password', { email }),

  verifyOtp: (email: string, otp: string) =>
    apiClient.post('/api/auth/verify-otp', { email, otp }),

  resetPassword: (email: string, otp: string, newPassword: string) =>
    apiClient.post('/api/auth/reset-password', { email, otp, newPassword }),
};
