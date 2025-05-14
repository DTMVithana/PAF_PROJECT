package com.PAF.CookingPostAdding.controllers.Tharinda_controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.PAF.CookingPostAdding.models.Tharinda_model.ProgressRecipe;
import com.PAF.CookingPostAdding.services.Tharinda_service.ProgressService;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/ongoing")
@CrossOrigin(origins = "http://localhost:3000") // Frontend URL
public class ProgressController {

    @Autowired
    private ProgressService progressService;
    
    // New endpoint to match the frontend fetch request
    @GetMapping("/recipes")
    public ResponseEntity<List<ProgressRecipe>> getAllProgressRecipes() {
        List<ProgressRecipe> recipes = progressService.getAllRecipes();
        return ResponseEntity.ok(recipes);
    }
    
    // Keep your existing endpoints
    @GetMapping
    public List<ProgressRecipe> getAllRecipes() {
        return progressService.getAllRecipes();
    }
    
    @GetMapping("/shared")
    public List<ProgressRecipe> getSharedRecipes() {
        return progressService.getSharedRecipes();
    }
    
    @GetMapping("/ongoing")
    public List<ProgressRecipe> getOngoingRecipes() {
        return progressService.getOngoingRecipes();
    }
    
    @GetMapping("/{id}")
    public ProgressRecipe getRecipe(@PathVariable String id) {
        return progressService.getRecipe(id);
    }
    
   @PostMapping
   public ProgressRecipe createRecipe(@RequestBody ProgressRecipe progressrecipe) { // Fixed parameter name
    System.out.println("Received recipe: " + progressrecipe);
    progressrecipe.setAuthor("anonymous");
    progressrecipe.setCreatedAt(LocalDateTime.now());  // Add creation timestamp
    progressrecipe.setUpdatedAt(LocalDateTime.now());  // Add update timestamp

    ProgressRecipe savedRecipe = progressService.createRecipe(progressrecipe, progressrecipe.getAuthor());
    System.out.println("Saved recipe: " + savedRecipe);
    return progressService.createRecipe(progressrecipe, progressrecipe.getAuthor());
    }
    
    @PutMapping("/{id}")
    public ProgressRecipe updateRecipe(@PathVariable String id, @RequestBody ProgressRecipe progressrecipe) {
        return progressService.updateRecipe(id, progressrecipe, null);
    }
    
    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable String id) {
        progressService.deleteRecipe(id, "anonymous");
    }
    
    // Share post
    @PutMapping("/{id}/share")
    public ProgressRecipe sharePost(@PathVariable String id) {
        return progressService.sharePost(id);
    }
}