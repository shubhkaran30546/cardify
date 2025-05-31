package com.example.cardify.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"provider", "email"})
})
public class User implements UserDetails {
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Setter
    @Getter
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Setter
    @Getter
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Setter
    @Getter
    @Column(unique = true, nullable = false)
    private String email;

    @Getter
    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(nullable = true)
    private String password; // Store as a hashed value

    @Column(name = "provider", unique = false)
    private String provider; // GOOGLE, FACEBOOK, LOCAL

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(unique = true, nullable = false)
    private String username; // New field for username/

    @Column
    private LocalDateTime deletionScheduledAt;

    @Column(name = "stripe_subscription_id", nullable = true)
    @Setter
    @Getter
    private String stripeSubscriptionId;


//    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//    private Portfolio portfolio;
@Column(name = "subscription_status")
private String subscriptionStatus; // E.g., active, canceled, incomplete
    public enum Role {
        USER, ADMIN
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role = Role.USER; // Default is USER

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;


    public boolean isAdmin() {
        return this.role == Role.ADMIN;
    }

    public User(String firstName, String lastName, String email, String phoneNumber, String password, String username) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.username = username;
    }
    public User(String firstName, String lastName, String email, String provider) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.provider = provider;
    }



    // Getters and Setters (omitted for brevity)

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum SubscriptionType {
        INDIVIDUAL,
        CORPORATE,
        CUSTOM
    }

    @Enumerated(EnumType.STRING)
    @Column(name = "subscription_type", nullable = false)
    private SubscriptionType subscriptionType = SubscriptionType.INDIVIDUAL;

}