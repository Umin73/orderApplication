package com.study.orderApplication.service;

import com.study.orderApplication.config.PasswordConfig;
import com.study.orderApplication.entity.Users;
import com.study.orderApplication.repository.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UsersRepository usersRepository;
    @Autowired
    private final PasswordConfig passwordConfig;

    public void signup(Users users) {
        log.info("signup user: " + users.getUserId());
        users.setUserPw(passwordConfig.passwordEncoder().encode(users.getUserPw()));
        usersRepository.save(users);
    }

    public boolean authenticate(String userId, String password) {
        Optional<Users> optionalUser = usersRepository.findByUserId(userId);
        if(optionalUser.isEmpty()) {
            return false;
        }
        Users user = optionalUser.get();
        return passwordConfig.passwordEncoder().matches(password, user.getUserPw());
    }

    public Users getLoginUserByUserId(String userId) {
        if(userId == null) return null;
        Optional<Users> optionalUser = usersRepository.findByUserId(userId);
        return optionalUser.orElse(null);
    }

    public Users findByUserId(String userId) {
        return usersRepository.findByUserId(userId).orElse(null);
    }

    public boolean checkUserIdDuplicate(String userId) {
        return usersRepository.existsByUserId(userId);
    }
}
