package com.PAF.CookingPostAdding.Bawantha_model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private boolean shared;

    private String title;

    private String mainImage;

    @Column(length = 1000)
    private String description;

    @ElementCollection
    private List<String> mediaUrls;

    @ElementCollection
    private List<String> comments = new ArrayList<>();

    @ElementCollection
    private List<Step> steps = new ArrayList<>(); // ✅ New field for structured steps

    private String author;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
