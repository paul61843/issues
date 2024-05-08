import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.PUBLIC_SERVER_API_HOST,
});

export interface ErrorResponseData {
    status: "error";
    message: string;
}

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error(error);
    }
);

export default instance;