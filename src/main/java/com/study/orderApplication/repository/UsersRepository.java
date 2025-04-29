package com.study.orderApplication.repository;

import com.study.orderApplication.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {

    boolean existsByUserId(String userId);
    Optional<Users> findByUserId(String userId);
}
