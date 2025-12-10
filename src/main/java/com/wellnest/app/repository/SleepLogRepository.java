package com.wellnest.app.repository;

import com.wellnest.app.model.SleepLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SleepLogRepository extends JpaRepository<SleepLog, Long> {
    List<SleepLog> findByUserIdOrderBySleepDateDesc(Long userId);
}
