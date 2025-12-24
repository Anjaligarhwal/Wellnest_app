package com.wellnest.app.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProfileUpdateRequest {

    private Integer age;
    private Double heightCm;
    private Double weightKg;

    private String gender;
    private String fitnessGoal;
    private String phone;

    public ProfileUpdateRequest() {
    }

}
