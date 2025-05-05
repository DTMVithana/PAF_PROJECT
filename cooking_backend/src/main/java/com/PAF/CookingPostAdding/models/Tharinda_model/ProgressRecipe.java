package com.PAF.CookingPostAdding.models.Tharinda_model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.PAF.CookingPostAdding.models.Bawantha_model.Step;

import lombok.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "recipes")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class ProgressRecipe{

    @Id
    private String id;

    private boolean shared;
    private String title;
    private String mainImage;
    private String description;
    private int estimatedtime;
    private int number_of_steps;
    private int currentstep;
    private String status;

    private List<String> mediaUrls = new ArrayList<>();
    private List<Step> steps = new ArrayList<>();

    private String author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    
}
