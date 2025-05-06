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

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
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

// …
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthenticationManager authManager;  // NEW
    @Autowired private JwtUtils jwtUtils;
    @Autowired private UserService userService;
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest req) {

        try {
            // 1. Ask Spring to authenticate the credentials
            Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getUsername(), req.getPassword()));

            // 2. If we get here, credentials are valid – build the token
            String token = jwtUtils.generateToken(
                    ((UserDetails) auth.getPrincipal()).getUsername());

            return ResponseEntity.ok(new LoginResponse(token));

        } catch (org.springframework.security.core.AuthenticationException ex) {
            // wrong username / password → 401, not 500
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Invalid credentials", ex);
        } catch (IllegalArgumentException ex) {
            // jwt.secret missing / empty
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "JWT secret key not configured", ex);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(
            @Valid @RequestBody SignupRequest req) {

        userService.register(req);
        return ResponseEntity.ok(new AuthResponse("Registration successful"));
    }
    @GetMapping("/ping")  // works → proves controller is scanned
    public ResponseEntity<String> ping() { return ResponseEntity.ok("pong"); }
}
