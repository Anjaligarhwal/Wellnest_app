package com.wellnest.app.service;

import com.wellnest.app.dto.TrainerResponse;
import com.wellnest.app.model.Trainer;
import com.wellnest.app.repository.TrainerRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainerService {

    private final TrainerRepository trainerRepository;

    public TrainerService(TrainerRepository trainerRepository) {
        this.trainerRepository = trainerRepository;
    }

    // Initialize default trainers if database is empty
    @PostConstruct
    @Transactional
    public void initializeDefaultTrainers() {
        if (trainerRepository.count() == 0) {
            List<Trainer> defaultTrainers = Arrays.asList(
                    new Trainer(
                            "Alex Johnson",
                            Arrays.asList("Muscle Gain", "Strength Training"),
                            8,
                            4.9,
                            "New York",
                            Arrays.asList("Mon", "Wed", "Fri"),
                            "Certified strength coach helping you build muscle and confidence.",
                            "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1887&auto=format&fit=crop",
                            "alex.j@wellnest_trainers.com",
                            "+1 (555) 012-3456"),
                    new Trainer(
                            "Sarah Lee",
                            Arrays.asList("Yoga", "Flexibility", "Mental Wellness"),
                            5,
                            4.8,
                            "Online",
                            Arrays.asList("Tue", "Thu", "Sat"),
                            "Yoga instructor focused on holistic health and mindfulness.",
                            "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop",
                            "sarah.yoga@wellnest_trainers.com",
                            "+1 (555) 012-7890"),
                    new Trainer(
                            "Mike Chen",
                            Arrays.asList("Weight Loss", "HIIT", "Cardio"),
                            6,
                            4.7,
                            "San Francisco",
                            Arrays.asList("Mon", "Tue", "Thu", "Fri"),
                            "High energy trainer specialized in fat loss and metabolic conditioning.",
                            "https://images.unsplash.com/photo-1627931105822-6b99d5543c3a?u=4r&q=80&w=2000&auto=format&fit=crop",
                            "mike.chen@wellnest_trainers.com",
                            "+1 (555) 012-4567"),
                    new Trainer(
                            "Jessica Davis",
                            Arrays.asList("Rehabilitation", "Mobility", "Senior Fitness"),
                            12,
                            5.0,
                            "Chicago",
                            Arrays.asList("Wed", "Fri"),
                            "Helping you recover from injuries and move pain-free.",
                            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
                            "jessica.rehab@wellnest_trainers.com",
                            "+1 (555) 012-8901"),
                    new Trainer(
                            "David Kim",
                            Arrays.asList("CrossFit", "Endurance", "Muscle Gain"),
                            4,
                            4.6,
                            "Online",
                            Arrays.asList("Sat", "Sun"),
                            "Pushing your limits with functional fitness and endurance training.",
                            "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1887&auto=format&fit=crop",
                            "david.fit@wellnest_trainers.com",
                            "+1 (555) 012-2345"));

            trainerRepository.saveAll(defaultTrainers);
        }
    }

    public List<TrainerResponse> getAllTrainers() {
        return trainerRepository.findAllByOrderByRatingDesc()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<TrainerResponse> matchTrainers(String goal, String location) {
        List<Trainer> allTrainers = trainerRepository.findAll();

        return allTrainers.stream()
                .filter(trainer -> matchesGoal(trainer, goal))
                .filter(trainer -> matchesLocation(trainer, location))
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private boolean matchesGoal(Trainer trainer, String goal) {
        if (goal == null || goal.equalsIgnoreCase("All")) {
            return true;
        }

        // Check if any specialty matches the goal
        boolean directMatch = trainer.getSpecialties().stream()
                .anyMatch(s -> s.toLowerCase().contains(goal.toLowerCase()));

        // Fallback logic: if goal is 'Weight Loss' and trainer has 'HIIT' or 'Cardio',
        // that's a match too
        if (!directMatch && goal.equalsIgnoreCase("Weight Loss")) {
            directMatch = trainer.getSpecialties().stream()
                    .anyMatch(s -> s.equalsIgnoreCase("HIIT") || s.equalsIgnoreCase("Cardio"));
        }

        return directMatch;
    }

    private boolean matchesLocation(Trainer trainer, String location) {
        if (location == null || location.equalsIgnoreCase("Any")) {
            return true;
        }

        if (location.equalsIgnoreCase("Online")) {
            return trainer.getLocation().equalsIgnoreCase("Online");
        }

        // If specific city, match city OR Online trainers are also available
        return trainer.getLocation().equalsIgnoreCase(location) ||
                trainer.getLocation().equalsIgnoreCase("Online");
    }

    public TrainerResponse getTrainerById(Long id) {
        return trainerRepository.findById(id)
                .map(this::toResponse)
                .orElse(null);
    }

    private TrainerResponse toResponse(Trainer trainer) {
        return new TrainerResponse(
                trainer.getId(),
                trainer.getName(),
                trainer.getSpecialties(),
                trainer.getExperience(),
                trainer.getRating(),
                trainer.getLocation(),
                trainer.getAvailability(),
                trainer.getBio(),
                trainer.getImage(),
                trainer.getEmail(),
                trainer.getPhone());
    }
}
