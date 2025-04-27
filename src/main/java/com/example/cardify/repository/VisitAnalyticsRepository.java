package com.example.cardify.repository;

import com.example.cardify.Models.VisitAnalytics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface VisitAnalyticsRepository extends JpaRepository<VisitAnalytics, Long> {
    Optional<VisitAnalytics> findByUserNameAndVisitDate(String userName, LocalDate visitDate);
    List<VisitAnalytics> findAllByUserNameOrderByVisitDateAsc(String userName);
}

