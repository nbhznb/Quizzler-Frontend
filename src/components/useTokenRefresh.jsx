// useTokenRefresh.jsx
import { useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';

const useTokenRefresh = () => {
  const { token, refreshToken, login, logout } = useContext(UserContext);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const response = await axios.post('http://localhost:5273/api/users/refresh-token', {
              refreshToken: refreshToken,
            });

            if (response.status === 200) {
              const { token: newToken, refreshToken: newRefreshToken } = response.data;
              login(null, newToken, newRefreshToken);
              originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
              return axios(originalRequest);
            }
          } catch (err) {
            logout();
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [token, refreshToken, login, logout]);
};

export default useTokenRefresh;
