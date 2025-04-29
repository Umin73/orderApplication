package com.study.orderApplication.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 모든 경로 허용
                        .allowedOrigins("http://localhost:3000") // 리액트 포트
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 모든 메서드 허용
                        .allowedHeaders("*") // 모든 헤더 허용
                        .allowCredentials(true) // 쿠키 포함 요청 허용
                        .maxAge(3600L); // preflight 요청 결과를 1시간동안 캐시
            }
        };
    }
}
