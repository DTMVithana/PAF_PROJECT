package com.PAF.CookingPostAdding.controllers.Tharinda_controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.PAF.CookingPostAdding.models.Tharinda_model.ProgressRecipe;
import com.PAF.CookingPostAdding.services.Tharinda_service.ProgressService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ongoing")
public class ProgressController {

    @Autowired
    private ProgressService ProgressService;

    @GetMapping
    public List<ProgressRecipe> getAllRecipes() {
        return ProgressService.getAllRecipes();
    }

    @GetMapping("/shared")
    public List<ProgressRecipe> getSharedRecipes() {
        return ProgressService.getSharedRecipes();
    }

    @GetMapping("/{id}")
    public ProgressRecipe getRecipe(@PathVariable String id) {
        return ProgressService.getRecipe(id);
    }

    @PostMapping
    public ProgressRecipe createRecipe(@RequestBody ProgressRecipe Progressrecipe) {
        Progressrecipe.setAuthor("anonymous");
        return ProgressService.createRecipe(Progressrecipe, Progressrecipe.getAuthor());
    }

    @PutMapping("/{id}")
    public ProgressRecipe updateRecipe(@PathVariable String id, @RequestBody ProgressRecipe Progressrecipe) {
        return ProgressService.updateRecipe(id, Progressrecipe, null);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable String id) {
        ProgressService.deleteRecipe(id, "anonymous");
    }

    // Share post
    @PutMapping("/{id}/share")
    public ProgressRecipe sharePost(@PathVariable String id) {
        return ProgressService.sharePost(id);
    }

    
    }

