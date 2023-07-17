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
        config.headers.Authorization = `Bearer ${localStorage.getItem('AutoPlaningToken')}`;
    }

    return config;
});

instance.interceptors.response.use(
    res => {
        if (res?.data?.detail && res?.status === 200) {
            toast.success(res?.data?.detail, { style: { zIndex: 2000 } });
        }
        return res;
    },
    error => {
        return Promise.reject(error);
    }
);

export default instance;
