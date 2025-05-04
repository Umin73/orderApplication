package com.study.orderApplication.service;

import com.study.orderApplication.dto.OrderRequestDto;
import com.study.orderApplication.entity.Cart;
import com.study.orderApplication.entity.OrderItem;
import com.study.orderApplication.entity.Orders;
import com.study.orderApplication.entity.Users;
import com.study.orderApplication.repository.CartRepository;
import com.study.orderApplication.repository.OrdersRepository;
import com.study.orderApplication.repository.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final UsersRepository usersRepository;
    private final CartRepository cartRepository;
    private final OrdersRepository ordersRepository;

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
}
