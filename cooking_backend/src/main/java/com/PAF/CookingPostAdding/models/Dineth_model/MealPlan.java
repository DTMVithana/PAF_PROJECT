package com.PAF.CookingPostAdding.models.Dineth_model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "mealplans")
public class MealPlan {

    @Id
    private String id;

    private String name;
    private String plan_type;
    private String gole_category;
    private String start_date;
    private String end_date;
    private String discription;
    private String target_calories;
    private String photo;

    public MealPlan() {}

    public MealPlan(String id, String name, String plan_type, String gole_category,
                    String start_date, String end_date, String discription,
                    String target_calories, String photo) {
        this.id = id;
        this.name = name;
        this.plan_type = plan_type;
        this.gole_category = gole_category;
        this.start_date = start_date;
        this.end_date = end_date;
        this.discription = discription;
        this.target_calories = target_calories;
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

    public String getPlan_type() {
        return plan_type;
    }

    public void setPlan_type(String plan_type) {
        this.plan_type = plan_type;
    }

    public String getGole_category() {
        return gole_category;
    }

    public void setGole_category(String gole_category) {
        this.gole_category = gole_category;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public String getDiscription() {
        return discription;
    }

    public void setDiscription(String discription) {
        this.discription = discription;
    }

    public String getTarget_calories() {
        return target_calories;
    }

    public void setTarget_calories(String target_calories) {
        this.target_calories = target_calories;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}
