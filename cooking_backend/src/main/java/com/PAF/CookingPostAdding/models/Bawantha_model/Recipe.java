package com.PAF.CookingPostAdding.models.Bawantha_model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "recipes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Recipe {

    @Id
    private String id;

    private boolean shared;
    private String title;
    private String mainImage;
    private String description;

    private List<String> mediaUrls = new ArrayList<>();
    private List<String> comments = new ArrayList<>();
    private List<Step> steps = new ArrayList<>();

    private List<String> likedBy = new ArrayList<>(); 
    private List<String> likes = new ArrayList<>();


    private String author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
