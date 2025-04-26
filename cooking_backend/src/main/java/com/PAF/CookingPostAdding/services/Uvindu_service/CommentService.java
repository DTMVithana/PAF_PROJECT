package com.PAF.CookingPostAdding.services.Uvindu_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PAF.CookingPostAdding.models.Bawantha_model.Recipe;
import com.PAF.CookingPostAdding.repos.Bawantha_repo.RecipeRepository;

@Service

public class CommentService {

    @Autowired
    private RecipeRepository recipeRepository;

    public Recipe addComment(String recipeId, String comment) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        recipe.getComments().add(comment);
        return recipeRepository.save(recipe);
    }

    public Recipe updateComment(String recipeId, int index, String comment) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        if (index >= 0 && index < recipe.getComments().size()) {
            recipe.getComments().set(index, comment);
        }
        return recipeRepository.save(recipe);
    }

    public Recipe deleteComment(String recipeId, int index) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        if (index >= 0 && index < recipe.getComments().size()) {
            recipe.getComments().remove(index);
        }
        return recipeRepository.save(recipe);
    }
}
