package com.wellnest.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentDto {
    private String text;
    private String userName;

    public CommentDto() {
    }

    public CommentDto(String text, String userName) {
        this.text = text;
        this.userName = userName;
    }
}
