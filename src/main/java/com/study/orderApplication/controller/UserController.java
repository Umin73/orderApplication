package com.study.orderApplication.controller;

import com.study.orderApplication.dto.UserDto;
import com.study.orderApplication.entity.RefreshToken;
import com.study.orderApplication.entity.Users;
import com.study.orderApplication.repository.RefreshTokenRepository;
import com.study.orderApplication.service.UserService;
import com.study.orderApplication.service.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
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
    public ResponseEntity<Page<Users>> getAllUsers(
        @RequestParam(name = "page", defaultValue="0") int page) {
        log.info("controller");
        int pageSize = 10;
        Page<Users> users = userService.getAllUsers(page, pageSize);
        log.info("users: {}", users);
        log.info("get all users page {}: {}", page, users);
        return ResponseEntity.ok(users);
    }

    @PostMapping("/update-username")
    public ResponseEntity<String> updateUsername(@RequestHeader("Authorization") String authHeader, @RequestBody String username) {
        String token = authHeader.replace("Bearer ", "");
        String userId = jwtUtil.extractUserId(token);

        if(userId == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("유저 정보가 발견되지 않음");
        }
        if(userService.updateUsername(userId, username))
            return ResponseEntity.ok("이름이 변경되었습니다.");
        else
            return ResponseEntity.badRequest().body("이름 변경에 실패했습니다.");
    }

    @PostMapping("/update-email")
    public ResponseEntity<String> updateEmail(@RequestHeader("Authorization") String authHeader, @RequestBody String email) {
        String token = authHeader.replace("Bearer ", "");
        String userId = jwtUtil.extractUserId(token);

        if(userId == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("유저 정보가 발견되지 않음");
        }
        if(userService.updateUserEmail(userId, email)) {
            return ResponseEntity.ok("이메일이 변경되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("이메일 변경에 실패했습니다.");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String userId = jwtUtil.extractUserId(token);

        if(userId == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("유저 정보가 발견되지 않음");
        }
        if(userService.deleteUser(userId)) {
            return ResponseEntity.ok("회원 탈퇴 완료");
        } else {
            return ResponseEntity.badRequest().body("회원 탈퇴 실패");
        }
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
    // ResponseEntity<?> 어떤 타입이든 반환할 수 있음을 의미
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
       //1. Authorization 헤더가 null이거나 "Bearer "로 시작히지 않으면 잘못된 요청으로 간주
       if (authHeader ==null || !authHeader.startsWith("Bearer ")) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                   .body("Authorization 헤더가 유효하지 않습니다.");
       }
       //2."Bearer" 접두사를 제거하고 실제 JWT 토큰만 추출
        String token= authHeader.replace("Bearer ", "");

       String userId;
       try {
           userId = jwtUtil.extractUserId(token); //사용자 ID 추출
       } catch (Exception e) {
           //4. 토큰 파싱 중 오류 발생 시 401 Unauthorized 반환
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                   .body("토큰이 유효하지 않거나 파싱 중 오류가 발생했습니다.");
       }
       //5. 추출한 userId가 null인 경우
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("토큰에서 사용자 정보를 추출할 수 없습니다.");
        }
        // 6.유효한 userId를 기반으로 사용자 정보 조회
        UserDto userDto =userService.getUserInfoById(userId); //사용자 정보 가져오기
        return ResponseEntity.ok(userDto);
    }
}
