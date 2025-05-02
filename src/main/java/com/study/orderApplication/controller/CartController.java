package com.study.orderApplication.controller;

import com.study.orderApplication.dto.CartDto;
import com.study.orderApplication.dto.CartResponseDto;
import com.study.orderApplication.entity.Cart;
import com.study.orderApplication.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/cart")
@Controller
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody CartDto cartDto) {
        cartService.addToCart(cartDto);
        return ResponseEntity.ok("장바구니에 추가되었습니다.");
    }

    @PostMapping("/remove")
    public ResponseEntity<String> removeFromCart(@RequestBody CartDto cartDto) {
        cartService.removeFromCart(cartDto);
        return ResponseEntity.ok("장바구니에서 제거되었습니다.");
    }

    @GetMapping("/list/{userId}")
    ResponseEntity<List<CartResponseDto>> getCartItems(@PathVariable String userId) {
        List<CartResponseDto> cartItems = cartService.getCartItems(userId);
        return ResponseEntity.ok(cartItems);
    }
}
