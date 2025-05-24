package com.example.cardify.service;

import com.example.cardify.Models.User;
import com.example.cardify.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

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

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");
        User user = userRepository.findByEmail(email);
        if (user == null) {
            try {
                emailService.sendWelcomeEmail(email, firstName);
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }
            user = userService.registerOAuthUser(firstName, lastName, email, "GOOGLE");
            userRepository.save(user);
        }


        // Generate JWT token
        String token = jwtService.generateToken(user);
        String role = user.getRole().toString();
        System.out.println("Generated JWT Token: " + token);

        // Optionally append the token as a query parameter.
        String redirectUrl = UriComponentsBuilder.fromUriString("http://localhost:8080/signup")
                .queryParam("token", token)
                .queryParam("role", role)
                .build().toUriString();

        response.sendRedirect(redirectUrl);
    }


}
