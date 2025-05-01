package com.PAF.CookingPostAdding.models.Uvindu_model;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import lombok.Data;
import lombok.AllArgsConstructor;

@Document(collection = "recipeInteractions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeInteraction {
    
    @Id
    private String id;

    private String recipeId; // Link to Recipe by its ID
    private List<Comment> comments = new ArrayList<>();
    private List<Like> likes = new ArrayList<>();
    private boolean shared; // 'shared' instead of 'isShared'
    private LocalDateTime createdAt;

    // Constructor with only recipeId
    public RecipeInteraction(String recipeId) {
        this.recipeId = recipeId;
        this.createdAt = LocalDateTime.now();
        this.shared = false;
    }

    // Inner static class for Comment
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Comment {
        private String userId;
        private String text;
        private LocalDateTime createdAt;
    }

    // Inner static class for Like
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Like {
        private String userId;
    }
}
