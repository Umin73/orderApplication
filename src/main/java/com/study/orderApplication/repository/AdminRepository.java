package com.study.orderApplication.repository;

import com.study.orderApplication.entity.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Users,Long> {
    Page<Users> findAll(Pageable pageable);
}
