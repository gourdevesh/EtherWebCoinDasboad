import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://mlmapi.raitechcorporation.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
