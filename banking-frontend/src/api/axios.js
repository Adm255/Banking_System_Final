import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Matches Spring Boot Port
});

// Attach Token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;