package com.PAF.CookingPostAdding.auth.controller;

import com.PAF.CookingPostAdding.auth.dto.SignupRequest;
import com.PAF.CookingPostAdding.auth.dto.LoginRequest;
import com.PAF.CookingPostAdding.auth.model.User;
import com.PAF.CookingPostAdding.auth.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepo;
    private final BCryptPasswordEncoder encoder;

    public AuthController(UserRepository userRepo,
                          BCryptPasswordEncoder encoder) {
        this.userRepo = userRepo;
        this.encoder = encoder;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest req) {
        // only check username
        if (userRepo.findByUsername(req.getUsername()).isPresent()) {
            return ResponseEntity
                   .badRequest()
                   .body(Map.of("message", "Username already taken"));
        }

        User u = new User();
        u.setUsername(req.getUsername());
        u.setEmail(req.getEmail());    // still capture email, but no lookup
        u.setPassword(encoder.encode(req.getPassword()));
        userRepo.save(u);

        return ResponseEntity
               .status(201)
               .body(Map.of("message", "Signup successful"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        Optional<User> opt = userRepo.findByUsername(req.getUsername());
        if (opt.isEmpty() ||
            !encoder.matches(req.getPassword(), opt.get().getPassword())) {
            return ResponseEntity
                   .badRequest()
                   .body(Map.of("message", "Invalid username or password"));
        }

        User u = opt.get();
        Map<String, Object> userMap = Map.of(
            "id", u.getId(),
            "username", u.getUsername(),
            "email", u.getEmail()
        );
        return ResponseEntity.ok(Map.of(
            "message", "Login successful",
            "user", userMap
            
        ));
    }
}