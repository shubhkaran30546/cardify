package com.example.cardify.repository;

import com.example.cardify.Models.Company;
import com.example.cardify.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    User findByUsername(String username);

    @Transactional
    @Modifying
    @Query("DELETE FROM User u WHERE u.userId = :userId")
    void deleteByUser(@Param("userId") Long userId);

    List<User> findByCompany(Company company);
}
