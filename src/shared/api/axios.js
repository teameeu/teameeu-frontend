import axios from "axios";
import { getToken, setToken, clearToken } from "./tokenStore";
import axios from "axios";

// axios 인스턴스
const axios = axios.create({
    baseURL: process.env.WAYMORE_API_URL,
    withCredentials: true,
});


// 요청 인터셉터
axios.interceptors.request.use((config) => {
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


axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.configl

        // 재발급 대기열
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            }).then((token => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            }));
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
            return axios(originalRequest);
        } catch (error) {
            processQueue(error, null);
            clearToken();
            window.location.href = '/login';
            return Promise.reject(error);
        } finally {
            isRefreshing = false;
        }
    }
);



export default axios;