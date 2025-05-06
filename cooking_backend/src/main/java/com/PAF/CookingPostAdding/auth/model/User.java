package com.PAF.CookingPostAdding.auth.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String username;
    private String password;         // stored as BCrypt hash
    private String profilePhotoUrl;
    private LocalDateTime createdAt;
}
