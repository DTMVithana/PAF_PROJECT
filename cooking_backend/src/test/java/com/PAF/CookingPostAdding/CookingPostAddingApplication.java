package com.PAF.CookingPostAdding;

import org.junit.jupiter.api.Test;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.PAF.CookingPostAdding.repos.Bawantha_repo")
public class CookingPostAddingApplication {
    public static void main(String[] args) {
        SpringApplication.run(CookingPostAddingApplication.class, args);
    }
}