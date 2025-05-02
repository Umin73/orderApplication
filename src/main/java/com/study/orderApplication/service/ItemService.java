package com.study.orderApplication.service;

import com.study.orderApplication.dto.ItemDto;
import com.study.orderApplication.entity.Item;
import com.study.orderApplication.repository.ItemRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.study.orderApplication.dto.ItemDto;

import java.util.List;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ItemService {

    private static final Logger log = LoggerFactory.getLogger(ItemService.class);
    private final ItemRepository itemRepository;

    public void addNewItem(Item item) {
        String itemCode = UUID.randomUUID().toString();
        item.setItemCode(itemCode);
        itemRepository.save(item);
    }


    public void updateItem(Long id, ItemDto dto) {
        Item item = itemRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Item not found")
        );

        item.setItemName(dto.getItemName());
        item.setItemCategory(dto.getItemCategory());
        item.setItemPrice(dto.getItemPrice());
        item.setItemRecommend(dto.getItemRecommend());
        item.setItemNew(dto.getItemNew());
        item.setItemDescription(dto.getItemDescription());
        item.setItemImageUrl(dto.getItemImageUrl());
        item.setItemUpdateDateTime(dto.getItemUpdateDateTime());

        itemRepository.save(item);
    }

    public void deleteItem(Long id) {
        if(!itemRepository.existsById(id)) {
            throw new EntityNotFoundException("Item not found");
        }
        itemRepository.deleteById(id);
    }

    public List<Item> findAllItems() {
        return itemRepository.findAll();
    }

    public List<Item> getOrderItemList(String category) {
        return itemRepository.findByItemCategory(category);
    }
}
