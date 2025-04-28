package com.study.orderApplication.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {

    private String userId;
    private String username;
    private String phone;
    private String email;
    private String kakaouser;
    private String role;
    private Integer point;
}
