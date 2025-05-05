package com.PAF.CookingPostAdding.controllers.Uvindu_controller;

import com.PAF.CookingPostAdding.models.Uvindu_model.Question;
import com.PAF.CookingPostAdding.services.Uvindu_service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
public class QuestionController {
    
    @Autowired
    private QuestionService questionService;

    @GetMapping("/{recipeId}")
    public List<Question> getQuestions(@PathVariable String recipeId) {
        return questionService.getQuestionsByRecipeId(recipeId);
    }

    @PostMapping
    public Question addQuestion(@RequestBody Question question) {
        question.setTimestamp(LocalDateTime.now());
        return questionService.addQuestion(question);
    }

    @PutMapping("/{id}")
    public Optional<Question> updateQuestion(@PathVariable String id, @RequestBody Map<String, String> body) {
        return questionService.updateQuestion(id, body.get("content"));
    }

    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable String id) {
        questionService.deleteQuestion(id);
    }
}
