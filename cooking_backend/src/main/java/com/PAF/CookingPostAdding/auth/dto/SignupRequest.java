package com.PAF.CookingPostAdding.auth.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String username;
    private String email;
    private String password;
    
}