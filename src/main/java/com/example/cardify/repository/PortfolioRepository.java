package com.example.cardify.repository;

import com.example.cardify.Models.Portfolio;
import com.example.cardify.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {

    Optional<Portfolio> findByUser(User user);
    @Transactional
    @Query("SELECT p FROM Portfolio p LEFT JOIN FETCH p.socialLinks WHERE p.user = :user")
    Optional<Portfolio> findPortfolioWithSocialLinksByUser(@Param("user") User user);
    void deleteByUser(User user);

//    void deleteByUserId(Long userId);

}
