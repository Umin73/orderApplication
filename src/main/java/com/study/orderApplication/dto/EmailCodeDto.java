package com.study.orderApplication.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EmailCodeDto {
    @NotBlank
    private String email;
    @NotBlank
    private String code;
}
