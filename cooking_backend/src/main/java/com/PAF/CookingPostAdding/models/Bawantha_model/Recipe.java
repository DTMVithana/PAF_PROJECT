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

    private boolean shared;  // Added shared field

    private String title;
    private String mainImage;
    private String description;

    private List<String> mediaUrls = new ArrayList<>();
    private List<Step> steps = new ArrayList<>();

    private String author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Getter and Setter for shared field
    public boolean isShared() {
        return shared;
    }

    public void setShared(boolean shared) {
        this.shared = shared;
    }
}
