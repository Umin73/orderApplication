package com.study.orderApplication.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Builder
@Data
public class CartResponseDto {

    @NotNull
    private Long cartId;
    @NotBlank
    private String itemName;
    @NotBlank
    private String itemImageUrl;
    @NotNull
    private Integer itemPrice;
    @NotNull
    private Integer quantity;
    @NotBlank
    private String itemCode;
    @NotNull
    private Integer totalPrice;
    @NotNull
    private LocalDateTime addedAt;
}
