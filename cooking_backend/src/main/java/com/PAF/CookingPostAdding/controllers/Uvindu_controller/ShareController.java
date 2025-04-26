package com.PAF.CookingPostAdding.controllers.Uvindu_controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

import com.PAF.CookingPostAdding.models.Bawantha_model.Recipe;
import com.PAF.CookingPostAdding.services.Uvindu_service.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/share")

public class ShareController {
 
    @Autowired
    private ShareService shareService;

    // Share a recipe (toggle share status)
    @PutMapping("/{recipeId}")
    public Recipe shareRecipe(@PathVariable String recipeId) {
        return shareService.shareRecipe(recipeId);
    }
}
