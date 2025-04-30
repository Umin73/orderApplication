package com.study.orderApplication.service;

import com.study.orderApplication.dto.EmailCodeDto;
import com.study.orderApplication.dto.MailDto;
import com.study.orderApplication.entity.AuthCode;
import com.study.orderApplication.repository.AuthCodeRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
@Slf4j
@Service
@RequiredArgsConstructor
public class MailService {

    @Value("${spring.mail.username}")
    private String senderEmail;
    private static String authCode;
    private final JavaMailSender javaMailSender;
    private final AuthCodeRepository authCodeRepository;

    public static void createAuthCode() {
        authCode = UUID.randomUUID().toString().substring(0, 6);
    }

    public MimeMessage createFindIdMail(String email) {

        createAuthCode();

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            mimeMessage.setFrom(senderEmail);
            mimeMessage.setRecipients(MimeMessage.RecipientType.TO, email);
            mimeMessage.setSubject("[STARBUCKS] 이메일 인증");

            String body = "";
            body += "<h3>" + "요청하신 인증 번호입니다." + "</h3>";
            body += "<h1>" + authCode + "</h1>";
            body += "<h3>" + "감사합니다." + "</h3>";

            mimeMessage.setText(body,"UTF-8", "html");

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        return mimeMessage;
    }

    public String sendFindIdMail(MailDto mailDto) {
        try {
            MimeMessage message = createFindIdMail(mailDto.getEmail());
            javaMailSender.send(message);

            AuthCode authCodeEntity = new AuthCode();
            authCodeEntity.setEmail(mailDto.getEmail());
            authCodeEntity.setCode(authCode);
            authCodeEntity.setCreatedAt(LocalDateTime.now());

            authCodeRepository.save(authCodeEntity);

            return authCode;

        } catch (MailException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    public boolean verifyCode(EmailCodeDto emailCodeDto) {
        Optional<AuthCode> optionalAuthCode = authCodeRepository.findByEmail(emailCodeDto.getEmail());

        if(optionalAuthCode.isPresent()) {
            AuthCode authCode = optionalAuthCode.get();

            if(authCode.getCreatedAt().isBefore(LocalDateTime.now().minusMinutes(5))) {
                return false; // 인증번호 만료
            }

            if(authCode.getCode().equals(emailCodeDto.getCode())) {
                authCodeRepository.delete(authCode);
                return true;
            }
        }

        return false;
    }
}
