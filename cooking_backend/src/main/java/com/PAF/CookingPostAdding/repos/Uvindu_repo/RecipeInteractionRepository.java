package com.PAF.CookingPostAdding.repos.Uvindu_repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.PAF.CookingPostAdding.models.Uvindu_model.RecipeInteraction;
import java.util.Optional;


public interface RecipeInteractionRepository extends MongoRepository<RecipeInteraction, String> {
    Optional<RecipeInteraction> findByRecipeId(String recipeId);
}
