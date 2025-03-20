package com.example.cardify.controller;

import com.example.cardify.DTO.PortfolioDTO;
import com.example.cardify.DTO.UserDTO;
import com.example.cardify.Models.Portfolio;
import com.example.cardify.Models.SocialLink;
import com.example.cardify.Models.User;
import com.example.cardify.repository.PortfolioRepository;
import com.example.cardify.repository.UserRepository;
import com.example.cardify.service.PortfolioService;
import com.example.cardify.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')") // Restrict access to admins
public class AdminController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PortfolioRepository portfolioRepository;
    private final PortfolioService portfolioService;

    public AdminController(UserService userService, PortfolioRepository portfolioRepository, UserRepository userRepository, PortfolioService portfolioService) {
        this.userService = userService;
        this.portfolioRepository = portfolioRepository;
        this.userRepository = userRepository;
        this.portfolioService = portfolioService;
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

    @Transactional
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();

            // Delete associated portfolio first
//            portfolioService.deletePortfolio(user);

            // Now delete the user (this won't violate the foreign key constraint anymore)
            userRepository.deleteById(userId);

            return ResponseEntity.ok("User deleted successfully.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
    }



//     DELETE Portfolio by ID
    @DeleteMapping("/portfolios/{portfolioId}")
    public ResponseEntity<?> deletePortfolio(@PathVariable Long portfolioId) {
        Optional<Portfolio> portfolio = portfolioRepository.findById(portfolioId);
        if (portfolio.isPresent()) {
            portfolioRepository.deleteById(portfolioId);
            return ResponseEntity.ok("Portfolio deleted successfully.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Portfolio not found.");
    }
//}

}

