package com.example.cardify.repository;

import com.example.cardify.Models.Portfolio;
import com.example.cardify.Models.SocialLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SocialLinkRepository extends JpaRepository<SocialLink, Long> {
    List<SocialLink> findByPortfolio(Portfolio portfolio);
}

