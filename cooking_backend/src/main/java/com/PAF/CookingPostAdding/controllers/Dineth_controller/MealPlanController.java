// src/main/java/com/PAF/CookingPostAdding/controllers/Dineth_controller/MealPlanController.java
package com.PAF.CookingPostAdding.controllers.Dineth_controller;

import com.PAF.CookingPostAdding.models.Dineth_model.MealPlan;
import com.PAF.CookingPostAdding.services.Dineth_service.MealPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mealplans")
@CrossOrigin(origins = "http://localhost:3000")  // allow calls from your React dev server
public class MealPlanController {

    @Autowired
    private MealPlanService service;

    @GetMapping
    public List<MealPlan> list() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MealPlan> get(@PathVariable String id) {
        return service.getById(id)
                      .map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MealPlan create(@RequestBody MealPlan mealPlan) {
        return service.create(mealPlan);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MealPlan> update(
            @PathVariable String id,
            @RequestBody MealPlan mealPlan
    ) {
        return service.getById(id)
                      .map(existing -> ResponseEntity.ok(service.update(id, mealPlan)))
                      .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
