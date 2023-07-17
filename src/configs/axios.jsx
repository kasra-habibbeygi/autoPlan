/* eslint-disable no-undef */
import axios from 'axios';
import toast from 'react-hot-toast';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

instance.interceptors.request.use(async config => {
    if (config.data) {
        for (const key of Object.keys(config.data)) {
            if (config.data[key] === '') {
                delete config.data[key];
            }
        }
    }

    if (typeof window !== 'undefined' && localStorage.getItem('AutoPlaningToken') !== null) {
        config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('AutoPlaningToken')).token}`;
    }

    return config;
});

instance.interceptors.response.use(
    res => {
        return res;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;
