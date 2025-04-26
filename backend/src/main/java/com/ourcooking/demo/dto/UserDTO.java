package com.ourcooking.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserDTO {
    private String id;
    private String name;
    private String description;
    private int estimatedtime;
    private int number_of_steps;
    private int currentstep;
    private String status;
}
