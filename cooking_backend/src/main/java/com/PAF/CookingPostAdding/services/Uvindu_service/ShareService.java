package com.PAF.CookingPostAdding.services.Uvindu_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PAF.CookingPostAdding.models.Bawantha_model.Recipe;
import com.PAF.CookingPostAdding.repos.Bawantha_repo.RecipeRepository;

@Service
public class ShareService {
    
    @Autowired
    private RecipeRepository recipeRepository;

    public Recipe shareRecipe(String recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow();
        recipe.setShared(true);
        return recipeRepository.save(recipe);
    }
}
