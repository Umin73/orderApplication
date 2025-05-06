package com.study.orderApplication.service;

import com.study.orderApplication.config.PasswordConfig;
import com.study.orderApplication.dto.ChangePwDto;
import com.study.orderApplication.entity.Users;
import com.study.orderApplication.repository.AdminRepository;
import com.study.orderApplication.repository.UsersRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
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
    @Autowired
    private final AdminRepository adminRepository;
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

    public Users findByUserEmail(String userEmail) {
        return usersRepository.findByEmail(userEmail).orElse(null);
    }

    public boolean checkUserIdDuplicate(String userId) {
        return usersRepository.existsByUserId(userId);
    }

    //회원 전체 조회 메소드 추가
    public Page<Users> getAllUsers(int page, int size) {
        Pageable pageable= PageRequest.of(page,size);
        log.info("findAll : {}", adminRepository.findAll(pageable));
            return adminRepository.findAll(pageable);

    }


    public boolean checkUserEmailExists(String email) {
        log.info("userRepository.existsByEmail is {}", usersRepository.existsByEmail(email));
        return usersRepository.existsByEmail(email);
    }

    public boolean checkUserIdExists(String userId) {
        return usersRepository.existsByUserId(userId);
    }

    public boolean updateUserPassword(ChangePwDto changePwDto) {
        Optional<Users> optionalUser = usersRepository.findByUserId(changePwDto.getUserId());

        if(optionalUser.isPresent()) {
            Users user = optionalUser.get();
            String encodedPw = passwordConfig.passwordEncoder().encode(changePwDto.getNewPw());

            user.setUserPw(encodedPw);
            usersRepository.save(user);

            return true;
        } else {
            return false;
        }
    }

    public boolean updateUsername(String userId, String newUsername) {
        Optional<Users> optionalUser = usersRepository.findByUserId(userId);

        if(optionalUser.isPresent()) {
            Users user = optionalUser.get();
            user.setUsername(newUsername);
            usersRepository.save(user);

            return true;
        } else {
            return false;
        }
    }

    public boolean updateUserEmail(String userId, String newEmail) {
        Optional<Users> optionalUser = usersRepository.findByUserId(userId);
        if(optionalUser.isPresent()) {
            Users user = optionalUser.get();
            user.setEmail(newEmail);
            usersRepository.save(user);

            return true;
        } else {
            return false;
        }
    }

    public boolean deleteUser(String userId) {
        Optional<Users> optionalUser = usersRepository.findByUserId(userId);
        if(optionalUser.isPresent()) {
            Users user = optionalUser.get();
            usersRepository.delete(user);
            return true;
        }else {
            return false;
        }
    }
}
