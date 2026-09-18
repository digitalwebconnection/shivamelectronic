import { apiClient } from './client';

export const categoriesApi = {
  getAll: () =>
    apiClient.get('/api/categories'),

  create: (data: { name: string; slug: string; icon?: string }, token: string) =>
    apiClient.post('/api/categories', data, token),

  update: (id: string, data: { name: string; icon?: string }, token: string) =>
    apiClient.put(`/api/categories/${id}`, data, token),

  delete: (slug: string, token: string) =>
    apiClient.delete(`/api/categories/${slug}`, token),
};
