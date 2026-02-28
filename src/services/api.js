import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Demo API endpoints
export const demoAPI = {
  // Generate a new demo
  generateDemo: (prompt, options = {}) =>
    api.post('/generate', {
      prompt,
      language: options.language || 'en',
      quality: options.quality || 'hd',
      voice: options.voice || 'default',
      ...options,
    }),

  // Get demo status and details
  getDemo: (demoId) =>
    api.get(`/demo/${demoId}`),

  // Get user's demo history
  getHistory: (page = 1, limit = 10) =>
    api.get('/history', {
      params: { page, limit },
    }),

  // Download demo video
  downloadDemo: (demoId) =>
    api.get(`/demo/${demoId}/download`, {
      responseType: 'blob',
    }),

  // Delete a demo
  deleteDemo: (demoId) =>
    api.delete(`/demo/${demoId}`),

  // Share a demo
  shareDemo: (demoId) =>
    api.post(`/demo/${demoId}/share`),

  // Get user credits
  getCredits: () =>
    api.get('/user/credits'),
};

// Auth API endpoints
export const authAPI = {
  register: (email, password, name) =>
    api.post('/auth/register', { email, password, name }),

  login: (email, password) =>
    api.post('/auth/login', { email, password }),

  logout: () => {
    localStorage.removeItem('access_token');
    return Promise.resolve();
  },

  getCurrentUser: () =>
    api.get('/auth/me'),
};

export default api;
