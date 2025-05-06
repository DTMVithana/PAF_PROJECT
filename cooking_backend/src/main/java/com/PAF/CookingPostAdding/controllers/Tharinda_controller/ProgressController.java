package com.PAF.CookingPostAdding.controllers.Tharinda_controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.PAF.CookingPostAdding.models.Tharinda_model.ProgressRecipe;
import com.PAF.CookingPostAdding.services.Tharinda_service.ProgressService;

import java.util.List;

@RestController
@RequestMapping("/api/ongoing")
public class ProgressController {
    
    @Autowired
    private ProgressService progressService;
    
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
    public ProgressRecipe createRecipe(@RequestBody ProgressRecipe progressrecipe) {
        progressrecipe.setAuthor("anonymous");
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