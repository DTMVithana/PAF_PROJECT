package com.PAF.CookingPostAdding.auth.controller;

import com.PAF.CookingPostAdding.auth.dto.AuthResponse;
import com.PAF.CookingPostAdding.auth.dto.LoginRequest;
import com.PAF.CookingPostAdding.auth.dto.LoginResponse;
import com.PAF.CookingPostAdding.auth.dto.SignupRequest;
import com.PAF.CookingPostAdding.auth.model.User;
import com.PAF.CookingPostAdding.auth.repository.UserRepository;
import com.PAF.CookingPostAdding.auth.service.UserService;
import com.PAF.CookingPostAdding.auth.util.JwtUtils; 

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
// …
@RestController
@RequestMapping("/api/auth")
@CrossOrigin                   // allow requests from your React dev server
@RequiredArgsConstructor 
public class AuthController {

    
    @Autowired
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {

        return userRepo.findByUsername(req.getUsername())
                .filter(u -> passwordEncoder.matches(req.getPassword(), u.getPassword()))
                .<ResponseEntity<?>>map(u ->
                        ResponseEntity.ok(new LoginResponse("Login successful", u.getId())))
                .orElseGet(() ->
                        ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body("Invalid username or password"));
    }

   // ---------- REGISTER ----------
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody SignupRequest req) {

        if (userRepo.findByUsername(req.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Username already taken");
        }

        User user = User.builder()
                .name(req.getName())
                .username(req.getUsername())
                .password(passwordEncoder.encode(req.getPassword()))   // BCrypt!
                .profilePhotoUrl(req.getProfilePhotoUrl())
                .createdAt(LocalDateTime.now())
                .build();

        userRepo.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new LoginResponse("User created", user.getId()));
    }

    @GetMapping("/ping")  // works → proves controller is scanned
    public ResponseEntity<String> ping() { return ResponseEntity.ok("pong"); }
}