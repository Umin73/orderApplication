package com.study.orderApplication.controller;

import com.study.orderApplication.entity.Users;
import com.study.orderApplication.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Users users) {
        log.info("signup user: {}", users);
        userService.signup(users);
        return ResponseEntity.ok("회원가입 완료");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Users users) {
        if(userService.authenticate(users.getUserId(), users.getUserPw())) {
            return new ResponseEntity<>("Login successful", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Login failed", HttpStatus.UNAUTHORIZED);
        }
    }
    @GetMapping("/list")
    public ResponseEntity<List<Users>> getAllUsers(){
        List<Users> users=userService.getAllUsers();
        log.info("get all users: {}",users);
        return ResponseEntity.ok(users);
    }

}
