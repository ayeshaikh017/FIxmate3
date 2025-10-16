import api from './api';

const jobService = {
  createJob: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  getJobs: async (params) => {
    const response = await api.get('/jobs', { params });
    return response.data;
  },

  getJobById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  acceptJob: async (id) => {
    const response = await api.post(`/jobs/${id}/accept`);
    return response.data;
  },

  completeJob: async (id, data) => {
    const response = await api.post(`/jobs/${id}/complete`, data);
    return response.data;
  },

  cancelJob: async (id, reason) => {
    const response = await api.post(`/jobs/${id}/cancel`, { reason });
    return response.data;
  },
};

export default jobService;
