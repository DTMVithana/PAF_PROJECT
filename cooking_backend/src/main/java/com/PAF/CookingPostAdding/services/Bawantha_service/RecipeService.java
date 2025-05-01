package com.PAF.CookingPostAdding.services.Bawantha_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PAF.CookingPostAdding.models.Bawantha_model.Recipe;
import com.PAF.CookingPostAdding.repos.Bawantha_repo.RecipeRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public Recipe createRecipe(Recipe recipe, String author) {
        recipe.setAuthor(author);
        recipe.setCreatedAt(LocalDateTime.now());
        recipe.setUpdatedAt(LocalDateTime.now());
        recipe.setShared(false);
        return recipeRepository.save(recipe);
    }

    public Recipe getRecipe(String id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with ID: " + id));
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public List<Recipe> getSharedRecipes() {
        return recipeRepository.findBySharedTrue();
    }

    public Recipe updateRecipe(String id, Recipe updatedRecipe, String author) {
        Recipe existingRecipe = getRecipe(id);
        existingRecipe.setTitle(updatedRecipe.getTitle());
        existingRecipe.setDescription(updatedRecipe.getDescription());
        existingRecipe.setMediaUrls(updatedRecipe.getMediaUrls());
        existingRecipe.setSteps(updatedRecipe.getSteps());
        existingRecipe.setUpdatedAt(LocalDateTime.now());
        return recipeRepository.save(existingRecipe);
    }

    public void deleteRecipe(String id, String author) {
        Recipe recipe = getRecipe(id);
        recipeRepository.delete(recipe);
    }
}

