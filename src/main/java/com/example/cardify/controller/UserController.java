package com.example.cardify.controller;

import com.example.cardify.Models.User;
import com.example.cardify.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        try {
            if (userService.isEmailRegistered(user.getEmail())) {
                return ResponseEntity.badRequest().body("Email already in use!");
            }
            userService.registerUser(
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPhoneNumber(),
                    user.getPassword()
            );
            return ResponseEntity.ok("User account created successfully!");
        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity.status(400).body("Data constraint issue: " + ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        try {
            User authenticatedUser = userService.LoginUser(user.getEmail(), user.getPassword());
            if (authenticatedUser != null) {
                return ResponseEntity.ok("Login successful!");
            } else {
                return ResponseEntity.status(401).body("Invalid email or password!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }



}
