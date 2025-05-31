package com.example.cardify.service;

import com.example.cardify.Models.PasswordResetToken;
import com.example.cardify.Models.User;
import com.example.cardify.repository.PasswordResetTokenRepository;
import com.example.cardify.repository.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordResetTokenRepository tokenRepository;
    @Autowired
    private EmailService emailService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void sendPasswordResetEmail(String email) throws MessagingException {
        Optional<User> userOpt = Optional.ofNullable(userRepository.findByEmail(email));
        if (userOpt.isEmpty()) {
            throw new IllegalArgumentException("No account associated with this email.");
        }

        // Delete any existing tokens for the user
        tokenRepository.deleteByEmail(email);

        // Generate reset token
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(1); // Token valid for 1 hour

        PasswordResetToken resetToken = new PasswordResetToken(token, email, expiryDate);
        tokenRepository.save(resetToken);

        // Send email with reset link
        String resetLink = "https://cardify-ecard-69efed7c7c3e.herokuapp.com/reset-password?token=" + token;
        emailService.sendEmail(email, "Password Reset Request",
                "Click the link to reset your password: " + resetLink);
    }

    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired token."));

        if (resetToken.isExpired()) {
            throw new IllegalArgumentException("Token has expired.");
        }

        User user = userRepository.findByEmail(resetToken.getEmail());
        String hashedPassword = passwordEncoder.encode(newPassword);
        // Update password (hash it before saving)
        user.setPassword(hashedPassword); // TODO: Hash password before saving
        userRepository.save(user);

        // Delete token after use
        tokenRepository.delete(resetToken);
    }
}

