package com.example.cardify.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long leadId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String title;
    private String company;
    private String notes;

    @ManyToOne
    @JoinColumn(name = "portfolio_id", referencedColumnName = "id")  // This ensures correct mapping
    @JsonIgnore
    private Portfolio portfolio;
}