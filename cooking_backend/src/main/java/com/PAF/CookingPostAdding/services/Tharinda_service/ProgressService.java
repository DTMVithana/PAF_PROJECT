package com.PAF.CookingPostAdding.services.Tharinda_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PAF.CookingPostAdding.models.Tharinda_model.ProgressRecipe;
import com.PAF.CookingPostAdding.repos.Tharinda_repo.ProgressRecipeRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProgressService {

    @Autowired
    private ProgressRecipeRepository recipeRepository;
    
    // New method to match the controller endpoint
    public List<ProgressRecipe> getAllProgressRecipes() {
        return recipeRepository.findAll();
    }

    public ProgressRecipe getRecipe(String id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));
    }

    public List<ProgressRecipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public List<ProgressRecipe> getSharedRecipes() {
        return recipeRepository.findBySharedTrue();
    }

    public List<ProgressRecipe> getOngoingRecipes() {
        return recipeRepository.findByStatus("In Progress");
    }

    public ProgressRecipe createRecipe(ProgressRecipe recipe, String author) {
        recipe.setAuthor(author);
        recipe.setCreatedAt(LocalDateTime.now());
        recipe.setUpdatedAt(LocalDateTime.now());
        recipe.setShared(false);
        return recipeRepository.save(recipe);
    }


    public ProgressRecipe updateRecipe(String id, ProgressRecipe updatedRecipe, String author) {
        ProgressRecipe recipe = getRecipe(id);
        recipe.setTitle(updatedRecipe.getTitle());
        recipe.setDescription(updatedRecipe.getDescription());
        recipe.setMediaUrls(updatedRecipe.getMediaUrls());
        recipe.setEstimatedtime(updatedRecipe.getEstimatedtime());
        recipe.setNumber_of_steps(updatedRecipe.getNumber_of_steps());
        recipe.setCurrentstep(updatedRecipe.getCurrentstep());
        recipe.setStatus(updatedRecipe.getStatus());
        recipe.setSteps(updatedRecipe.getSteps());
        recipe.setUpdatedAt(LocalDateTime.now());
        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(String id, String author) {
        ProgressRecipe recipe = getRecipe(id);
        recipeRepository.delete(recipe);
    }

    // Share a post publicly
    public ProgressRecipe sharePost(String id) {
        ProgressRecipe recipe = getRecipe(id);
        recipe.setShared(true);
        return recipeRepository.save(recipe);
    }
}