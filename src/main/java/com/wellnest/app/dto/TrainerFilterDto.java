package com.wellnest.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TrainerFilterDto {
    private String goal;
    private String location;

    public TrainerFilterDto() {
    }

    public TrainerFilterDto(String goal, String location) {
        this.goal = goal;
        this.location = location;
    }
}
