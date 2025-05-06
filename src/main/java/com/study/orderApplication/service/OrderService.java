package com.study.orderApplication.service;

import com.study.orderApplication.dto.*;
import com.study.orderApplication.entity.*;
import com.study.orderApplication.repository.CartRepository;
import com.study.orderApplication.repository.ItemRepository;
import com.study.orderApplication.repository.OrdersRepository;
import com.study.orderApplication.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final UsersRepository usersRepository;
    private final CartRepository cartRepository;
    private final OrdersRepository ordersRepository;
    private final ItemRepository itemRepository;

    @Transactional
    public ResponseEntity<String> processOrder(String userId, OrderRequestDto requestDto) {
        Optional<Users> optionalUser = usersRepository.findByUserId(userId);

        if(optionalUser.isPresent()) {
            Users user = optionalUser.get();

            List<Cart> cartList = cartRepository.findByUser(user);

            if(cartList.isEmpty()) {
                return ResponseEntity.badRequest().body("장바구니가 비어있습니다.");
            }

            Orders order = new Orders();
            order.setUser(user);
            order.setRequestNode(requestDto.getRequestNote());
            order.setPackagingOption(requestDto.getPackagingOption());
            order.setPaymentMethod(requestDto.getPaymentOption());

            int totalPrice = 0;
            List<OrderItem> orderItems = new ArrayList<>();

            for(Cart cart : cartList) {
                OrderItem orderItem = new OrderItem();
                orderItem.setOrders(order);
                orderItem.setItem(cart.getItem());
                orderItem.setQuantity(cart.getQuantity());
                orderItem.setPrice(cart.getItem().getItemPrice());

                totalPrice += cart.getQuantity() * cart.getItem().getItemPrice();
                orderItems.add(orderItem);
            }

            order.setOrderItems(orderItems);
            order.setTotalPrice(totalPrice);

            ordersRepository.save(order);
            cartRepository.deleteAll(cartList);

            return ResponseEntity.ok("주문이 완료되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자 정보가 없습니다.");
        }
    }

    @Transactional
    public ResponseEntity<String> processDirectOrder(String userId, DirectOrderRequestDto directOrderRequestDto) {
        Optional<Users> optionalUser = usersRepository.findByUserId(userId);

        if(optionalUser.isPresent()) {
            Users user = optionalUser.get();

            Optional<Item> optionalItem = itemRepository.findByItemCode(directOrderRequestDto.getItemCode());
            if(optionalItem.isPresent()) {
                Item item = optionalItem.get();

                Orders order = new Orders();
                order.setUser(user);
                order.setRequestNode(directOrderRequestDto.getRequestNote());
                order.setPackagingOption(directOrderRequestDto.getPackagingOption());
                order.setPaymentMethod(directOrderRequestDto.getPaymentOption());

                OrderItem orderItem = new OrderItem();
                orderItem.setOrders(order);
                orderItem.setItem(item);
                orderItem.setQuantity(directOrderRequestDto.getQuantity());
                orderItem.setPrice(item.getItemPrice());

                int totalPrice = item.getItemPrice() * directOrderRequestDto.getQuantity();
                order.setTotalPrice(totalPrice);

                List<OrderItem> orderItems = new ArrayList<>();
                orderItems.add(orderItem);
                order.setOrderItems(orderItems);

                ordersRepository.save(order);

                return ResponseEntity.ok("바로 주문이 완료되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 상품을 찾을 수 없습니다.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자 정보가 없습니다.");
        }
    }

    @Transactional(readOnly = true)
    public List<AllOrderResponseDto> getOrderList() {
        List<Orders> orders = ordersRepository.findAll();

        return orders.stream()
                .map(order -> AllOrderResponseDto.builder()
                        .id(order.getId())
                        .customerName(order.getUser().getUsername())
                        .orderTime(order.getOrderDateTime())
                        .packagingOption(order.getPackagingOption())
                        .paymentMethod(order.getPaymentMethod())
                        .requestNode(order.getRequestNode())
                        .totalPrice(order.getTotalPrice())
                        .status(order.getStatus())
                        .orderItems(
                                order.getOrderItems().stream()
                                        .map(oi -> OrderItemDto.builder()
                                                .name(oi.getItem().getItemName())
                                                .quantity(oi.getQuantity())
                                                .build())
                                        .toList()
                        )
                        .build()
                )
                .toList();
    }

    @Transactional
    public ResponseEntity<String> completeOrder(Long id) {
        Optional<Orders> optionalOrder = ordersRepository.findById(id);

        if(optionalOrder.isPresent()) {
            Orders order = optionalOrder.get();
            order.setStatus("완료");
            return ResponseEntity.ok("주문 처리 완료");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("해당 주문이 존재하지 않음: " + id);
        }
    }
}
