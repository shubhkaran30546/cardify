package com.example.cardify.service;

import com.example.cardify.Models.Portfolio;
import com.example.cardify.Models.SocialLink;
import com.example.cardify.Models.User;
import com.example.cardify.repository.PortfolioRepository;
import com.example.cardify.repository.SocialLinkRepository;
import com.example.cardify.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

//@Service
//@Transactional
//public class PortfolioService {
//
//    @Autowired
//    private PortfolioRepository portfolioRepository;
//    private static final Logger logger = LoggerFactory.getLogger(PortfolioService.class);
//    public void savePortfolio(Portfolio portfolio) {
//        // Save the portfolio to the database
//        logger.debug("Saving portfolio: {}", portfolio);
//        portfolioRepository.save(portfolio);
//    }
//}
@Service
@RequiredArgsConstructor
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;
    private final SocialLinkRepository socialLinkRepository;

    public Portfolio saveOrUpdatePortfolio(String email, Portfolio portfolio, MultipartFile imageFile) throws IOException {
        // Attempt to find the user by email
        User user = userRepository.findByEmail(email);
        if (user == null) {
            // Handle the case where the user is not found
            throw new UsernameNotFoundException("User not found with email: " + email); // Exception or other handling
        }
        Long userId=user.getUserId();
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
            existingPortfolio.getSocialLinks().clear();
            List<SocialLink> newSocialLinks = new ArrayList<>();
            for (SocialLink socialLink : portfolio.getSocialLinks()) {
                socialLink.setPortfolio(existingPortfolio); // Set to existing portfolio
                newSocialLinks.add(socialLink);
            }
            existingPortfolio.setSocialLinks(newSocialLinks);
            return portfolioRepository.save(existingPortfolio);
        }

        // New portfolio: associate user and save the portfolio
        portfolio.setUser(user);  // Set the user reference
        portfolio.setImageName(imageFile.getOriginalFilename());
        portfolio.setImageType(imageFile.getContentType());
        portfolio.setImageDate(imageFile.getBytes());
        List<SocialLink> newSocialLinks = new ArrayList<>();
        for (SocialLink socialLink : portfolio.getSocialLinks()) { // Fix the incorrect loop
            socialLink.setPortfolio(portfolio); // Ensure links are assigned correctly
            newSocialLinks.add(socialLink);
        }
        portfolio.setSocialLinks(newSocialLinks);
        return portfolioRepository.save(portfolio);  // Save the new portfolio
    }


    public Portfolio getPortfolioByIdAndName(Long userId) {
        // Attempt to find the user by userId
        System.out.println("AAAAAAAAAAAAAAAAAAA111111");
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
        System.out.println("AAAAAAAAAAAAAAAAAAA2222222");
        // Retrieve the portfolio associated with the user
        if (user == null) {
            throw new UsernameNotFoundException("User not found with ID: " + userId);
        }
        // Check if the portfolio first name matches the provided name

        System.out.println("AAAAAAAAAAAAAAAAAAA33333333");
        try {
            Portfolio portfolio = portfolioRepository.findPortfolioWithSocialLinksByUser(user)
                    .orElseThrow(() -> new EntityNotFoundException("Portfolio not found for user with ID: " + userId));
            System.out.println("AAAAAAAAAAAAAAAAAAA444444444");
            return portfolio;
        } catch (Exception e) {
            e.printStackTrace(); // Print the real error
            throw e;
        }
        // Debug check for social links
//        if (portfolio.getSocialLinks() == null || portfolio.getSocialLinks().isEmpty()) {
//            System.out.println("No social links found for portfolio with user ID: " + userId);
//        }
//        System.out.println("AAAAAAAAAAAAAAAAAAA555");
//        return portfolio;
    }

}
