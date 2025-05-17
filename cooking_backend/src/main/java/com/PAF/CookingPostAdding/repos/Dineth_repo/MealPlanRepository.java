// src/main/java/com/PAF/CookingPostAdding/repos/Dineth_repo/MealPlanRepository.java
package com.PAF.CookingPostAdding.repos.Dineth_repo;

import com.PAF.CookingPostAdding.models.Dineth_model.MealPlan;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealPlanRepository extends MongoRepository<MealPlan, String> {
  // nothing else needed for basic create & read
}
