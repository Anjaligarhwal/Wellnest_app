package com.wellnest.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileResponse {

    private String name;
    private String email;
    private String role;

    private Integer age;
    private Double heightCm;

    private Double weightKg;
    private String gender;
    private String fitnessGoal;
    private String phone;

    public UserProfileResponse() {
    }

    public UserProfileResponse(String name, String email, String role,
            Integer age, Double heightCm, Double weightKg,
            String gender, String fitnessGoal, String phone) {
        this.name = name;
        this.email = email;
        this.role = role;
        this.age = age;
        this.heightCm = heightCm;
        this.weightKg = weightKg;
        this.gender = gender;
        this.fitnessGoal = fitnessGoal;
        this.phone = phone;
    }
}
