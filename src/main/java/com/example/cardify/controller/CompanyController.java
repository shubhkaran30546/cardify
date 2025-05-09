package com.example.cardify.controller;

import com.example.cardify.DTO.CompanyDTO;
import com.example.cardify.Models.Company;
import com.example.cardify.Models.User;
import com.example.cardify.repository.CompanyRepository;
import com.example.cardify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CompanyController {
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyController(UserRepository userRepository, CompanyRepository companyRepository) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }


    @PostMapping("/api/company")
    public ResponseEntity<Company> createCompany(@RequestBody Company company) {
        Company saved = companyRepository.save(company);
        return ResponseEntity.ok(saved);
    }
    @GetMapping("/api/company")
    public ResponseEntity<List<CompanyDTO>> getAllCompanies() {
        List<CompanyDTO> companyDTOs = companyRepository.findAll()
                .stream()
                .map(CompanyDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(companyDTOs);
    }


    @PostMapping("/api/company/{companyId}/assign-user")
    public ResponseEntity<?> assignUserToCompany(
            @PathVariable Long companyId,
            @RequestParam Long userId,
            @RequestParam(defaultValue = "CORPORATE") String subscriptionType
    ) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setCompany(company);
        user.setSubscriptionType(User.SubscriptionType.valueOf(subscriptionType.toUpperCase()));
        userRepository.save(user);

        return ResponseEntity.ok("User assigned to company with subscription type: " + subscriptionType);
    }


}
