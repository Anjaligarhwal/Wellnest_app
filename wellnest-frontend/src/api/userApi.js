import apiClient from "./apiClient";

// Get current user profile
export const fetchCurrentUser = () => apiClient.get("/users/me");

// Update user profile
export const updateUserProfile = (profileData) => apiClient.put("/users/me/profile", profileData);
