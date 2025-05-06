package com.study.orderApplication.dto;

import lombok.Data;

@Data
public class DirectOrderRequestDto {
    private String itemCode;
    private int quantity;
    private String requestNote;
    private String packagingOption;
    private String paymentOption;
}
