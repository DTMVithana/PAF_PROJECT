package com.PAF.CookingPostAdding.auth.controllers;

import com.PAF.CookingPostAdding.auth.models.User;
import com.PAF.CookingPostAdding.auth.services.UserService;
import com.PAF.CookingPostAdding.auth.utils.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
        try {
            userService.register(user);
            return ResponseEntity.ok(Map.of("message", "User registered successfully"));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", ex.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        try {
            User existingUser = userService.getByUsername(user.getUsername());

            if (!user.getPassword().equals(existingUser.getPassword())) {
                throw new RuntimeException("Invalid credentials");
            }

            String token = jwtUtil.generateToken(existingUser.getUsername());
            return ResponseEntity.ok(Map.of("token", token));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", ex.getMessage()));
        }
    }
}
