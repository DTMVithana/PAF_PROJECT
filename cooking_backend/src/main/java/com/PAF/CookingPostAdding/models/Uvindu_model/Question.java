package com.PAF.CookingPostAdding.models.Uvindu_model;

import java.time.LocalDateTime;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.*;
@Document(collection = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {

        @Id
    private String id;

    private String recipeId;    // Link the question to a specific recipe
    private String customerName;
    private String questionText;
    private String answerText;

    private LocalDateTime askedAt;
    private LocalDateTime answeredAt;
    
}
