package com.PAF.CookingPostAdding.services.Uvindu_service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import com.PAF.CookingPostAdding.models.Uvindu_model.Question;
import com.PAF.CookingPostAdding.repos.Uvindu_repo.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuestionService {
    

    @Autowired
    private QuestionRepository questionRepository;

    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    public List<Question> getQuestionsByRecipeId(String recipeId) {
        return questionRepository.findByRecipeId(recipeId);
    }

    public Optional<Question> updateQuestion(String id, String content) {
        Optional<Question> q = questionRepository.findById(id);
        q.ifPresent(existing -> {
            existing.setContent(content);
            questionRepository.save(existing);
        });
        return q;
    }

    public void deleteQuestion(String id) {
        questionRepository.deleteById(id);
    }
}
