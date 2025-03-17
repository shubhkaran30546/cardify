package com.example.cardify.repository;

import com.example.cardify.Models.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {

    @Query("SELECT l FROM Lead l WHERE l.portfolio.user.userId = :userId")
    List<Lead> findLeadsByPortfolioId(@Param("userId") Long userId);

    @Modifying
    @Query("DELETE FROM Lead l WHERE l.leadId = :leadId AND l.portfolio.portfolioId IN (SELECT p.portfolioId FROM Portfolio p WHERE p.user.id = :userId)")
    int deleteLeadByIdAndUserId(@Param("leadId") Long leadId, @Param("userId") Long userId);

}
