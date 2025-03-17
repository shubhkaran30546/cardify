package com.example.cardify.DTO;

import com.example.cardify.Models.Portfolio;
import lombok.Getter;
import lombok.Setter;
import java.util.Base64;

@Getter
@Setter
public class PortfolioDTO {
    private Long portfolioId;
    private String firstName;
    private String lastName;
    private String email;
    private String title;
    private String imageName;
    private String imageData; // ✅ Base64 Encoded Image Data
    private String username;

    public PortfolioDTO(Portfolio portfolio) {
        this.portfolioId = portfolio.getPortfolioId();
        this.firstName = portfolio.getFirstName();
        this.lastName = portfolio.getLastName();
        this.email = portfolio.getEmail();
        this.title = portfolio.getTitle();
        this.imageName = portfolio.getImageName();
        this.username = portfolio.getUser().getUsername();

        // ✅ Debugging Logs
        System.out.println("Processing Portfolio ID: " + this.portfolioId);
        System.out.println("Image Name: " + this.imageName);

        if (portfolio.getImageDate() != null) {
            this.imageData = Base64.getEncoder().encodeToString(portfolio.getImageDate());
        } else {
            this.imageData = null;
        }
    }

}
