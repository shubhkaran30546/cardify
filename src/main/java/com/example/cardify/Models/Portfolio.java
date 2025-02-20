package com.example.cardify.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

//@Entity
//@Table(name = "portfolios")
//public class Portfolio {
//
//    @OneToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int portfolioId;
//
//    @Column(name = "about")
//    private String about;
//
//    @Column(name = "email")
//    private String email;
//
//    @Column(name = "first_name")
//    private String firstName;
//
//    @Column(name = "last_name")
//    private String lastName;
//
//    @Column(name = "address")
//    private String address;
//
//    @Column(name = "title")
//    private String title;
//
//    @Column(name = "phone_number")
//    private String phoneNumber;
//
//    // Profile image path, not just the filename
//    @Column(name = "profile_image_path")
//    private String profileImagePath;
//
//    @ElementCollection
//    @CollectionTable(name = "portfolio_urls", joinColumns = @JoinColumn(name = "portfolio_id"))
//    @Column(name = "social_links")
//    private List<String> socialLinks;
//
//    @NotNull
//    private Instant expirationDateTime;
//
//    // Constructor to initialize the object with the file name
//    public Portfolio(String firstName, String lastName, String title, String aboutMe, String address, String email, String phoneNumber, List<String> socialLinks, MultipartFile profileImage) {
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.title = title;
//        this.about = aboutMe;
//        this.address = address;
//        this.email = email;
//        this.phoneNumber = phoneNumber;
//        this.socialLinks = new ArrayList<>();
//        if (profileImage != null) {
//            this.profileImagePath = profileImage.getOriginalFilename(); // Initially store only the file name
//        }
//    }
//
//    // Default constructor
//    public Portfolio() {
//    }
//
//    // Getter and Setter for profileImagePath
//    public String getProfileImagePath() {
//        return profileImagePath;
//    }
//
//    public void setProfileImagePath(String profileImagePath) {
//        this.profileImagePath = profileImagePath;
//    }
//
//    // Other getters and setters
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//
//    public int getPortfolioId() {
//        return portfolioId;
//    }
//
//    public void setPortfolioId(int portfolioId) {
//        this.portfolioId = portfolioId;
//    }
//
//    public String getAbout() {
//        return about;
//    }
//
//    public void setAbout(String about) {
//        this.about = about;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getFirstName() {
//        return firstName;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public String getAddress() {
//        return address;
//    }
//
//    public void setAddress(String address) {
//        this.address = address;
//    }
//
//    public String getPhoneNumber() {
//        return phoneNumber;
//    }
//
//    public void setPhoneNumber(String phoneNumber) {
//        this.phoneNumber = phoneNumber;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public List<String> getSocialLinks() {
//        return socialLinks;
//    }
//
//    public void setSocialLinks(List<String> socialLinks) {
//        this.socialLinks = socialLinks;
//    }
//}

@Setter
@Getter
@Entity
@Table(name = "portfolio1")
@NoArgsConstructor
@AllArgsConstructor
@Data
@JsonIgnoreProperties({"fieldThatCausesCircularReference"})
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long portfolioId;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId", nullable = false, unique = true)
    @JsonIgnore
    private User user;

    private String firstName;
    private String lastName;
    private String title;
    private String email;

    @Column(length = 2048)  // Increased the size for about to 1024 characters
    private String about;
    private String address;
    private String phoneNumber;
    private String imageName;
    private String imageType;

    @Lob
    private byte[] imageDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Instant expirationDateTime;

    @OneToMany(mappedBy = "portfolio", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<SocialLink> socialLinks = new ArrayList<>(); // ✅ Changed to List<SocialLink>

    // ✅ Method to add a social link
    public void addSocialLink(SocialLink socialLink) {
        socialLinks.add(socialLink);
        socialLink.setPortfolio(this);
    }

    // ✅ Method to remove a social link
    public void removeSocialLink(SocialLink socialLink) {
        socialLinks.remove(socialLink);
        socialLink.setPortfolio(null);
    }

}
