package com.example.cardify.controller;

import com.example.cardify.DTO.PortfolioDTO;
import com.example.cardify.DTO.UserDTO;
import com.example.cardify.Models.Portfolio;
import com.example.cardify.Models.User;
import com.example.cardify.repository.PortfolioRepository;
import com.example.cardify.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')") // Restrict access to admins
public class AdminController {

    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository;

    public AdminController(UserRepository userRepository, PortfolioRepository portfolioRepository) {
        this.userRepository = userRepository;
        this.portfolioRepository = portfolioRepository;
    }

    @GetMapping("/users")
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(UserDTO::new).toList(); // Convert to DTOs
    }

    @GetMapping("/portfolios")
    public List<PortfolioDTO> getAllPortfolios() {
        List<Portfolio> portfolios = portfolioRepository.findAll();
        return portfolios.stream().map(PortfolioDTO::new).toList(); // Convert to DTOs
    }

}

