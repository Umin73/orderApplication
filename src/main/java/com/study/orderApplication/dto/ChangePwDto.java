package com.study.orderApplication.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChangePwDto {

    @NotBlank
    private String userId;

    @NotBlank
    private String newPw;
}
