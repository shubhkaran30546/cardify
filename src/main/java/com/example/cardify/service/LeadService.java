package com.example.cardify.service;

import com.example.cardify.Models.Lead;
import com.example.cardify.Models.Portfolio;
import com.example.cardify.Models.User;
import com.example.cardify.repository.LeadRepository;
import com.example.cardify.repository.PortfolioRepository;
import com.example.cardify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LeadService {

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;
    @Autowired
    private UserRepository userRepository;

    // Save a new lead
    public Lead saveLead(Lead lead) {
        return leadRepository.save(lead);
    }

    // Get all leads associated with a portfolio by email
    @Transactional(readOnly = true)
    public List<Lead> getLeadsByPortfolioId(Long portfolioId) {
        return leadRepository.findLeadsByPortfolioId(portfolioId);
    }

    @Transactional
    public boolean deleteLeadByUser(Long leadId, Long userId) {
        int deletedRows = leadRepository.deleteLeadByIdAndUserId(leadId, userId);
        return deletedRows > 0;  // Returns true if at least one row was deleted
    }
}
