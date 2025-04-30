package com.study.orderApplication.dto;

import lombok.Data;

@Data
public class MailDto {
    private String email;
    private String type; // 어떤 이메일인지 type: findId, findPw
}
