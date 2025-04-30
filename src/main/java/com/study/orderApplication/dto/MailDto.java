package com.study.orderApplication.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MailDto {
    @NotBlank
    private String email;
    private String type; // 어떤 이메일인지 type: findId, findPw
}
