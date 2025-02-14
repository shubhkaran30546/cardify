package com.example.cardify.service;

import com.example.cardify.Models.User;
import com.example.cardify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User registerUser(String firstName, String lastName, String email, String phoneNumber, String password) {
        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(password);
        User user = new User(firstName, lastName, email, phoneNumber, hashedPassword);
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

    public User GetUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

}
