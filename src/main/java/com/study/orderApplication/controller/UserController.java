package com.study.orderApplication.controller;

import com.study.orderApplication.entity.RefreshToken;
import com.study.orderApplication.entity.Users;
import com.study.orderApplication.repository.RefreshTokenRepository;
import com.study.orderApplication.service.UserService;
import com.study.orderApplication.service.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final RefreshTokenRepository refreshTokenRepository;

    public UserController(UserService userService, JwtUtil jwtUtil, RefreshTokenRepository refreshTokenRepository) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Users users) {
        log.info("signup user: {}", users);
        userService.signup(users);
        return ResponseEntity.ok("회원가입 완료");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Users users) {
        if(userService.authenticate(users.getUserId(), users.getUserPw())) {
            String accessToken = jwtUtil.generateAccessToken(users.getUserId());
            String refreshToken = jwtUtil.generateRefreshToken(users.getUserId());
            String userRole = userService.findByUserId(users.getUserId()).getRole();

            refreshTokenRepository.save(new RefreshToken(users.getUserId(), refreshToken));

            Map<String, String> response = new HashMap<>();
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);
            response.put("userRole", userRole);

            return ResponseEntity.ok(response);
        }
        else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    @GetMapping("/list")
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = userService.getAllUsers();
        log.info("get all users: {}", users);
        return ResponseEntity.ok(users);
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        if (!jwtUtil.validateToken(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Refresh Token");
        }

        String userId = jwtUtil.extractUserId(refreshToken);
        RefreshToken storedToken = refreshTokenRepository.findById(userId).orElse(null);

        if (storedToken == null || !storedToken.getRefreshToken().equals(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh Token not found");
        }

        String newAccessToken = jwtUtil.generateAccessToken(userId);

        Map<String, String> token = new HashMap<>();
        token.put("accessToken", newAccessToken);

        return ResponseEntity.ok(token);
    }

}
