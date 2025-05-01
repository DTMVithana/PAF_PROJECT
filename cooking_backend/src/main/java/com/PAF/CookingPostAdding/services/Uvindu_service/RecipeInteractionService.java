package com.PAF.CookingPostAdding.services.Uvindu_service;

import org.springframework.beans.factory.annotation.Autowired;

import com.PAF.CookingPostAdding.models.Uvindu_model.RecipeInteraction;
import com.PAF.CookingPostAdding.repos.Bawantha_repo.RecipeRepository;
import com.PAF.CookingPostAdding.repos.Uvindu_repo.RecipeInteractionRepository;

import org.springframework.stereotype.Service;


@Service
public class RecipeInteractionService {
    
    private final RecipeInteractionRepository recipeInteractionRepository;
    private final RecipeRepository recipeRepository;

    @Autowired
    public RecipeInteractionService(RecipeInteractionRepository recipeInteractionRepository, RecipeRepository recipeRepository) {
        this.recipeInteractionRepository = recipeInteractionRepository;
        this.recipeRepository = recipeRepository;
    }

    // Add a comment to the recipe
    public RecipeInteraction addComment(String recipeId, RecipeInteraction.Comment comment) {
        RecipeInteraction recipeInteraction = getOrCreateRecipeInteraction(recipeId);
        recipeInteraction.getComments().add(comment);
        return recipeInteractionRepository.save(recipeInteraction);
    }

    // Add a like to the recipe
    public RecipeInteraction addLike(String recipeId, RecipeInteraction.Like like) {
        RecipeInteraction recipeInteraction = getOrCreateRecipeInteraction(recipeId);
        recipeInteraction.getLikes().add(like);
        return recipeInteractionRepository.save(recipeInteraction);
    }

    // Toggle the share status of the recipe
    public RecipeInteraction toggleShare(String recipeId) {
        RecipeInteraction recipeInteraction = getOrCreateRecipeInteraction(recipeId);
        recipeInteraction.setShared(!recipeInteraction.isShared());
        return recipeInteractionRepository.save(recipeInteraction);
    }

    // Get all interactions (comments, likes, share status) for a recipe
    public RecipeInteraction getInteractions(String recipeId) {
        return recipeInteractionRepository.findByRecipeId(recipeId)
                .orElseThrow(() -> new RuntimeException("No interactions found for this recipe"));
    }

    // Helper method to get or create a RecipeInteraction
    private RecipeInteraction getOrCreateRecipeInteraction(String recipeId) {
        return recipeInteractionRepository.findByRecipeId(recipeId)
                .orElseGet(() -> new RecipeInteraction(recipeId));
    }
}
