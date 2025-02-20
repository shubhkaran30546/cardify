//package com.example.cardify.controller;
//
//import com.example.cardify.Models.Portfolio;
//import com.example.cardify.Models.PortfolioResponse;
//import com.example.cardify.service.JwtService;
//import com.example.cardify.service.PortfolioService;
//import com.example.cardify.service.UserDetailsServiceImpl;
//import jakarta.servlet.http.HttpServletRequest;
//import lombok.RequiredArgsConstructor;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.ComponentScan;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.List;
//
////@RestController
////@RequestMapping("/api")
////@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
////public class PortfolioController {
////
////    @Autowired
////    private PortfolioService portfolioService;
////
////    @Autowired
////    private JwtService jwtService;  // Inject JwtUtil via constructor
////
////    private static final Logger logger = LoggerFactory.getLogger(PortfolioController.class);
////    private UserDetailsService userDetailsService;
////
////    @PostMapping("/submit")
////    public ResponseEntity<?> submitPortfolio(
////            @RequestParam("firstName") String firstName,
////            @RequestParam("lastName") String lastName,
////            @RequestParam("title") String title,
////            @RequestParam("aboutMe") String aboutMe,
////            @RequestParam("address") String address,
////            @RequestParam("email") String email,
////            @RequestParam("phoneNumber") String phoneNumber,
////            @RequestParam("socialLinks[]") List<String> socialLinks,
////            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage,
////            HttpServletRequest request) {
////        // Extract JWT token from request header
////        String authHeader = request.getHeader("Authorization");
////
////        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
////            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Missing or invalid token");
////        }
////
////        String token = authHeader.substring(7);  // Remove "Bearer " prefix
////        try {
////            String username = jwtService.extractUsername(token);
////
////            // Check if token is valid
////            if (username != null && jwtService.isTokenValid(token, userDetailsService.loadUserByUsername(username))) {
////                // Proceed with the portfolio submission logic
////                Portfolio portfolio = new Portfolio(firstName, lastName, title, aboutMe, address, email, phoneNumber, socialLinks, null);
////                // Your existing code for handling file upload and saving portfolio
////
////                portfolioService.savePortfolio(portfolio);
////                return ResponseEntity.ok("Portfolio saved successfully!");
////            } else {
////                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid or expired token");
////            }
////        } catch (Exception e) {
////            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Error processing token: " + e.getMessage());
////        }
////    }
////
////
////    private String saveFile(MultipartFile file) throws IOException {
////        logger.debug("Attempting to save file: {}", file.getOriginalFilename());
////
////        String uploadDir = System.getProperty("user.dir") + "/uploads/images/";
////        logger.debug("Upload directory: {}", uploadDir);
////
////        File dir = new File(uploadDir);
////        if (!dir.exists()) {
////            boolean dirCreated = dir.mkdirs();
////            logger.debug("Directory created: {}", dirCreated);
////        }
////
////        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
////        Path path = Paths.get(uploadDir, fileName);
////        logger.debug("Saving file to path: {}", path);
////
////        Files.write(path, file.getBytes());
////        logger.debug("File written to: {}", path);
////
////        return "/images/" + fileName;  // Returning relative path for the image
////    }
////}
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//@ComponentScan
//@RestController
//@RequestMapping("/api/portfolio")
//@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
//public class PortfolioController {
//
//
//    private final PortfolioService portfolioService;
//    private final JwtService jwtService;
//    private final UserDetailsServiceImpl userDetailsService;
//
//
//    public PortfolioController(PortfolioService portfolioService, JwtService jwtService, UserDetailsServiceImpl userDetailsService) {
//        this.portfolioService = portfolioService;
//        this.jwtService = jwtService;
//        this.userDetailsService = userDetailsService;
//        System.out.println("PortfolioController initialized.");
//    }
//
//    // Save or update portfolio
//    @PostMapping("/save")
//    public ResponseEntity<String> saveOrUpdatePortfolio(@RequestBody Portfolio portfolio, @RequestHeader("Authorization") String token) {
//
//        System.out.println("received portfolio");
//        try {
//            // Extract the email from the token
//            String userEmail = extractEmailFromToken(token);
//            System.out.println("email" + userEmail);
//            System.out.println("portfolio" + portfolio.getPortfolioId());
//
//            if (userEmail != null && jwtService.isTokenValid(token, userDetailsService.loadUserByUsername(userEmail))) {
//                // Save or update the portfolio
//                portfolioService.saveOrUpdatePortfolio(userEmail, portfolio);
//                System.out.println("aaaaaaaaaaaaaaaaa");
//                return ResponseEntity.ok("Portfolio saved successfully!");
//            }
//        }
//            catch (Exception e) {
//                e.printStackTrace();
//            }
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving portfolio.");
//        }
//
//    // Helper method to extract email from JWT token
//    private String extractEmailFromToken(String token) {
//        // Remove "Bearer " from the token if it exists
//        if (token != null && token.startsWith("Bearer ")) {
//            token = token.substring("Bearer ".length()).trim(); // Remove the "Bearer " prefix
//        }
//        return jwtService.extractUsername(token); // Extract username (email) from token
//    }
//}
package com.example.cardify.controller;

import com.example.cardify.Models.Portfolio;
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

            System.out.println("Email: " + userEmail);
            System.out.println("Portfolio ID: " + portfolio.getPortfolioId());

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
    @GetMapping("/get/{userId}")
    public ResponseEntity<Portfolio> getPortfolio(
            @PathVariable Long userId
    ) {
        try {
            System.out.println("Received userId: " + userId);
            Portfolio portfolio = portfolioService.getPortfolioByIdAndName(userId);
            return ResponseEntity.ok(portfolio);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/get/{userId}/image")
    public ResponseEntity<byte[]> getImageByPortfolioId(@PathVariable Long userId) {
        Portfolio portfolio = portfolioService.getPortfolioByIdAndName(userId);
        byte[] imageFile = portfolio.getImageDate();

        return ResponseEntity.ok().contentType(MediaType.valueOf(portfolio.getImageType())).body(imageFile);

    }
    // Helper method to extract email from JWT token
    private String extractEmailFromToken(String token) {
        token = token.replace("Bearer ", "").trim(); // Remove the "Bearer " prefix
        return jwtService.extractUsername(token); // Extract username (email) from token
    }
}
