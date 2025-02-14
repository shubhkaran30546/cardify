package com.example.cardify.controller;

import com.example.cardify.service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Allow frontend access
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public String sendContactEmail(@RequestBody Map<String, String> formData) {
        String recipientEmail = formData.get("recipientEmail"); // Portfolio owner's email
        if (recipientEmail == null || recipientEmail.isEmpty()) {
            return "Error: Portfolio owner email not provided.";
        }

        String subject = "New Contact Form Submission: " + formData.get("title");
        String message = "<h3>Contact Details</h3>" +
                "<p><b>Name:</b> " + formData.get("firstName") + " " + formData.get("lastName") + "</p>" +
                "<p><b>Email:</b> " + formData.get("email") + "</p>" +
                "<p><b>Phone:</b> " + formData.get("phone") + "</p>" +
                "<p><b>Company:</b> " + formData.get("company") + "</p>" +
                "<p><b>Message:</b> " + formData.get("notes") + "</p>";

        try {
            emailService.sendEmail(recipientEmail, subject, message);
            return "Email Sent Successfully!";
        } catch (MessagingException e) {
            return "Error sending email: " + e.getMessage();
        }
    }

}
