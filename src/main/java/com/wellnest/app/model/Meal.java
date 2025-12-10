package com.wellnest.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "meals")
public class Meal {
    // Getters & setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="user_id", nullable = false)
    private Long userId;

    @Column(name="meal_type", length = 32)
    private String mealType; // breakfast, lunch, dinner, snack

    private Integer calories;
    private Integer protein; // grams
    private Integer carbs;
    private Integer fats;

    @Column(name="logged_at")
    private LocalDateTime loggedAt;

    @Column(columnDefinition = "TEXT")
    private String notes;

    public Meal() {}

}
