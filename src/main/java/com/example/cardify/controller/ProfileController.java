package com.example.cardify.controller;

import com.example.cardify.DTO.UserDTO;
import com.example.cardify.Models.User;
import com.example.cardify.repository.UserRepository;
import com.example.cardify.service.JwtService;
import com.example.cardify.service.UserDetailsServiceImpl;
import com.example.cardify.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final UserService userService;
    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;
    public UserRepository userRepository;

    public ProfileController(UserService userService, JwtService jwtService, UserDetailsServiceImpl userDetailsService, UserRepository userRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<Map<String, String>> getUserName(
            @RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }

        try {
            // Extract the email from the token
            String userEmail = extractEmailFromToken(token);
            if (userEmail == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
            if (jwtService.isTokenValid(token.substring(7), userDetailsService.loadUserByUsername(userEmail))) {
                Map<String, String> response = new HashMap<>();
                String userName = userDetailsService.loadUserByUsername(userEmail).getUsername();
                response.put("userName", userName);
                
                return ResponseEntity.ok(response);  // ✅ Return JSON object
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/info/{username}")
    public ResponseEntity<UserDTO> getProfileInfo(@PathVariable String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new UserDTO(user));
    }

    private String extractEmailFromToken(String token) {
        token = token.replace("Bearer ", "").trim();
        return jwtService.extractUsername(token);
    }
}
