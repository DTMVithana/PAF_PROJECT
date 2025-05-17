package com.PAF.CookingPostAdding.auth.dto;

import lombok.Data;

@Data
public class LoginRequest {
    // Change from emailOrUsername to just username
    private String username;
    private String password;
}