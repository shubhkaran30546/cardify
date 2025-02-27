package com.example.cardify.controller;

import com.example.cardify.Models.User;
import com.example.cardify.service.EmailService;
import com.example.cardify.service.JwtService;
import com.example.cardify.service.UserService;
import com.example.cardify.controller.LoginResponse;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import javax.crypto.SecretKey;
import javax.crypto.SecretKey;

import java.util.HashMap;
import java.util.Map;

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
            String subject = "Signup Success";
            Map<String, Object> templateModel = new HashMap<>();
            templateModel.put("subject", subject);
            templateModel.put("firstName", user.getFirstName());
            emailService.sendTemplatedEmailWithAttachment(user.getEmail(), subject,
                    templateModel, "welcome", null);
            return ResponseEntity.ok("User account created successfully!");
        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity.status(400).body("Data constraint issue: " + ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
        }
    }

    //    private final String SECRET_KEY = "0c4e8b74b085905eaef9871b375502e45fb75f3593bde7c48a9806f791a6c198"; // Use env variables in production
//    private final SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
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
//        if (authenticatedUser != null) {
//            // Generate JWT token
//            SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
//            String token = Jwts.builder()
//                    .setSubject(authenticatedUser.getEmail())
//                    .signWith(key)
//                    .compact();
//            return ResponseEntity.ok(new JwtResponse(token, user.getUserId(), authenticatedUser.getEmail()));
//        } else {
//            return ResponseEntity.status(401).body("Invalid email or password!");
//        }
    }



}
