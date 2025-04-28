package com.PAF.CookingPostAdding.repos.Uvindu_repo;
import org.springframework.stereotype.Repository;
import com.PAF.CookingPostAdding.models.Uvindu_model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
    List<Question> findByRecipeId(String recipeId);
}
