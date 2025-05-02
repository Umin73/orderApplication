package com.study.orderApplication.repository;

import com.study.orderApplication.entity.AuthCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthCodeRepository extends JpaRepository<AuthCode, Long> {
    Optional<AuthCode> findByEmail(String email);
}
