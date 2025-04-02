package com.PAF.CookingPostAdding.Bawantha_repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.PAF.CookingPostAdding.Bawantha_model.Recipe;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findBySharedTrue();
}

