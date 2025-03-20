package com.example.cardify.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FacebookController {

    // No need to manually inject the Facebook OAuth URL
    @GetMapping("/api/users/auth/facebook")
    public String facebookLogin() {
        // Spring Security will handle the redirection automatically
        return "Redirecting to Facebook login (handled by Spring Security)";
    }
}
