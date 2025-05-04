package com.study.orderApplication.controller;

import com.study.orderApplication.dto.OrderRequestDto;
import com.study.orderApplication.service.OrderService;
import com.study.orderApplication.service.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/order")
@Controller
@RequiredArgsConstructor
public class OrderController {

    private final JwtUtil jwtUtil;
    private final OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<String> createOrder(@RequestBody OrderRequestDto requestDto,
                                              @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        String userId = jwtUtil.extractUserId(token);

        return orderService.processOrder(userId, requestDto);
    }
}
