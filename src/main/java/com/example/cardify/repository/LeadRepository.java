package com.example.cardify.repository;

import com.example.cardify.Models.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {

    @Query("SELECT l FROM Lead l WHERE l.portfolio.user.userId = :userId")
    List<Lead> findLeadsByPortfolioId(@Param("userId") Long userId);
}
