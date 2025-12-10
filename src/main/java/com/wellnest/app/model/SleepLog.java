package com.wellnest.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@Entity
@Table(name = "sleep_logs")
public class SleepLog {
    // Getters/setters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="user_id", nullable = false)
    private Long userId;

    private Double hours;

    @Column(name="sleep_date")
    private LocalDate sleepDate;

    private String quality; // optional

    @Column(columnDefinition = "TEXT")
    private String notes;

    public SleepLog() {}

}
