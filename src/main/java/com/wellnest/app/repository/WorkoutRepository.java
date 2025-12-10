package com.wellnest.app.repository;

import com.wellnest.app.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<Workout , Long> {
    List<Workout> findByUserIdOrderByPerformedAtDesc(Long userId);
}
