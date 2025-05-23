package com.example.cardify.controller;

import com.example.cardify.Models.Lead;
import com.example.cardify.Models.Portfolio;
import com.example.cardify.Models.User;
import com.example.cardify.repository.UserRepository;
import com.example.cardify.service.EmailService;
import com.example.cardify.service.LeadService;
import com.example.cardify.service.PortfolioService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "https://cardify-ecard.herokuapp.com", allowCredentials = "true") // Allow frontend access
public class ContactController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private LeadService leadService;

    @Autowired
    private PortfolioService portfolioService;  // Service to handle portfolio logic
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/send")
    public String sendContactEmail(@RequestBody Map<String, String> formData) {
        String recipientEmail = formData.get("recipientEmail"); // Portfolio owner's email
        if (recipientEmail == null || recipientEmail.isEmpty()) {
            return "Error: Portfolio owner email not provided.";
        }

        // Form data for lead
        String title = formData.get("title");  // Added title here
        String firstName = formData.get("firstName");
        String lastName = formData.get("lastName");
        String email = formData.get("email");
        String phone = formData.get("phone");
        String company = formData.get("company");
        String notes = formData.get("notes");
        User user = userRepository.findByEmail(recipientEmail);

//        emailService.sendContactFormEmail(recipientEmail, formData);
        try {
            emailService.sendContactFormEmail(recipientEmail, formData);
        } catch (MessagingException | IOException e) {
            return "Error sending email: " + e.getMessage();
        }

        // Saving lead
        Portfolio portfolio = portfolioService.getPortfolioByIdAndName(user.getUsername());
        if (portfolio == null) {
            return "Error: Portfolio not found for the given email.";
        }

        Lead lead = new Lead();
        lead.setTitle(title);
        lead.setFirstName(firstName);
        lead.setLastName(lastName);
        lead.setEmail(email);
        lead.setPhone(phone);
        lead.setCompany(company);
        lead.setNotes(notes);
        lead.setPortfolio(portfolio);
        leadService.saveLead(lead);
        return "Email Sent Successfully and Lead Saved!";
    }

    @GetMapping("/leads/{userName}")
    public ResponseEntity<List<Lead>> getLeadsByPortfolio(@PathVariable String userName) {
        User user = userRepository.findByUsername(userName);
        List<Lead> leads = leadService.getLeadsByPortfolioId(user.getUserId());
        return ResponseEntity.ok(leads);
    }

    @PostMapping(value = "/broadcast", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> broadcastTemplatedEmail(
            @RequestParam("portfolioEmail") String portfolioEmail,
            @RequestParam("subject") String subject,
            @RequestParam("message") String message,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        // Validate required fields
        if (portfolioEmail == null || portfolioEmail.isEmpty() ||
                subject == null || subject.isEmpty() ||
                message == null || message.isEmpty()) {
            return ResponseEntity.badRequest().body("Missing required fields: portfolioEmail, subject, or message.");
        }
        User user = userRepository.findByEmail(portfolioEmail);

        // Retrieve the portfolio by email
        Portfolio portfolio = portfolioService.getPortfolioByIdAndName(user.getUsername());
        if (portfolio == null) {
            return ResponseEntity.badRequest().body("Portfolio not found for the given email.");
        }

        // Retrieve all leads associated with this portfolio
        List<Lead> leads = leadService.getLeadsByPortfolioId(user.getUserId());
        int sentCount = 0;

        // Prepare common template model values (you can add more variables as needed)
        Map<String, Object> templateModel = new HashMap<>();
        templateModel.put("subject", subject);
        templateModel.put("message", message);

        // Send the email (with the Thymeleaf template) to each lead individually
        for (Lead lead : leads) {
            // Add dynamic values for each lead (e.g., firstName)
            templateModel.put("firstName", lead.getFirstName());

            try {
                emailService.sendTemplatedEmailWithAttachment(lead.getEmail(), subject,
                        templateModel, "emailTemplate", image);
                sentCount++;
            } catch (MessagingException e) {
                System.err.println("Error sending email to " + lead.getEmail() + ": " + e.getMessage());
            }
        }

        String responseMessage = "Broadcast email sent to " + sentCount + " out of " + leads.size() + " leads.";
        return ResponseEntity.ok(responseMessage);
    }

    @DeleteMapping("/leads/{userName}/{leadId}")
    public ResponseEntity<String> deleteLead(@PathVariable String userName, @PathVariable Long leadId) {
        User user = userRepository.findByUsername(userName);
        boolean isDeleted = leadService.deleteLeadByUser(leadId, user.getUserId());

        if (isDeleted) {
            return ResponseEntity.ok("Lead deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Error: Lead not found or you don’t have permission.");
        }
    }
}
