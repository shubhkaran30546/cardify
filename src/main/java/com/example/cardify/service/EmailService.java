package com.example.cardify.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.util.Map;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private SpringTemplateEngine templateEngine;

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
}
