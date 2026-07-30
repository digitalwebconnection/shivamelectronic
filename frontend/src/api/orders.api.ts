import { apiClient } from './client';

export const ordersApi = {
  place: (orderData: any) =>
    apiClient.post('/api/orders', orderData),

  getMy: (token: string) =>
    apiClient.get('/api/orders/my', token),

  getAll: (token: string) =>
    apiClient.get('/api/orders', token),

  updateStatus: (id: string, status: string, token: string) =>
    apiClient.put(`/api/orders/${id}/status`, { status }, token),

  delete: (id: string, token: string) =>
    apiClient.delete(`/api/orders/${id}`, token),
};
