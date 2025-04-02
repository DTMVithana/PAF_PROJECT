package com.PAF.CookingPostAdding.Bawantha_service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.PAF.CookingPostAdding.Bawantha_model.Recipe;
import com.PAF.CookingPostAdding.Bawantha_repo.RecipeRepository;

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
        recipe.setShared(false); // Default: not shared publicly
        return recipeRepository.save(recipe);
    }

    public Recipe getRecipe(Long id) {
        return recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public List<Recipe> getSharedRecipes() {
        return recipeRepository.findBySharedTrue();
    }

    public Recipe updateRecipe(Long id, Recipe updatedRecipe, String author) {
        Recipe recipe = getRecipe(id);
        recipe.setTitle(updatedRecipe.getTitle());
        recipe.setDescription(updatedRecipe.getDescription());
        recipe.setMediaUrls(updatedRecipe.getMediaUrls());
        recipe.setUpdatedAt(LocalDateTime.now());
        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(Long id, String author) {
        Recipe recipe = getRecipe(id);
        recipeRepository.delete(recipe);
    }

    // ✅ NEW: Share a post publicly
    public Recipe sharePost(Long id) {
        Recipe recipe = getRecipe(id);
        recipe.setShared(true);
        return recipeRepository.save(recipe);
    }

    public Recipe addComment(Long id, String comment) {
        Recipe recipe = getRecipe(id);
        recipe.getComments().add(comment); // ✅ Only store plain text
        return recipeRepository.save(recipe);
    }

    public Recipe updateComment(Long id, int index, String newComment) {
        Recipe recipe = getRecipe(id);
        if (index >= 0 && index < recipe.getComments().size()) {
            recipe.getComments().set(index, newComment);
        }
        return recipeRepository.save(recipe);
    }
    
    public Recipe deleteComment(Long id, int index) {
        Recipe recipe = getRecipe(id);
        if (index >= 0 && index < recipe.getComments().size()) {
            recipe.getComments().remove(index);
        }
        return recipeRepository.save(recipe);
    }
    
    
    
}
