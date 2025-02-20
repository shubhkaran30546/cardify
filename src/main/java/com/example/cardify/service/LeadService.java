//package com.example.cardify.service;
//
//import com.example.cardify.Models.Lead;
//import com.example.cardify.Models.Portfolio;
//import com.example.cardify.Models.User;
//import com.example.cardify.repository.LeadRepository;
//import com.example.cardify.repository.PortfolioRepository;
//import com.example.cardify.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class LeadService {
//
//    @Autowired
//    private LeadRepository leadRepository;
//
//    @Autowired
//    private PortfolioRepository portfolioRepository;
//    @Autowired
//    private UserRepository userRepository;
//
//    // Save a new lead
//    public Lead saveLead(Lead lead) {
//        return leadRepository.save(lead);
//    }
//
//    // Get all leads associated with a portfolio by email
//    public List<Lead> getLeadsByPortfolioEmail(String email) {
//        User user = userRepository.findByEmail(email);
//        Optional<Portfolio> portfolio = portfolioRepository.findByUser(user);
////        if (portfolio != null) {
////            return leadRepository.findByPortfolio(portfolio);
////        }
//        return new ArrayList<>();
//    }
//}
