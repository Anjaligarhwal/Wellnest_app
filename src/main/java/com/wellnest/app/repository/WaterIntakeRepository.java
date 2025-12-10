package com.wellnest.app.repository;

import com.wellnest.app.model.WaterIntake;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface WaterIntakeRepository extends JpaRepository<WaterIntake, Long> {
    List<WaterIntake> findByUserIdOrderByLoggedAtDesc(Long userId);
}
