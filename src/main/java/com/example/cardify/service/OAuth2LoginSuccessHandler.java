package com.example.cardify.service;

import com.example.cardify.Models.User;
import com.example.cardify.repository.UserRepository;
import com.example.cardify.service.JwtService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
public class OAuth2LoginSuccessHandler implements org.springframework.security.web.authentication.AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final UserService userService;
    private final EmailService emailService;

    public OAuth2LoginSuccessHandler(UserRepository userRepository, JwtService jwtService, UserService userService, EmailService emailService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.userService = userService;
        this.emailService = emailService;
    }
    private String generateUsername(String firstName, String lastName) {
        // Create a base username using the first and last name, e.g., "johnsmith"
        String baseUsername = (firstName + lastName).toLowerCase().replaceAll("\\s+", "");
        String candidate = baseUsername;
        int count = 0;
        // Loop until a unique username is found
        while (userRepository.existsByUsername(candidate)) {
            count++;
            candidate = baseUsername + count;
        }
        return candidate;
    }

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");
        String generatedUsername = generateUsername(firstName, lastName);
        User user = userRepository.findByEmail(email);
        if (user == null) {
            String subject = "Signup Success";
            Map<String, Object> templateModel = new HashMap<>();
            templateModel.put("subject", subject);
            templateModel.put("firstName", firstName);
            try {
                emailService.sendTemplatedEmailWithAttachment(email, subject,
                        templateModel, "welcome", null);
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
            user = userService.registerOAuthUser(firstName, lastName, email, "GOOGLE");
            userRepository.save(user);
        }

        // Generate JWT token
        String token = jwtService.generateToken(user);
        System.out.println("Generated JWT Token: " + token);

        // Redirect with token
        String redirectUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/signup")
                .queryParam("token", token)
                .build().toUriString();

        response.sendRedirect(redirectUrl);
    }


}
