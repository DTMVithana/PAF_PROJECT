package com.PAF.CookingPostAdding.controllers.Uvindu_controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.PAF.CookingPostAdding.models.Bawantha_model.Recipe;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/like")

public class LikeController {
    
    @Autowired
    private LikeService likeService;

    // Toggle like status by user
    @PutMapping("/{recipeId}")
    public Recipe toggleLike(@PathVariable String recipeId, @RequestBody String userId) {
        return likeService.toggleLike(recipeId, userId);
    }
}
