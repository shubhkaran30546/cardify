package com.example.cardify.service;

import com.example.cardify.Models.User;
import com.example.cardify.repository.LeadRepository;
import com.example.cardify.repository.PortfolioRepository;
import com.example.cardify.repository.SocialLinkRepository;
import com.example.cardify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private SocialLinkRepository socialLinkRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

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
    public User registerUser(String firstName, String lastName, String email, String phoneNumber, String password) {
        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(password);
        String generatedUsername = generateUsername(firstName, lastName);
        User.Role roleToAssign = userRepository.count() == 0 ? User.Role.ADMIN : User.Role.USER;
        User user = new User(firstName, lastName, email, phoneNumber, hashedPassword, generatedUsername);
        user.setRole(roleToAssign);
        return userRepository.save(user);
    }
    public User registerOAuthUser(String firstName, String lastName, String email, String provider) {
        String generatedUsername = generateUsername(firstName, lastName);
        String dummyPassword = passwordEncoder.encode(UUID.randomUUID().toString());
//        User user = new User(firstName, lastName, email, provider, generatedUsername, dummyPassword);
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setPassword(dummyPassword);
        user.setProvider(provider);
        user.setUsername(generatedUsername);
        User.Role roleToAssign = userRepository.count() == 0 ? User.Role.ADMIN : User.Role.USER;
        user.setRole(roleToAssign);
        return userRepository.save(user);
    }
    public boolean isEmailRegistered(String email) {
        return userRepository.findByEmail(email) != null;
    }

    public User LoginUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            // Debugging
            System.out.println("User found with email: " + email);
            boolean isPasswordMatch = passwordEncoder.matches(password, user.getPassword());
            if (isPasswordMatch) {
                return user;
            }
        }
        return null;
    }
    public boolean hasActiveSubscription(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return false;

        String status = user.getSubscriptionStatus(); // e.g., "active"
        return status != null && status.equalsIgnoreCase("active");
    }

    public String getSubscriptionType(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) return null;
        return user.getSubscriptionType().name(); // Returns "INDIVIDUAL", "CORPORATE", etc.
    }


    public User GetUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Transactional
    public void deleteUser(Long userId) {
        userRepository.deleteByUser(userId);
    }

}