package com.PAF.CookingPostAdding.models.Uvindu_model;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
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

    private String recipeId; // This links to the Recipe by its ID
    private List<Comment> comments;
    private List<Like> likes;
    private boolean isShared;
    private LocalDateTime createdAt;

    public RecipeInteraction(String recipeId) {
        this.recipeId = recipeId;
        this.createdAt = LocalDateTime.now();
        this.comments = null;
        this.likes = null;
        this.isShared = false;
    }

    public static class Comment {
        private String userId;
        private String text;
        private LocalDateTime createdAt;

        public Comment(String userId, String text) {
            this.userId = userId;
            this.text = text;
            this.createdAt = LocalDateTime.now();
        }
    }

    public static class Like {
        private String userId;

        public Like(String userId) {
            this.userId = userId;
        }
    }
}
