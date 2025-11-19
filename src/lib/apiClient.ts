// src/lib/apiClient.ts
import axios from "axios";
import type { AxiosRequestHeaders } from "axios";
import { getStoredToken } from "./auth";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000",
  withCredentials: false,
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    // Make sure headers exists and treat it as AxiosRequestHeaders
    const headers = (config.headers ?? {}) as AxiosRequestHeaders;

    headers.Authorization = `Bearer ${token}`;

    config.headers = headers;
  }

  return config;
});

export { apiClient };
