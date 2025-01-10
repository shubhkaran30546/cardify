package com.example.cardify.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController  // Use RestController instead of Controller for API responses
public class HomeController {

    @GetMapping("/hello")
    public String home() {
        return "Hello from Spring Boot!";
    }
}
