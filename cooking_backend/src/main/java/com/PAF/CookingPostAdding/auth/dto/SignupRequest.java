package com.PAF.CookingPostAdding.auth.dto;

import lombok.*;
import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String username;

    @NotBlank @Size(min = 6)
    private String password;
}
