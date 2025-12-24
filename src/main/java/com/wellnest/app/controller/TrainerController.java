package com.wellnest.app.controller;

import com.wellnest.app.dto.TrainerResponse;
import com.wellnest.app.service.TrainerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainers")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class TrainerController {

    private final TrainerService trainerService;

    public TrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

    // GET /api/trainers - Get all trainers
    @GetMapping
    public ResponseEntity<List<TrainerResponse>> getAllTrainers() {
        List<TrainerResponse> trainers = trainerService.getAllTrainers();
        return ResponseEntity.ok(trainers);
    }

    // GET /api/trainers/match - Match trainers based on goal and location filters
    @GetMapping("/match")
    public ResponseEntity<List<TrainerResponse>> matchTrainers(
            @RequestParam(required = false, defaultValue = "All") String goal,
            @RequestParam(required = false, defaultValue = "Any") String location) {
        List<TrainerResponse> trainers = trainerService.matchTrainers(goal, location);
        return ResponseEntity.ok(trainers);
    }

    // GET /api/trainers/{id} - Get a specific trainer by ID
    @GetMapping("/{id}")
    public ResponseEntity<TrainerResponse> getTrainerById(@PathVariable Long id) {
        TrainerResponse trainer = trainerService.getTrainerById(id);
        if (trainer == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(trainer);
    }
}
