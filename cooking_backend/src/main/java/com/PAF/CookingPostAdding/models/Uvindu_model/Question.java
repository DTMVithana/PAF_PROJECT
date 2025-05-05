package com.PAF.CookingPostAdding.models.Uvindu_model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

public class Question {
    
    @Id
    private String id;

    private String recipeId;
    private String user;         // Could be name, email or a UUID if you have authentication
    private String content;
    private LocalDateTime timestamp;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getRecipeId() { return recipeId; }
    public void setRecipeId(String recipeId) { this.recipeId = recipeId; }

    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
