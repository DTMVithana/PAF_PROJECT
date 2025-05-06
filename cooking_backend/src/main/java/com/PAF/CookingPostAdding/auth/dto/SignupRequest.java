package com.PAF.CookingPostAdding.auth.dto;

import lombok.*;
import jakarta.validation.constraints.*;



import lombok.Data;

@Data
public class SignupRequest {
    private String name;
    private String username;
    private String password;
    private String profilePhotoUrl;   // optional
}