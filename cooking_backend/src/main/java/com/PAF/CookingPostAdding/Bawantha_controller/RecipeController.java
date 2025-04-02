package com.PAF.CookingPostAdding.Bawantha_controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.PAF.CookingPostAdding.Bawantha_model.Recipe;
import com.PAF.CookingPostAdding.Bawantha_service.RecipeService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")
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
    public Recipe getRecipe(@PathVariable Long id) {
        return recipeService.getRecipe(id);
    }

    @PostMapping
    public Recipe createRecipe(@RequestBody Recipe recipe) {
        recipe.setAuthor("anonymous"); // hardcoded for now
        return recipeService.createRecipe(recipe, recipe.getAuthor());
    }

    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable Long id, @RequestBody Recipe recipe) {
        return recipeService.updateRecipe(id, recipe, null);
    }

    @DeleteMapping("/{id}")
    public void deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id, "anonymous");
    }

    // ✅ Fixed: Use service layer to share post
    @PutMapping("/{id}/share")
    public Recipe sharePost(@PathVariable Long id) {
        return recipeService.sharePost(id);
    }

//     @PutMapping("/{id}/comment")
// public Recipe addComment(@PathVariable Long id, @RequestBody String comment) {
//     return recipeService.addComment(id, comment);
// }
@PutMapping("/{id}/comment")
public Recipe addComment(@PathVariable Long id, @RequestBody Map<String, String> body) {
    String comment = body.get("comment"); // ✅ extract plain text
    return recipeService.addComment(id, comment);
}

@PutMapping("/{id}/comment/{index}")
public Recipe updateComment(@PathVariable Long id, @PathVariable int index, @RequestBody Map<String, String> body) {
    return recipeService.updateComment(id, index, body.get("comment"));
}

@DeleteMapping("/{id}/comment/{index}")
public Recipe deleteComment(@PathVariable Long id, @PathVariable int index) {
    return recipeService.deleteComment(id, index);
}







}
