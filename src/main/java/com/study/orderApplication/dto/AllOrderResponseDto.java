package com.study.orderApplication.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

import com.study.orderApplication.dto.OrderItemDto;

@Data
@Builder
public class AllOrderResponseDto {

    private Long id;
    private String customerName;
    private LocalDateTime orderTime;
    private String packagingOption;
    private String paymentMethod;
    private String requestNode;
    private Integer totalPrice;
    private List<OrderItemDto> orderItems;

}
