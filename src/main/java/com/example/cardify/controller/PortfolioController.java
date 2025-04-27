
package com.example.cardify.controller;

import com.example.cardify.Models.Portfolio;
import com.example.cardify.Models.User;
import com.example.cardify.Models.VisitAnalytics;
import com.example.cardify.service.JwtService;
import com.example.cardify.service.PortfolioService;
import com.example.cardify.service.UserDetailsServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PortfolioController {

    private final PortfolioService portfolioService;
    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;
    // Constructor-based Dependency Injection (No @Autowired needed)
    public PortfolioController(PortfolioService portfolioService, JwtService jwtService, UserDetailsServiceImpl userDetailsService) {
        this.portfolioService = portfolioService;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        System.out.println("PortfolioController initialized.");
    }

    @PostMapping("/visit/{userName}")
    public ResponseEntity<?> recordVisit(@PathVariable String userName) {
        portfolioService.recordVisit(userName);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/visit/{userName}")
    public ResponseEntity<List<VisitAnalytics>> getVisitAnalytics(@PathVariable String userName) {
        return ResponseEntity.ok(portfolioService.getVisitsByUser(userName));
    }

    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> saveOrUpdatePortfolio(
            @RequestPart("portfolio") Portfolio portfolio,
            @RequestPart(value = "profileImage", required = false) MultipartFile file,
            @RequestHeader(value = "Authorization", required = false) String token) {

        System.out.println("Portfolio received: " + portfolio);

        if (file != null) {
            System.out.println("File received: " + file.getOriginalFilename());
        }

        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Missing or invalid token."));
        }

        try {
            // Extract email from token
            String userEmail = extractEmailFromToken(token);
            if (userEmail == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid token."));
            }

            String jwt = token.substring(7);
            boolean isTokenValid = jwtService.isTokenValid(jwt, userDetailsService.loadUserByUsername(userEmail));

            System.out.println("Email: " + userEmail);
            System.out.println("Portfolio ID: " + portfolio.getPortfolioId());
            System.out.println("JWT Valid: " + isTokenValid);

            if (isTokenValid) {
                // Save or update portfolio
                Portfolio savedPortfolio = portfolioService.saveOrUpdatePortfolio(userEmail, portfolio, file);

                if (savedPortfolio == null || savedPortfolio.getUser() == null) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(Map.of("error", "Failed to save portfolio."));
                }

                String userName = savedPortfolio.getUser().getUsername();
                System.out.println("Portfolio saved successfully for user: " + userName);

                return ResponseEntity.ok(Map.of("userName", userName));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Token validation failed."));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error saving portfolio: " + e.getMessage()));
        }
    }

    @GetMapping("/get/{userName}")
    public ResponseEntity<Portfolio> getPortfolio(
            @PathVariable String userName
    ) {
        try {
            System.out.println("Received userId: " + userName);
            Portfolio portfolio = portfolioService.getPortfolioByIdAndName(userName);
            return ResponseEntity.ok(portfolio);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get/{userName}/image")
    public ResponseEntity<byte[]> getImageByPortfolioId(@PathVariable String userName) {
        Portfolio portfolio = portfolioService.getPortfolioByIdAndName(userName);
        byte[] imageFile = portfolio.getImageDate();

        return ResponseEntity.ok().contentType(MediaType.valueOf(portfolio.getImageType())).body(imageFile);

    }
    // Helper method to extract email from JWT token
    private String extractEmailFromToken(String token) {
        token = token.replace("Bearer ", "").trim(); // Remove the "Bearer " prefix
        return jwtService.extractUsername(token); // Extract username (email) from token
    }
}
