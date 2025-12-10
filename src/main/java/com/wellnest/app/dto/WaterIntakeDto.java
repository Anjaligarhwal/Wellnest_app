package com.wellnest.app.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
public class WaterIntakeDto {

    private Long userId;

    @NotNull(message = "Water amount is required")
    @Min(value = 1, message = "Water intake must be at least 1 ml")
    private Double liters; // 0.25, 0.5, 1.0 etc.

    private LocalDateTime loggedAt; // defaults to now
    private String notes;

}
