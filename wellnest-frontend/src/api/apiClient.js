import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
});

apiClient.interceptors.request.use((config) => {
  if (
    config.url &&
    (config.url.startsWith("/auth/login") ||
      config.url.startsWith("/auth/register") ||
      config.url.startsWith("/auth/forgot-password") ||
      config.url.startsWith("/auth/reset-password"))
  ) {
    return config;
  }

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
