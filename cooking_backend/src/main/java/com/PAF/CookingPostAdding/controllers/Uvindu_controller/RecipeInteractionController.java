package com.PAF.CookingPostAdding.controllers.Uvindu_controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.PAF.CookingPostAdding.models.Uvindu_model.RecipeInteraction;


@RestController
@RequestMapping("/api/recipeInteractions")
public class RecipeInteractionController {
    
    private final RecipeInteractionService recipeInteractionService;

    @Autowired
    public RecipeInteractionController(RecipeInteractionService recipeInteractionService) {
        this.recipeInteractionService = recipeInteractionService;
    }

    // Add a comment to a specific recipe
    @PostMapping("/{recipeId}/comment")
    public RecipeInteraction addComment(@PathVariable String recipeId, @RequestBody RecipeInteraction.Comment comment) {
        return recipeInteractionService.addComment(recipeId, comment);
    }

    // Add a like to a specific recipe
    @PostMapping("/{recipeId}/like")
    public RecipeInteraction addLike(@PathVariable String recipeId, @RequestBody RecipeInteraction.Like like) {
        return recipeInteractionService.addLike(recipeId, like);
    }

    // Toggle the share status of a recipe
    @PostMapping("/{recipeId}/share")
    public RecipeInteraction toggleShare(@PathVariable String recipeId) {
        return recipeInteractionService.toggleShare(recipeId);
    }

    // Get interactions for a specific recipe
    @GetMapping("/{recipeId}")
    public RecipeInteraction getInteractions(@PathVariable String recipeId) {
        return recipeInteractionService.getInteractions(recipeId);
    }
}
