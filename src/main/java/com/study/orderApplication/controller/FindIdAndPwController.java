package com.study.orderApplication.controller;

import com.study.orderApplication.dto.ChangePwDto;
import com.study.orderApplication.dto.EmailCodeDto;
import com.study.orderApplication.dto.MailDto;
import com.study.orderApplication.entity.AuthCode;
import com.study.orderApplication.entity.Users;
import com.study.orderApplication.repository.AuthCodeRepository;
import com.study.orderApplication.service.MailService;
import com.study.orderApplication.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class FindIdAndPwController {

    private static final Logger log = LoggerFactory.getLogger(FindIdAndPwController.class);
    private final UserService userService;
    private final MailService mailService;
    private final AuthCodeRepository authCodeRepository;

    @GetMapping("/exist-email")
    public ResponseEntity<Map<String, Object>> existEmail(@RequestParam("email") String email) {
        Map<String, Object> response = new HashMap<>();

        if(userService.checkUserEmailExists(email)) {
            response.put("success", true);
            response.put("message", "인증번호가 이메일로 전송되었습니다.");
        } else {
            response.put("success", false);
            response.put("message", "등록되지 않은 이메일 입니다.");
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/exist-userid")
    public ResponseEntity<Map<String, Object>> existUser(@RequestParam("userId") String userId) {
        Map<String, Object> response = new HashMap<>();

        if(userService.checkUserIdExists(userId)) {
            Users user = userService.getLoginUserByUserId(userId);
            if(user != null) {
                response.put("success", true);
                response.put("message", "존재하는 유저 아이디 입니다.");
                response.put("userEmail", user.getEmail());
            } else {
                response.put("success", false);
                response.put("message", "유저 아이디로 유저 정보를 찾을 수 없습니다.");
                response.put("userEmail", null);
            }
        } else {
            response.put("success", false);
            response.put("message", "등록되지 않은 아이디 입니다.");
            response.put("userEmail", null);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/send-email")
    public void sendIdEmail(@RequestBody MailDto mailDto) {
        String code = mailService.sendFindIdMail(mailDto);

        AuthCode authCode = new AuthCode(mailDto.getEmail(), code, LocalDateTime.now());
        authCodeRepository.save(authCode);
    }

    @PostMapping("/verify-code")
    public ResponseEntity<Map<String, Object>> verifyCode(@RequestBody EmailCodeDto emailCodeDto) {
        Map<String, Object> response = new HashMap<>();

        if(mailService.verifyCode(emailCodeDto)) {
            response.put("success", true);
            response.put("message", "인증되었습니다.");
        } else {
            response.put("success", false);
            response.put("message", "인증에 실패하였습니다.");
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/find-id")
    public ResponseEntity<Map<String, Object>> findId(@RequestParam("email") String email) {
        Map<String, Object> response = new HashMap<>();

        try {
            Users user = userService.findByUserEmail(email);
            String userId = user.getUserId();
            response.put("success", true);
            response.put("userId", userId);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", e.getMessage());
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping("/change-pw")
    public ResponseEntity<String> changePw(@RequestBody ChangePwDto changePwDto) {

        if(userService.updateUserPassword(changePwDto)) {
            return ResponseEntity.ok("비밀번호를 변경하였습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("비밀번호 변경에 실패하였습니다.");
        }
    }
}
