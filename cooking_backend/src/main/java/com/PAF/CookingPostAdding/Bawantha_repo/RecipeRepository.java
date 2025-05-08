package com.PAF.CookingPostAdding.Bawantha_repo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.PAF.CookingPostAdding.models.Bawantha_model.Recipe;

import java.util.List;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String> {
    List<Recipe> findBySharedTrue();
}