package com.study.orderApplication.repository;


import com.study.orderApplication.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByItemCategory(String category);
    Optional<Item> findByItemCode(String itemCode);
}
