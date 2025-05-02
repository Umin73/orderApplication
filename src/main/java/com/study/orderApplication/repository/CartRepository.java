package com.study.orderApplication.repository;

import com.study.orderApplication.entity.Cart;
import com.study.orderApplication.entity.Item;
import com.study.orderApplication.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUser(Users user);
    Optional<Cart> findByUserAndItem(Users user, Item item);
}
