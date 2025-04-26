package com.ourcooking.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {
    @Id
    private String id;
    private String name;
    private String description;
    private int estimatedtime;
    private int number_of_steps;
    private int currentstep;
    private String status;
}
