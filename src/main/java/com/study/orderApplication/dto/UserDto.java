package com.study.orderApplication.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;
import org.springframework.beans.factory.annotation.Value;

@Getter
@Setter
public class UserDto {

    @NotBlank
    private String userId;
    @NotBlank
    private String username;
    private String phone;
    @NotBlank
    private String email;
    @NotBlank
    private String kakaouser;
    @NotBlank
    private String role;
    @NotNull
    @Range(min = 0)
    private Integer point;
}
