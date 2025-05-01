package com.study.orderApplication.service;

import com.study.orderApplication.dto.CartDto;
import com.study.orderApplication.dto.CartResponseDto;
import com.study.orderApplication.entity.Cart;
import com.study.orderApplication.entity.Item;
import com.study.orderApplication.entity.Users;
import com.study.orderApplication.repository.CartRepository;
import com.study.orderApplication.repository.ItemRepository;
import com.study.orderApplication.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final UsersRepository usersRepository;
    private final ItemRepository itemRepository;
    private final CartRepository cartRepository;

    public void addToCart(CartDto cartDto) {
        Users user = usersRepository.findByUserId(cartDto.getUserId()).orElseThrow();
        Item item = itemRepository.findById(cartDto.getItemId()).orElseThrow();

        Optional<Cart> optionalCart = cartRepository.findByUserAndItem(user, item);

        if(optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            cart.setQuantity(cart.getQuantity() + cartDto.getQuantity());
            cartRepository.save(cart);
        } else {
            Cart cart = new Cart();
            cart.setUser(user);
            cart.setItem(item);
            cart.setQuantity(cartDto.getQuantity());
            cartRepository.save(cart);
        }
    }

    public void removeFromCart(CartDto cartDto) {
        Users user = usersRepository.findByUserId(cartDto.getUserId()).orElseThrow();
        Item item = itemRepository.findById(cartDto.getItemId()).orElseThrow();

        Optional<Cart> optionalCart =cartRepository.findByUserAndItem(user, item);

        if(optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            int newQuantity = cart.getQuantity() - cartDto.getQuantity();

            if(newQuantity > 0) {
                cart.setQuantity(newQuantity);
                cartRepository.save(cart);
            } else {
                cartRepository.delete(cart);
            }
        }
    }

    public List<CartResponseDto> getCartItems(String userId) {
        Users user = usersRepository.findByUserId(userId).orElseThrow();
        List<Cart> cartList = cartRepository.findByUser(user);

        return cartList.stream()
                .map(cart -> CartResponseDto.builder()
                        .cartId(cart.getId())
                        .itemName(cart.getItem().getItemName())
                        .itemImageUrl(cart.getItem().getItemImageUrl())
                        .itemPrice(cart.getItem().getItemPrice())
                        .quantity(cart.getQuantity())
                        .totalPrice(cart.getItem().getItemPrice() * cart.getQuantity())
                        .addedAt(cart.getAddedDateTime())
                        .build())
                .toList();
    }
}
