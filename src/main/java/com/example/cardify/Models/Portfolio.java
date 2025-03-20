package com.example.cardify.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;


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
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false, unique = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    private String firstName;
    private String lastName;
    private String title;
    private String email;
    private String companyName;

    @Column(length = 2048)  // Increased the size for about to 1024 characters
    private String about;
    private String address;
    private String phoneNumber;
    private String imageName;
    private String imageType;

    @Lob
    @Basic(fetch = FetchType.LAZY)
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
