package com.PAF.CookingPostAdding.controllers.Uvindu_controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.PAF.CookingPostAdding.models.Uvindu_model.Question;
import com.PAF.CookingPostAdding.services.Uvindu_service.QuestionService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;import java.util.Optional;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
public class QuestionController {
    
    @Autowired
    private QuestionService questionService;

    @PostMapping("/ask")
    public Question askQuestion(@RequestBody Question question) {
        return questionService.addQuestion(question);
    }

    @GetMapping("/recipe/{recipeId}")
    public List<Question> getQuestionsForRecipe(@PathVariable String recipeId) {
        return questionService.getQuestionsByRecipe(recipeId);
    }

    @GetMapping("/{id}")
    public Optional<Question> getQuestionById(@PathVariable String id) {
        return questionService.getQuestionById(id);
    }

    @PostMapping("/answer/{id}")
    public Question answerQuestion(@PathVariable String id, @RequestBody String answerText) {
        return questionService.answerQuestion(id, answerText);
    }

    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable String id) {
        questionService.deleteQuestion(id);
    }
}
