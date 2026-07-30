import { apiClient } from './client';

export const productsApi = {
  getAll: () =>
    apiClient.get('/api/products'),

  create: (formData: FormData, token: string) =>
    apiClient.postForm('/api/products', formData, token),

  update: (id: string, formData: FormData, token: string) =>
    apiClient.putForm(`/api/products/${id}`, formData, token),

  toggleHot: (id: string, token: string) =>
    apiClient.put(`/api/products/${id}/toggle-hot`, {}, token),

  delete: (id: string, token: string) =>
    apiClient.delete(`/api/products/${id}`, token),
};
