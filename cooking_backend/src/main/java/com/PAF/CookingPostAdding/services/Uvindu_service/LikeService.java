package com.PAF.CookingPostAdding.services.Uvindu_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PAF.CookingPostAdding.models.Bawantha_model.Recipe;
import com.PAF.CookingPostAdding.repos.Bawantha_repo.RecipeRepository;

import java.util.HashSet;

@Service
public class LikeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public Recipe toggleLike(String recipeId, String userId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();

        if (recipe.getLikes() == null) {
            recipe.setLikes(new HashSet<>());  // Initialize if null
        }

        if (recipe.getLikes().contains(userId)) {
            recipe.getLikes().remove(userId);
        } else {
            recipe.getLikes().add(userId);
        }

        return recipeRepository.save(recipe);
    }
}
