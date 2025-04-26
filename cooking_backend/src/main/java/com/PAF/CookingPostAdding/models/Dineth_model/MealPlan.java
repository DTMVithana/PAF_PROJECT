// src/main/java/com/PAF/CookingPostAdding/models/Dineth_model/MealPlan.java
package com.PAF.CookingPostAdding.models.Dineth_model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mealplans")
public class MealPlan {
  
  @Id
  private String id;
  private String name;
  private String date;
  private String photo;

  public MealPlan() {}

  public MealPlan(String id, String name, String date, String photo) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.photo = photo;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getPhoto() {
    return photo;
  }

  public void setPhoto(String photo) {
    this.photo = photo;
  }
}
