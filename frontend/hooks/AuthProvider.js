"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import api from "./axios";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (authContext == undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const response = await api.get("/Authentication/refresh");

            setToken(response.data.accessToken);
            setUser(response.data.user);

            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return api(originalRequest);
          } catch (refreshError) {
            setToken(null);
            setUser(null);

            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
