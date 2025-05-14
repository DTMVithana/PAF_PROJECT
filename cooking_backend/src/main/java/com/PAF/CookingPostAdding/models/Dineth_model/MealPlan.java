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
    private Nutrition nutrition;  // ✅ Added nutrition details

    public MealPlan() {}

    public MealPlan(String id, String name, String plan_type, String gole_category,
                    String start_date, String end_date, String discription,
                    String target_calories, String photo, Nutrition nutrition) {
        this.id = id;
        this.name = name;
        this.plan_type = plan_type;
        this.gole_category = gole_category;
        this.start_date = start_date;
        this.end_date = end_date;
        this.discription = discription;
        this.target_calories = target_calories;
        this.photo = photo;
        this.nutrition = nutrition;
    }

    // Getters and Setters

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

    public Nutrition getNutrition() {
        return nutrition;
    }

    public void setNutrition(Nutrition nutrition) {
        this.nutrition = nutrition;
    }

    // ✅ Inner class for Nutrition
    public static class Nutrition {
        private String protein;
        private String carbs;
        private String fats;
        private String fiber;
        private String notes;

        public String getProtein() {
            return protein;
        }

        public void setProtein(String protein) {
            this.protein = protein;
        }

        public String getCarbs() {
            return carbs;
        }

        public void setCarbs(String carbs) {
            this.carbs = carbs;
        }

        public String getFats() {
            return fats;
        }

        public void setFats(String fats) {
            this.fats = fats;
        }

        public String getFiber() {
            return fiber;
        }

        public void setFiber(String fiber) {
            this.fiber = fiber;
        }

        public String getNotes() {
            return notes;
        }

        public void setNotes(String notes) {
            this.notes = notes;
        }
    }
}
