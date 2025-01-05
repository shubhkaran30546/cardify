package com.example.cardify;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class HomeController {
    @GetMapping("/{path:[^\\.]*}") // Matches any path without a dot (e.g., /home, /signup)
    public String forward() {
        return "forward:/index.html";
    }
}


