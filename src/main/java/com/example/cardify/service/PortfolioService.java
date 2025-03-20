package com.example.cardify.service;

import com.example.cardify.Models.Portfolio;
import com.example.cardify.Models.SocialLink;
import com.example.cardify.Models.User;
import com.example.cardify.repository.LeadRepository;
import com.example.cardify.repository.PortfolioRepository;
import com.example.cardify.repository.SocialLinkRepository;
import com.example.cardify.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;
    private final SocialLinkRepository socialLinkRepository;
//    private LeadRepository leadRepository;

    @Transactional
    public Portfolio saveOrUpdatePortfolio(String email, Portfolio portfolio, MultipartFile imageFile) throws IOException {
        // Attempt to find the user by email
        User user = userRepository.findByUsername(email);
        if (user == null) {
            // Handle the case where the user is not found
            throw new UsernameNotFoundException("User not found with email: " + email); // Exception or other handling
        }
        Long userId = user.getUserId();
        System.out.println("Saving portfolio for user_id: " + userId);

        // If a portfolio exists for the user, update it
        Portfolio existingPortfolio = portfolioRepository.findByUser(user).orElse(null);
        if (existingPortfolio != null) {
            // Update existing portfolio details
            existingPortfolio.setFirstName(portfolio.getFirstName());
            existingPortfolio.setLastName(portfolio.getLastName());
            existingPortfolio.setTitle(portfolio.getTitle());
            existingPortfolio.setEmail(portfolio.getEmail());
            existingPortfolio.setAbout(portfolio.getAbout());
            existingPortfolio.setAddress(portfolio.getAddress());
            existingPortfolio.setPhoneNumber(portfolio.getPhoneNumber());
            existingPortfolio.setExpirationDateTime(portfolio.getExpirationDateTime());
            existingPortfolio.setImageName(imageFile.getOriginalFilename());
            existingPortfolio.setImageType(imageFile.getContentType());
            existingPortfolio.setImageDate(imageFile.getBytes());
            existingPortfolio.setCompanyName(portfolio.getCompanyName());

            // Update social links
            List<SocialLink> existingLinks = existingPortfolio.getSocialLinks();
            List<SocialLink> newLinks = portfolio.getSocialLinks();

            // Remove links that are no longer in the updated list
            existingLinks.removeIf(existingLink -> !newLinks.contains(existingLink));

            // Add new social links
            for (SocialLink newLink : newLinks) {
                if (!existingLinks.contains(newLink)) {
                    newLink.setPortfolio(existingPortfolio);
                    existingLinks.add(newLink);
                }
            }

            return portfolioRepository.save(existingPortfolio);
        }

        // New portfolio: associate user and save the portfolio
        portfolio.setUser(user);  // Set the user reference
        portfolio.setImageName(imageFile.getOriginalFilename());
        portfolio.setImageType(imageFile.getContentType());
        portfolio.setImageDate(imageFile.getBytes());
        portfolio.setCompanyName(portfolio.getCompanyName());
        List<SocialLink> newSocialLinks = new ArrayList<>();
        for (SocialLink socialLink : portfolio.getSocialLinks()) {
            socialLink.setPortfolio(portfolio); // Ensure links are assigned correctly
            newSocialLinks.add(socialLink);
        }
        portfolio.setSocialLinks(newSocialLinks);

        return portfolioRepository.save(portfolio);  // Save the new portfolio
    }



    public Portfolio getPortfolioByIdAndName(String userName) {
        // Attempt to find the user by userId
        System.out.println("AAAAAAAAAAAAAAAAAAA111111");
        User user = userRepository.findByUsername(userName);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + userName);
        }
        System.out.println("AAAAAAAAAAAAAAAAAAA2222222");
        try {
            Portfolio portfolio = portfolioRepository.findPortfolioWithSocialLinksByUser(user)
                    .orElseThrow(() -> new EntityNotFoundException("Portfolio not found for user with ID: " + userName));
            System.out.println("AAAAAAAAAAAAAAAAAAA444444444");
            return portfolio;
        } catch (Exception e) {
            e.printStackTrace(); // Print the real error
            throw e;
        }
    }

    @Transactional
    public void deletePortfolio(User user) {
        // Fetch portfolio with social links (no need to manually delete social links anymore)
        Portfolio portfolio = portfolioRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Portfolio not found"));

        // Delete the portfolio, cascading delete will handle the social links
        portfolioRepository.delete(portfolio);
    }


}
