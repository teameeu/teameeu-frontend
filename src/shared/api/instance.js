import axios from "axios";
import { getToken, setToken, clearToken } from "./tokenStore";

// axios 인스턴스
const instance = axios.create({
    baseURL: `${process.env.REACT_APP_WAYMORE_API_URL}/api`,
    withCredentials: true,
});

const AUTH_EXCLUDE_PATHS = ["/auth/refresh", "/auth/login", "/auth/join"];

const isExcludedAuthPath = (url = "") => AUTH_EXCLUDE_PATHS.some((path) => url.includes(path));

const deleteHeader = (headers, key) => {
    if (!headers) return;

    if (typeof headers.delete === "function") {
        headers.delete(key);
        return;
    }

    delete headers[key];
    delete headers[key.toLowerCase()];
};

// 요청 인터셉터
instance.interceptors.request.use((config) => {
    const requestUrl = config.url || "";

    config.headers = config.headers || {};

    if (isExcludedAuthPath(requestUrl)) {
        deleteHeader(config.headers, "Authorization");
        return config;
    }

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
        const requestUrl = originalRequest?.url || "";

        if (isExcludedAuthPath(requestUrl)) {
            return Promise.reject(error);
        }

        const statusCode = error.response?.status;
        const shouldRefresh = statusCode === 401 || statusCode === 403;

        if (shouldRefresh && !originalRequest?._retry) {

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return instance(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await axios.post(
                    `${process.env.REACT_APP_WAYMORE_API_URL}/api/auth/refresh`,
                    {},
                    { withCredentials: true }
                );
                
                const payload = data?.data ?? data;
                const newToken = payload?.accessToken;
                if (!newToken) throw new Error("refresh accessToken 미발급");

                setToken(newToken);
                instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
                processQueue(null, newToken);
                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return instance(originalRequest);
            } catch (err) {
                processQueue(err, null);
                clearToken();
                delete instance.defaults.headers.common.Authorization;
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
