package com.wellnest.app.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class WorkoutDto {
    // Getters/setters
    // Do not include id here for creation
    // userId can be optional during development; prefer server to obtain user from auth
    private Long userId;

    @NotBlank
    private String type;

    @Min(1)
    private Integer durationMinutes;

    private Integer caloriesBurned;
    private LocalDateTime performedAt;
    private String notes;

}
