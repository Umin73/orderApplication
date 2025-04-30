package com.study.orderApplication.controller;

import com.study.orderApplication.dto.ItemDto;
import com.study.orderApplication.entity.Item;
import com.study.orderApplication.service.ItemService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.Part;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/item")
public class ItemController {

    @Value("${file.upload-dir}")
    private String fileDir;

    private final ItemService itemService;

    @PostMapping("/add")
    public ResponseEntity<String> addItem(@RequestBody Item item) {
        log.info("add item : {}", item);
        itemService.addNewItem(item);
        return ResponseEntity.ok(item.getItemName() + " 등록 완료");
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateItem(@PathVariable Long id, @RequestBody ItemDto itemDto) {
        try {
            itemService.updateItem(id, itemDto);
            return ResponseEntity.ok("상품 수정 완료");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("해당 상품을 찾을 수 없음");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("상품 수정 중 오류 발생");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteItem(@PathVariable Long id) {
        try {
            itemService.deleteItem(id);
            return ResponseEntity.ok("상품 삭제 완료");
        }catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("해당 상품을 찾을 수 없음");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("상품 수정 중 오류 발생");
        }
    }

    @PostMapping("/upload-image")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("image") MultipartFile file) throws IOException, ServletException {
        if(file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "파일이 비어 있습니다."));
        }

        try {
            File dir = new File(fileDir);
            if(!dir.exists()) {
                dir.mkdirs();
            }

            // 파일명 지정
            String originalFilename = file.getOriginalFilename();
            String suffix = originalFilename.substring(originalFilename.lastIndexOf("."));
            String newFileName = UUID.randomUUID().toString() + suffix; // UUID로 파일명 중복 방지

            // 저장 경로
            Path filePath = Paths.get(fileDir, newFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // 이미지 접근 URL
            String imageUrl = "/" + fileDir + newFileName;

            return ResponseEntity.ok(Map.of("imageUrl", imageUrl));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "파일 저장 중 오류가 발생했습니다."));
        }
    }

}
