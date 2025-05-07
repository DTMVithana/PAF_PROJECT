// src/main/java/com/PAF/CookingPostAdding/models/Dineth_model/MealPlan.java
package com.PAF.CookingPostAdding.models.Dineth_model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mealplans")
public class MealPlan {
  
  @Id
  private String id;
  private String name;
  private String start_date;
  private String end_date;
  private String photo;

  public MealPlan() {}

  public MealPlan(String id, String name, String start_date,String end_date,  String photo) {
    this.id = id;
    this.name = name;
    this.start_date = start_date;
    this.end_date = end_date;
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

  public String getSDate() {
    return start_date;
  }

  public void setSDate(String start_date) {
    this.start_date = start_date;
  }
  public String getEDate() {
    return end_date;
  }

  public void setEDate(String end_date) {
    this.end_date = end_date;
  }

  public String getPhoto() {
    return photo;
  }

  public void setPhoto(String photo) {
    this.photo = photo;
  }
}
