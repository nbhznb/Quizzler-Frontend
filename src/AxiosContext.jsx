// src/AxiosContext.jsx
import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useToast } from './components/Toast';

const API_URL = import.meta.env.VITE_API_URL;

// src/AxiosContext.jsx
const createAxiosInstance = (addToast, token) => {
  const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
    retry: 3,
    retryDelay: (retryCount) => retryCount * 1000,
  });

  // Request interceptor
  const requestInterceptorId = instance.interceptors.request.use(
    (config) => {
      console.log('Request interceptor triggered');
      // Use the token from props first, fallback to localStorage
      const authToken = token || localStorage.getItem('token');
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => {
      addToast?.('Request failed', 'error');
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  const responseInterceptorId = instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshResponse = await axiosInstance.post('/users/refresh-token', {
            refreshToken: localStorage.getItem('refreshToken'),
          });

          if (refreshResponse.status === 200) {
            const { token: newToken, refreshToken: newRefreshToken } = refreshResponse.data;
            localStorage.setItem('token', newToken);
            localStorage.setItem('refreshToken', newRefreshToken);
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const AxiosContext = React.createContext(null);

function AxiosProvider({ children }) {
  const { addToast } = useToast();
  const token = useSelector((state) => state.user.token);

  const instance = React.useMemo(
    () => createAxiosInstance(addToast, token),
    [addToast, token]
  );

  return <AxiosContext.Provider value={instance}>{children}</AxiosContext.Provider>;
}

function useAxios() {
  const instance = React.useContext(AxiosContext);
  if (!instance) {
    throw new Error("useAxios must be used within an AxiosProvider");
  }
  return instance;
}

// These hooks can stay but might not be needed as often now
const useRequestInterceptor = (config = (c) => c, error = (e) => Promise.reject(e), deps = []) => {
  const axiosInstance = useAxios();

  React.useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use(config, error);
    return () => axiosInstance.interceptors.request.eject(interceptor);
  }, deps);
};

const useResponseInterceptor = (success = (r) => r, error = (e) => Promise.reject(e), deps = []) => {
  const axiosInstance = useAxios();

  React.useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(success, error);
    return () => axiosInstance.interceptors.response.eject(interceptor);
  }, deps);
};

export { AxiosProvider, useAxios, useRequestInterceptor, useResponseInterceptor };
