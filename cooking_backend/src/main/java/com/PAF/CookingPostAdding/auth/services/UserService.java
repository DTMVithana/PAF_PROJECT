package com.PAF.CookingPostAdding.auth.services;

import com.PAF.CookingPostAdding.auth.models.User;
import com.PAF.CookingPostAdding.auth.repos.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User register(User user) {
        if (user.getUsername() == null || user.getUsername().isBlank() ||
            user.getPassword() == null || user.getPassword().isBlank()) {
            throw new RuntimeException("Username and password must not be empty");
        }

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // No password encoding here
        return userRepository.save(user);
    }

    public User getByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
