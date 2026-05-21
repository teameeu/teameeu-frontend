import axios from "axios";
import { getToken, setToken, clearToken } from "./tokenStore";

// axios 인스턴스
const instance = axios.create({
    baseURL: process.env.WAYMORE_API_URL,
    withCredentials: true,
});


// 요청 인터셉터
instance.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


// 응답 인터셉터
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        error ? reject(error) : resolve(token);
    });

    failedQueue = [];
}


instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return instance(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await axios.post(
                    `${process.env.WAYMORE_API_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newToken = data.accessToken;
                setToken(newToken);
                processQueue(null, newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return instance(originalRequest);
            } catch (err) {
                processQueue(err, null);
                clearToken();
                window.location.href = '/login';
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);



export default instance;