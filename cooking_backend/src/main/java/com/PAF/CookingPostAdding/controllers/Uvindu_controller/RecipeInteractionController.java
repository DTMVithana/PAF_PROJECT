package com.PAF.CookingPostAdding.controllers.Uvindu_controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.*;
import com.PAF.CookingPostAdding.models.Bawantha_model.Recipe;
import com.PAF.CookingPostAdding.services.Bawantha_service.RecipeService;
import com.PAF.CookingPostAdding.services.Uvindu_service.CommentService;
import com.PAF.CookingPostAdding.services.Uvindu_service.LikeService;
import com.PAF.CookingPostAdding.services.Uvindu_service.ShareService;

@RestController
@RequestMapping("/api/recipes")
public class RecipeInteractionController {

        @Autowired
    private ShareService shareService;

    @Autowired
    private CommentService commentService;

    @Autowired
    private LikeService likeService;

    @Autowired
    private RecipeService recipeService;

    // --- Share ---
    @PutMapping("/{id}/share")
    public Recipe sharePost(@PathVariable String id) {
        return shareService.shareRecipe(id);
    }

    // --- Comments ---
    @PutMapping("/{id}/comment")
    public Recipe addComment(@PathVariable String id, @RequestBody Map<String, String> body) {
        return commentService.addComment(id, body.get("comment"));
    }

    @PutMapping("/{id}/comment/{index}")
    public Recipe updateComment(@PathVariable String id, @PathVariable int index, @RequestBody Map<String, String> body) {
        return commentService.updateComment(id, index, body.get("comment"));
    }

    @DeleteMapping("/{id}/comment/{index}")
    public Recipe deleteComment(@PathVariable String id, @PathVariable int index) {
        return commentService.deleteComment(id, index);
    }

    // --- Likes ---
    @PutMapping("/{id}/like")
    public Recipe toggleLike(@PathVariable String id, @RequestBody String userId) {
        return likeService.toggleLike(id, userId);
    }

    @GetMapping("/{id}/likes")
    public int getLikes(@PathVariable String id) {
        Recipe recipe = recipeService.getRecipe(id);
        return recipe.getLikes().size();
    }

    @GetMapping("/{id}/like/{userId}")
    public boolean hasUserLiked(@PathVariable String id, @PathVariable String userId) {
        Recipe recipe = recipeService.getRecipe(id);
        return recipe.getLikes().contains(userId);
    }
}
