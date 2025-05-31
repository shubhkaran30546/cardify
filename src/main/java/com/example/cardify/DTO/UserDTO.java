package com.example.cardify.DTO;

import com.example.cardify.Models.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private User.Role role;
    private String subscriptionStatus;
    private String phoneNumber;

    public UserDTO(User user) {
        this.userId = user.getUserId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.username = user.getUsername();
        this.role = user.getRole();
        this.subscriptionStatus = user.getSubscriptionStatus();
        this.phoneNumber = user.getPhoneNumber();
    }
}
