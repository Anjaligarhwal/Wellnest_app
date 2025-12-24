// src/api/trainerApi.js
import apiClient from "./apiClient";

/**
 * Trainer API - connects frontend to Spring Boot backend
 */

// Get all trainers
export const getAllTrainers = () => apiClient.get("/trainers");

// Match trainers based on goal and location filters
export const matchTrainers = (goal = 'All', location = 'Any') => {
    return apiClient.get("/trainers/match", {
        params: { goal, location }
    });
};

// Get a specific trainer by ID
export const getTrainerById = (id) => apiClient.get(`/trainers/${id}`);
