//package com.example.cardify.controller;
//
//import com.example.cardify.Models.Lead;
//import com.example.cardify.Models.Portfolio;
//import com.example.cardify.Models.User;
//import com.example.cardify.repository.UserRepository;
//import com.example.cardify.service.EmailService;
//import com.example.cardify.service.LeadService;
//import com.example.cardify.service.PortfolioService;
//import jakarta.mail.MessagingException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/contact")
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // Allow frontend access
//public class ContactController {
//
//    @Autowired
//    private EmailService emailService;
//
//    @Autowired
//    private LeadService leadService;
//
//    @Autowired
//    private PortfolioService portfolioService;  // Service to handle portfolio logic
//    @Autowired
//    private UserRepository userRepository;
//
//    @PostMapping("/send")
//    public String sendContactEmail(@RequestBody Map<String, String> formData) {
//        String recipientEmail = formData.get("recipientEmail"); // Portfolio owner's email
//        if (recipientEmail == null || recipientEmail.isEmpty()) {
//            return "Error: Portfolio owner email not provided.";
//        }
//
//        // Form data for lead
//        String title = formData.get("title");  // Added title here
//        String firstName = formData.get("firstName");
//        String lastName = formData.get("lastName");
//        String email = formData.get("email");
//        String phone = formData.get("phone");
//        String company = formData.get("company");
//        String notes = formData.get("notes");
//        User user = userRepository.findByEmail(recipientEmail);
//
//        // Saving lead
//        Portfolio portfolio = portfolioService.getPortfolioByIdAndName(user.getUserId());
//        if (portfolio == null) {
//            return "Error: Portfolio not found for the given email.";
//        }
//
////        Lead lead = new Lead();
////        lead.setTitle(title);
////        lead.setFirstName(firstName);
////        lead.setLastName(lastName);
////        lead.setEmail(email);
////        lead.setPhone(phone);
////        lead.setCompany(company);
////        lead.setNotes(notes);
////        lead.setPortfolio(portfolio);
////        leadService.saveLead(lead);
//        return "Email Sent Successfully and Lead Saved!";
//
////        String subject = "New Contact Form Submission: " + title;
////        String message = "<h3>Contact Details</h3>" +
////                "<p><b>Name:</b> " + firstName + " " + lastName + "</p>" +
////                "<p><b>Email:</b> " + email + "</p>" +
////                "<p><b>Phone:</b> " + phone + "</p>" +
////                "<p><b>Company:</b> " + company + "</p>" +
////                "<p><b>Message:</b> " + notes + "</p>";
////        try {
////            emailService.sendEmail(recipientEmail, subject, message);
////            return "Email Sent Successfully and Lead Saved!";
////        } catch (MessagingException e) {
////            return "Error sending email: " + e.getMessage();
////        }
//    }
//
//    @GetMapping("/leads")
//    public ResponseEntity<List<Lead>> getLeads(@RequestParam String email) {
//        return ResponseEntity.ok().body(leadService.getLeadsByPortfolioEmail(email));
//    }
//}
