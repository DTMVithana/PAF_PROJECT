package com.PAF.CookingPostAdding.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.PAF.CookingPostAdding.auth.dto.SignupRequest;
import com.PAF.CookingPostAdding.auth.model.User;
import com.PAF.CookingPostAdding.auth.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDateTime;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public void register(SignupRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Username already in use");
        }
        User u = User.builder()
    .name(req.getName())
    .username(req.getUsername())
    .password(req.getPassword())          // ← store as‑is
    .profilePhotoUrl(req.getProfilePhotoUrl())
    .createdAt(LocalDateTime.now())
    .build();

        userRepository.save(u);

        LoggerFactory.getLogger(UserService.class)
        .info("▶ OK – user {} registered", req.getUsername());
    }
}