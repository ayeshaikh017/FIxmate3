import api from './api';

const authService = {
  register: async (userData, type = 'user') => {
    const response = await api.post(`/auth/register/${type}`, userData);
    return response.data;
  },

  login: async (credentials, type = 'user') => {
    const response = await api.post(`/auth/login/${type}`, credentials);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export default authService;
