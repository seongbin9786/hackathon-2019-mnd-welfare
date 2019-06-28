import axios from 'axios';

const api = axios.create({
  baseURL: 'https://code.hanjun.kim:8000'
});

export default api;
