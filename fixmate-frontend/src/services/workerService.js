import api from './api';

const workerService = {
  getWorkers: async (params) => {
    const response = await api.get('/workers', { params });
    return response.data;
  },

  getWorkerById: async (id) => {
    const response = await api.get(`/workers/${id}`);
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put('/workers/profile', data);
    return response.data;
  },

  updateAvailability: async (data) => {
    const response = await api.put('/workers/availability', data);
    return response.data;
  },
};

export default workerService;
