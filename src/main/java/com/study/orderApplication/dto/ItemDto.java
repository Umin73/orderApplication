package com.study.orderApplication.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

import java.sql.Timestamp;

@Data
public class ItemDto {

    @NotBlank
    private String itemName;
    @NotBlank
    private String itemCategory;
    @NotNull
    @Range(min = 100, max = 100000)
    private Integer itemPrice;
    @NotNull
    private Integer itemRecommend;
    @NotNull
    private Integer itemNew;
    @NotBlank
    private String itemImageUrl;
    @NotBlank
    private String itemDescription;
    @NotNull
    private Timestamp itemUpdateDateTime;
}
