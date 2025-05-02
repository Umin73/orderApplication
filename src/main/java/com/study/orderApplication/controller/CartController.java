package com.study.orderApplication.controller;

import com.study.orderApplication.dto.CartDto;
import com.study.orderApplication.dto.CartResponseDto;
import com.study.orderApplication.entity.Cart;
import com.study.orderApplication.service.CartService;
import com.study.orderApplication.service.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequestMapping("/cart")
@Controller
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final JwtUtil jwtUtil;

    @PostMapping("/add")
    public ResponseEntity<String> addToCart(@RequestBody CartDto cartDto, @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String userId = jwtUtil.extractUserId(token);

        if(userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("토큰이 만료됨");
        }

        cartService.addToCart(userId, cartDto);
        return ResponseEntity.ok("장바구니에 추가되었습니다.");
    }

    @PostMapping("/remove")
    public ResponseEntity<String> removeFromCart(@RequestBody CartDto cartDto
        , @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String userId = jwtUtil.extractUserId(token);

        cartService.removeFromCart(userId, cartDto);
        return ResponseEntity.ok("장바구니에서 제거되었습니다.");
    }

    @GetMapping("/list")
    ResponseEntity<List<CartResponseDto>> getCartItems(@RequestHeader("Authorization")String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String userId = jwtUtil.extractUserId(token);

        List<CartResponseDto> cartItems = cartService.getCartItems(userId);
        return ResponseEntity.ok(cartItems);
    }
}
