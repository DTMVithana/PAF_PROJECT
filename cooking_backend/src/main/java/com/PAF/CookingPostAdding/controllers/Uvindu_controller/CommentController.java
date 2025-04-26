package com.PAF.CookingPostAdding.controllers.Uvindu_controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.PAF.CookingPostAdding.services.Uvindu_service.CommentService;
import com.PAF.CookingPostAdding.models.Bawantha_model.Recipe;
import java.util.Map;
@RestController
@RequestMapping("/api/comments")

public class CommentController {
        @Autowired
    private CommentService commentService;

    // Add a comment to a recipe
    @PutMapping("/{recipeId}/add")
    public Recipe addComment(@PathVariable String recipeId, @RequestBody Map<String, String> body) {
        String comment = body.get("comment");
        return commentService.addComment(recipeId, comment);
    }

    // Update a comment
    @PutMapping("/{recipeId}/update/{index}")
    public Recipe updateComment(@PathVariable String recipeId, @PathVariable int index, @RequestBody Map<String, String> body) {
        String newComment = body.get("comment");
        return commentService.updateComment(recipeId, index, newComment);
    }

    // Delete a comment
    @DeleteMapping("/{recipeId}/delete/{index}")
    public Recipe deleteComment(@PathVariable String recipeId, @PathVariable int index) {
        return commentService.deleteComment(recipeId, index);
    }
}
