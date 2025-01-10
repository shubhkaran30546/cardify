package com.example.cardify.controller;

import com.example.cardify.Models.User;
import com.example.cardify.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
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
    }

}
