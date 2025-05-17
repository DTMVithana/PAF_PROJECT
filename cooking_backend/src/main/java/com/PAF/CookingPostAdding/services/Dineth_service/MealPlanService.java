package com.PAF.CookingPostAdding.services.Dineth_service;

import com.PAF.CookingPostAdding.models.Dineth_model.MealPlan;
import com.PAF.CookingPostAdding.repos.Dineth_repo.MealPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MealPlanService {

  @Autowired
  private MealPlanRepository repo;

  public List<MealPlan> getAll() {
    return repo.findAll();
  }

  public Optional<MealPlan> getById(String id) {
    return repo.findById(id);
  }

  public MealPlan create(MealPlan mealPlan) {
    return repo.save(mealPlan);
  }

  public MealPlan update(String id, MealPlan updated) {
    updated.setId(id);
    return repo.save(updated);
  }

  public void delete(String id) {
    repo.deleteById(id);
  }
}
