package com.PAF.CookingPostAdding.repos.Tharinda_repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.PAF.CookingPostAdding.models.Tharinda_model.ProgressRecipe;

import java.util.List;

@Repository
public interface ProgressRecipeRepository extends MongoRepository<ProgressRecipe, String> {
    // For Home Page
    List<ProgressRecipe> findByRecipeTypeAndSharedTrue(String recipeType);

    // For Ongoing Page
    List<ProgressRecipe> findByRecipeType(String recipeType);
    
    List<ProgressRecipe> findBySharedTrue();
    List<ProgressRecipe> findByStatusNot(String status);
    List<ProgressRecipe> findByStatus(String status);

}
