package com.study.orderApplication.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
    public class WebConfig implements WebMvcConfigurer {

        @Value("${file.upload-dir}")
        private String fileDir;

        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            registry.addResourceHandler("/uploads/**") // URL 패턴
                    .addResourceLocations("file:" + fileDir); // 실제 저장 경로
        }
}
