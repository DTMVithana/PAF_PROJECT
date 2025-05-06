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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
// …
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired private AuthenticationManager authManager;  // NEW
    @Autowired private JwtUtils jwtUtils;
    @Autowired private UserService userService;
    @Autowired private UserRepository userRepository; 
    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest req) {
        Logger log = LoggerFactory.getLogger(AuthController.class);
        log.info("▶ OK – /login called for {}", req.getUsername());
        // ── 1.  Look up the user or immediately return 401  ───────────────
        User user = userRepository.findByUsername(req.getUsername())
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Invalid credentials"));
                    log.info("▶ OK – user found");
        // ── 2.  Compare plain‑text password  ──────────────────────────────
        if (!user.getPassword().equals(req.getPassword())) {
            log.warn("⚠ FAIL – password mismatch");
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
        log.info("▶ OK – password matched");


        // ── 3.  Build and return the JWT  ─────────────────────────────────
        String token = jwtUtils.generateToken(user.getUsername());
        log.info("▶ OK – JWT generated");
        return new LoginResponse(token);
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
