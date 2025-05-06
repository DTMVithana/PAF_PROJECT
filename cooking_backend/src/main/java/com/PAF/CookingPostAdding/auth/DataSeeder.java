package com.PAF.CookingPostAdding.auth;


import com.PAF.CookingPostAdding.auth.model.User;
import com.PAF.CookingPostAdding.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepo.findByUsername("demo").isEmpty()) {
            userRepo.save(User.builder()
                    .name("Demo User")
                    .username("demo")
                    .password(passwordEncoder.encode("demo123"))
                    .createdAt(LocalDateTime.now())
                    .build());
        }
    }
}
