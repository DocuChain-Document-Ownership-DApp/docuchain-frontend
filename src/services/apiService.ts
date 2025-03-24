import axios, {AxiosRequestConfig} from 'axios';
import {store} from "@/store/store.ts";

const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Content-Type': 'application/json',
    },
});

// **Request Interceptor**
apiClient.interceptors.request.use(
    (config) => {
        const state = store.getState(); // Get the Redux store state
        const token = state.auth.accessToken; // Assuming token is stored in `auth.token`
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        console.log("added", config);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Helper function for GET requests
export const get = async <T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.get(url, {params, ...config});
    console.log("Data", response.data);
    return response.data;
};

// Helper function for POST requests
export const post = async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.post(url, data, config);
    return response.data;
};

// Helper function for PUT requests
export const put = async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.put(url, data, config);
    return response.data;
};

// Helper function for DELETE requests
export const deleteRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.delete(url, config);
    return response.data;
};
