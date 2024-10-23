"use client";

import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import axios from "./axios";

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

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await axios.get("/Authentication/refresh");
        setToken(response.data.accessToken);
        setToken(response.data.user);
      } catch {
        setToken(null);
        setUser(null);
      }
    };

    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 403 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const response = await axios.get("/Authentication/refresh");
            setToken(response.data.accessToken);
            setUser(response.data.user);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            return axios(originalRequest);
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
      axios.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
