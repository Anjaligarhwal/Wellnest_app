package com.wellnest.app.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class MealDto {

    // Getters & Setters
    private Long userId;

    @NotBlank(message = "Meal type is required")
    private String mealType; // breakfast, lunch, dinner, snack

    @NotNull(message = "Calories are required")
    @Min(value = 0, message = "Calories cannot be negative")
    private Integer calories;

    @Min(value = 0, message = "Protein must be >= 0")
    private Integer protein; // grams (optional)

    @Min(value = 0, message = "Carbs must be >= 0")
    private Integer carbs;

    @Min(value = 0, message = "Fats must be >= 0")
    private Integer fats;

    private LocalDateTime loggedAt; // defaults to now
    private String notes;

}
