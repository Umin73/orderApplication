package com.study.orderApplication.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable() // CSRF 비활성화 (개발용)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/user/signup", "/user/login", "/user/list").permitAll() // 이 경로는 누구나 접근 허용
                        .anyRequest().authenticated() // 나머지는 인증 필요
                )
                .formLogin().disable(); // 기본 로그인 폼 비활성화
        return http.build();
    }
}
