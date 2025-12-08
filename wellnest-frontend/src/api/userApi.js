import apiClient from "./apiClient";

export const fetchCurrentUser = () => apiClient.get("/users/me");
