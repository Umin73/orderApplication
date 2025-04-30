package com.study.orderApplication.service;

import com.study.orderApplication.dto.ItemDto;
import com.study.orderApplication.entity.Item;
import com.study.orderApplication.repository.ItemRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;

    public void addNewItem(Item item) {
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
}
