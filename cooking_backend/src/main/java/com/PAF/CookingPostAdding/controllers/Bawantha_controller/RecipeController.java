package com.PAF.CookingPostAdding.controllers.Bawantha_controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import com.PAF.CookingPostAdding.models.Bawantha_model.Recipe;
import com.PAF.CookingPostAdding.services.Bawantha_service.RecipeService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")
// Allow requests from your React dev server:
@CrossOrigin(origins = "http://localhost:3000", 
             methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS },
             allowCredentials = "true")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/shared")
    public List<Recipe> getSharedRecipes() {
        return recipeService.getSharedRecipes();
    }

    @GetMapping("/{id}")
    public Recipe getRecipe(@PathVariable String id) {
        return recipeService.getRecipe(id);
    }

    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        recipe.setAuthor("anonymous");
        return recipeService.createRecipe(recipe, recipe.getAuthor());
    }

    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable String id, @RequestBody Recipe recipe) {
        return recipeService.updateRecipe(id, recipe, null);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable String id) {
        recipeService.deleteRecipe(id, "anonymous");
    }

    // Share post
    @PutMapping("/{id}/share")
    public Recipe sharePost(@PathVariable String id) {
        return recipeService.sharePost(id);
    }

    @PutMapping("/{id}/comment")
    public Recipe addComment(@PathVariable String id, @RequestBody Map<String, String> body) {
        String comment = body.get("comment"); 
        return recipeService.addComment(id, comment);
    }

    @PutMapping("/{id}/comment/{index}")
    public Recipe updateComment(@PathVariable String id, @PathVariable int index, @RequestBody Map<String, String> body) {
        return recipeService.updateComment(id, index, body.get("comment"));
    }

    @DeleteMapping("/{id}/comment/{index}")
    public Recipe deleteComment(@PathVariable String id, @PathVariable int index) {
        return recipeService.deleteComment(id, index);
    }
}
