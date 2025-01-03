package com.example.cardify;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
public class HomeController {

    @GetMapping("/api/users")
    public List<User> getUsers() {
        return Arrays.asList(
                new User("John Doe"),
                new User("Jane Smith"),
                new User("Alice Johnson")
        );
    }
}


