package com.study.orderApplication.dto;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CartDto {

    @NotBlank
    private String itemCode;

    @NotNull
    private int quantity;
}
