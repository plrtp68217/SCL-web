import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // или process.env.VUE_APP_API_URL (если Vue CLI)
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;