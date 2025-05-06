package com.study.orderApplication.controller;

import com.study.orderApplication.dto.AllOrderResponseDto;
import com.study.orderApplication.dto.DirectOrderRequestDto;
import com.study.orderApplication.dto.OrderRequestDto;
import com.study.orderApplication.service.OrderService;
import com.study.orderApplication.service.util.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/order")
@Controller
@RequiredArgsConstructor
public class OrderController {

    private static final Logger log = LoggerFactory.getLogger(OrderController.class);
    private final JwtUtil jwtUtil;
    private final OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<String> createOrder(@RequestBody OrderRequestDto requestDto,
                                              @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        String userId = jwtUtil.extractUserId(token);

        return orderService.processOrder(userId, requestDto);
    }

    @PostMapping("/direct")
    public ResponseEntity<String> directOrder(@RequestBody DirectOrderRequestDto directOrderRequestDto,
                                              @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String userId = jwtUtil.extractUserId(token);

        return orderService.processDirectOrder(userId, directOrderRequestDto);
    }

    @GetMapping("/list")
    public ResponseEntity<List<AllOrderResponseDto>> listOrders() {
        List<AllOrderResponseDto> orders = orderService.getOrderList();
        log.info("list is {}", orders);
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/complete/{id}")
    public ResponseEntity<String> completeOrder(@PathVariable("id") Long id) {
        return orderService.completeOrder(id);
    }
}
