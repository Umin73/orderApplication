package com.study.orderApplication.service;

import com.study.orderApplication.entity.Item;
import com.study.orderApplication.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    public void addNewItem(Item item) {
        itemRepository.save(item);
    }
}
