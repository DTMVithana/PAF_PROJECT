package com.PAF.CookingPostAdding.repos.Uvindu_repo;

import com.PAF.CookingPostAdding.models.Uvindu_model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuestionRepository extends MongoRepository<Question, String> {
    List<Question> findByRecipeId(String recipeId);
}
