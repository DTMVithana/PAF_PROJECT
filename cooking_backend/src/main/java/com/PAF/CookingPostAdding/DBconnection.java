package com.PAF.CookingPostAdding;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.mongodb.core.MongoTemplate;

public class DBconnection {
    
        @Autowired
    private MongoTemplate mongoTemplate;

    @EventListener(ApplicationReadyEvent.class)
    public void checkMongoConnection() {
        try {
            mongoTemplate.getDb().listCollectionNames().first(); 
            System.out.println("MongoDB connected successfully");
        } catch (Exception e) {
            System.out.println("Failed to connect to MongoDB: " + e.getMessage());
        }
    }
}
