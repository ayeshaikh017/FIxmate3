import api from './api';

export default {
  createJob: (data) => api.post('/jobs', data),
  getJobs: (params) => api.get('/jobs', { params }),
  getJobById: (id) => api.get(`/jobs/${id}`),
  acceptJob: (id) => api.post(`/jobs/${id}/accept`),
  completeJob: (id) => api.post(`/jobs/${id}/complete`),
  cancelJob: (id) => api.post(`/jobs/${id}/cancel`),
};
