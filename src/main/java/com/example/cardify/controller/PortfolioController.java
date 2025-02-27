
package com.example.cardify.controller;

import com.example.cardify.Models.Portfolio;
import com.example.cardify.Models.User;
import com.example.cardify.service.JwtService;
import com.example.cardify.service.PortfolioService;
import com.example.cardify.service.UserDetailsServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/save")

    public ResponseEntity<String> saveOrUpdatePortfolio(
            @RequestPart("portfolio") Portfolio portfolio,
            @RequestPart(value = "profileImage", required = false) MultipartFile file,
            @RequestHeader(value = "Authorization", required = false) String token) {


        System.out.println("Portfolio received: " + portfolio);
        System.out.println("File received: " + file.getOriginalFilename());

        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Missing or invalid token.");
        }

        try {
            // Extract the email from the token
            String userEmail = extractEmailFromToken(token);

            if (userEmail == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token.");
            }
//            User user = userDetailsService.loadUserByUsername(userEmail);
            System.out.println("Email: " + userEmail);
            System.out.println("Portfolio ID: " + portfolio.getPortfolioId());
//            String tokenUsername = jwtService.extractUsername(token);
//            System.out.println("Token subject: " + tokenUsername);
//            System.out.println("User details username: " + );
            System.out.println(token.substring(7));
            System.out.println(jwtService.isTokenValid(token.substring(7) , userDetailsService.loadUserByUsername(userEmail)));

            if (jwtService.isTokenValid(token.substring(7), userDetailsService.loadUserByUsername(userEmail))) {
                // Save or update the portfolio
                portfolioService.saveOrUpdatePortfolio(userEmail, portfolio, file);
                System.out.println("Portfolio saved successfully.");
                return ResponseEntity.ok("Portfolio saved successfully!");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token validation failed.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving portfolio: " + e.getMessage());
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
