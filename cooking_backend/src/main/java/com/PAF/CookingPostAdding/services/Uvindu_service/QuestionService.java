package com.PAF.CookingPostAdding.services.Uvindu_service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.PAF.CookingPostAdding.models.Uvindu_model.Question;
import com.PAF.CookingPostAdding.repos.Uvindu_repo.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    
    @Autowired
    private QuestionRepository questionRepository;

    public List<Question> getQuestionsByRecipeId(String recipeId) {
        return questionRepository.findByRecipeId(recipeId);
    }

    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    public Optional<Question> updateQuestion(String id, String content) {
        Optional<Question> existing = questionRepository.findById(id);
        existing.ifPresent(q -> {
            q.setContent(content);
            questionRepository.save(q);
        });
        return existing;
    }

    public void deleteQuestion(String id) {
        questionRepository.deleteById(id);
    }
}
