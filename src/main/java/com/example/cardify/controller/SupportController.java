package com.example.cardify.controller;

import com.example.cardify.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/support")
public class SupportController {
    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<String> sendSupportMessage(@RequestBody Map<String, String> request) {
        try {
            String firstName = request.get("firstName");
            String lastName = request.get("lastName");
            String email = request.get("email");
            String message = request.get("message");

            emailService.sendSupportEmail(firstName, lastName, email, message);
            return ResponseEntity.ok("Support message sent successfully!");
        } catch (MessagingException e) {
            return ResponseEntity.status(500).body("Failed to send message.");
        }
    }
}
