package com.example.cardify.controller;

import com.example.cardify.Models.User;
import com.example.cardify.repository.UserRepository;
import com.example.cardify.service.EmailService;
import com.example.cardify.service.JwtService;
import com.example.cardify.service.PasswordResetService;
import com.example.cardify.service.UserService;
import com.example.cardify.controller.LoginResponse;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import javax.crypto.SecretKey;
import javax.crypto.SecretKey;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static org.springframework.web.servlet.function.ServerResponse.status;
@ComponentScan
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    private final JwtService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordResetService passwordResetService;

    public UserController(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

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
            emailService.sendWelcomeEmail(user.getEmail(), user.getFirstName());
            return ResponseEntity.ok("User account created successfully!");
        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity.status(400).body("Data constraint issue: " + ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginUser(@RequestBody User user) {

        System.out.println("Login attempt for email: " + user.getEmail());

        User authenticatedUser = userService.LoginUser(user.getEmail(), user.getPassword());
        if (authenticatedUser == null) {
            // If user is not authenticated, return 401 Unauthorized
            System.out.println("Invalid credentials for email: " + user.getEmail());
            return ResponseEntity.status(401).body(null);
        }

        String token = jwtService.generateToken(authenticatedUser);
        System.out.println("JWT Token generated for email: " + user.getEmail() + " Token: " + token);
        LoginResponse loginResponse = new LoginResponse().setToken(token).setExpiresIn(jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) throws MessagingException {
        String email = request.get("email");
        passwordResetService.sendPasswordResetEmail(email);
        return ResponseEntity.ok("Password reset email sent.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");
        passwordResetService.resetPassword(token, newPassword);
        return ResponseEntity.ok("Password reset successful.");
    }



}
