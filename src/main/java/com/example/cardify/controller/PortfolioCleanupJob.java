package com.example.cardify.controller;

import com.example.cardify.Models.User;
import com.example.cardify.repository.PortfolioRepository;
import com.example.cardify.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class PortfolioCleanupJob {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PortfolioRepository portfolioRepository;

    @Scheduled(cron = "0 0 * * * *") // Every hour
    public void deleteExpiredPortfolios() {
        LocalDateTime now = LocalDateTime.now();
        List<User> usersToDelete = userRepository.findAllByDeletionScheduledAtBeforeAndStripeSubscriptionIdIsNull(now);

        for (User user : usersToDelete) {
            portfolioRepository.deleteByUser(user);
            user.setDeletionScheduledAt(null); // Clear the flag after deletion
            userRepository.save(user);
        }
    }
}

