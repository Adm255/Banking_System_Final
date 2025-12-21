package auca.ac.rw.com.banking_app.controller;

import auca.ac.rw.com.banking_app.model.User;
import auca.ac.rw.com.banking_app.repository.UserRepository;
import auca.ac.rw.com.banking_app.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Random;

@RestController
@RequestMapping("/api/auth")
public class PasswordResetController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found.");
        }

        String code = String.valueOf(new Random().nextInt(900000) + 100000);

        user.setTwoFactorCode(code);
        user.setTwoFactorExpiry(LocalDateTime.now().plusMinutes(15));
        userRepository.save(user);


        emailService.sendEmail(email, "Password Reset Code", "Your code is: " + code);

        return ResponseEntity.ok("Reset code sent to email.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String email,
                                                @RequestParam String code,
                                                @RequestParam String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user == null) return ResponseEntity.badRequest().body("User not found.");

        if (user.getTwoFactorCode() == null || !user.getTwoFactorCode().equals(code)) {
            return ResponseEntity.badRequest().body("Invalid Code.");
        }
        if (user.getTwoFactorExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body("Code Expired.");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setTwoFactorCode(null);
        userRepository.save(user);

        return ResponseEntity.ok("Password updated successfully.");
    }
}