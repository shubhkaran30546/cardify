package com.example.cardify.config;

import com.example.cardify.Models.User;
import com.example.cardify.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

@Configuration
public class ApplicationConfiguration {
//    private final UserRepository userRepository;

    public ApplicationConfiguration() {
//        this.userRepository = userRepository;
    }

//    @Bean
//    UserDetailsService userDetailsService() {
//        return username -> {
//            Optional<User> userOptional = Optional.ofNullable(userRepository.findByEmail(username));
//            if (userOptional.isEmpty()) {
//                throw new UsernameNotFoundException("User not found");
//            }
//            return userOptional.get();
//        };
//    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
