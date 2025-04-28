package com.PAF.CookingPostAdding.services.Uvindu_service;

import java.util.List;
import com.PAF.CookingPostAdding.models.Uvindu_model.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.PAF.CookingPostAdding.repos.Uvindu_repo.QuestionRepository;
import java.util.Optional;

@Service
public class QuestionService {
     @Autowired
    private QuestionRepository questionRepository;

    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    public List<Question> getQuestionsByRecipe(String recipeId) {
        return questionRepository.findByRecipeId(recipeId);
    }

    public Optional<Question> getQuestionById(String id) {
        return questionRepository.findById(id);
    }

    public Question answerQuestion(String id, String answerText) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        if (optionalQuestion.isPresent()) {
            Question question = optionalQuestion.get();
            question.setAnswerText(answerText);
            question.setAnsweredAt(java.time.LocalDateTime.now());
            return questionRepository.save(question);
        }
        return null;
    }

    public void deleteQuestion(String id) {
        questionRepository.deleteById(id);
    }
}
