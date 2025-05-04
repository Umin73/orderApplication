package com.study.orderApplication.dto;

import lombok.Data;

@Data
public class OrderRequestDto {
    private String requestNote;
    private String packagingOption;
    private String paymentOption;
}
