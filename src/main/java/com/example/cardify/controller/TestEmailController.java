package com.example.cardify.controller;

import com.example.cardify.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class TestEmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/test-email")
    public String sendTestEmail(@RequestParam String email, @RequestParam String name) {
        try {
            emailService.sendWelcomeEmail(email, name);
            return "Test email sent successfully!";
        } catch (MessagingException | IOException e) {
            return "Error sending email: " + e.getMessage();
        }
    }
}
