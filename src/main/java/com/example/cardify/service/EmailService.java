package com.example.cardify.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private SpringTemplateEngine templateEngine;

    public void sendWelcomeEmail(String to, String firstName) throws MessagingException, IOException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setSubject("Welcome to Cardify!");
        String emailTemplate;
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(
                        Objects.requireNonNull(getClass().getResourceAsStream("/templates/welcome.html")),
                        StandardCharsets.UTF_8
                ))) {
            emailTemplate = reader.lines().collect(Collectors.joining("\n"));
        }

        // Replace placeholder with the actual name
        emailTemplate = emailTemplate.replace("{firstName}", firstName);

        helper.setText(emailTemplate, true);

        // Attach logo inline
        helper.addInline("logo", new ClassPathResource("static/logo.png"));

        mailSender.send(message);

    }

    public void sendContactFormEmail(String to, Map<String, String> formData) throws MessagingException, IOException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        // Set the recipient and subject
        helper.setTo(to);
        helper.setSubject("New Contact Form Submission: " + formData.get("title"));

        // Read the email template (contact form submission)
        String emailTemplate;
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(
                        Objects.requireNonNull(getClass().getResourceAsStream("/templates/contactFormSubmission.html")),
                        StandardCharsets.UTF_8
                ))) {
            emailTemplate = reader.lines().collect(Collectors.joining("\n"));
        }

        // Replace placeholders in the template with actual form data
        emailTemplate = emailTemplate.replace("{firstName}", formData.get("firstName"));
        emailTemplate = emailTemplate.replace("{lastName}", formData.get("lastName"));
        emailTemplate = emailTemplate.replace("{email}", formData.get("email"));
        emailTemplate = emailTemplate.replace("{phone}", formData.get("phone"));
        emailTemplate = emailTemplate.replace("{company}", formData.get("company"));
        emailTemplate = emailTemplate.replace("{notes}", formData.get("notes"));
        emailTemplate = emailTemplate.replace("{title}", formData.get("title"));
        // Set the email content with HTML enabled
        helper.setText(emailTemplate, true);
        String vCardContent = "BEGIN:VCARD\n" +
                "VERSION:3.0\n" +
                "FN:" + formData.get("firstName") + " " + formData.get("lastName") + "\n" +
                "EMAIL:" + formData.get("email") + "\n" +
                "TEL:" + formData.get("phone") + "\n" +
                "ORG:" + formData.get("company") + "\n" +
                "END:VCARD";

        // Create vCard file in memory
        File vCardFile = File.createTempFile("contact", ".vcf");
        try (FileWriter writer = new FileWriter(vCardFile)) {
            writer.write(vCardContent);
        }

        // Attach vCard file
        helper.addAttachment("contact.vcf", vCardFile);

        // Attach logo inline (if needed)
        helper.addInline("logo", new ClassPathResource("static/logo.png"));

        // Send the email
        mailSender.send(message);
    }


    public void sendEmail(String to, String subject, String message) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(message, true); // 'true' enables HTML content

        mailSender.send(mimeMessage);
    }
    // Send a templated HTML email with an optional image attachment
    public void sendTemplatedEmailWithAttachment(String to, String subject,
                                                 Map<String, Object> templateModel,
                                                 String templateName,
                                                 MultipartFile image) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, image != null && !image.isEmpty());
        helper.setTo(to);
        helper.setSubject(subject);

        // Prepare the Thymeleaf context and process the template
        Context thymeleafContext = new Context();
        thymeleafContext.setVariables(templateModel);
        String htmlContent = templateEngine.process(templateName, thymeleafContext);
        helper.setText(htmlContent, true);

        // Attach image if provided
        if (image != null && !image.isEmpty()) {
            helper.addAttachment(image.getOriginalFilename(), image);
        }
        mailSender.send(mimeMessage);
    }

    public void sendSupportEmail(String firstName, String lastName, String email, String messageContent) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo("support@yourcompany.com"); // Replace with support email
        helper.setSubject("New Support Request from " + firstName + " " + lastName);
        helper.setText("""
                Name: %s %s
                Email: %s
                Message: %s
                """.formatted(firstName, lastName, email, messageContent));

        mailSender.send(message);
    }
}
