package com.wellnest.app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(name = "blog_posts")
public class BlogPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 500)
    private String excerpt;

    @Column(columnDefinition = "TEXT")
    private String content;

    private String author;

    private String role; // Admin, Trainer, User, Verified User

    private String category; // Nutrition, Fitness, Mental Wellness, Lifestyle

    @Column(columnDefinition = "LONGTEXT")
    private String image;

    private Integer likes = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public BlogPost() {
    }

    public BlogPost(String title, String excerpt, String content, String author, String role, String category,
            String image) {
        this.title = title;
        this.excerpt = excerpt;
        this.content = content;
        this.author = author;
        this.role = role;
        this.category = category;
        this.image = image;
        this.likes = 0;
    }
}
