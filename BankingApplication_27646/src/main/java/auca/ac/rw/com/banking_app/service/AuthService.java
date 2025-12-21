package auca.ac.rw.com.banking_app.service;

import auca.ac.rw.com.banking_app.dto.AuthResponse;
import auca.ac.rw.com.banking_app.dto.LoginRequest;
import auca.ac.rw.com.banking_app.dto.VerifyRequest;
import auca.ac.rw.com.banking_app.model.ERole;
import auca.ac.rw.com.banking_app.model.User;
import auca.ac.rw.com.banking_app.repository.UserRepository;
import auca.ac.rw.com.banking_app.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private EmailService emailService;

    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already exists!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null) user.setRole(ERole.USER);
        return userRepository.save(user);
    }

    public String login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception e) {
            throw new RuntimeException("Invalid Login Credentials");
        }

        User user = userRepository.findByEmail(request.getEmail());

        String code = String.valueOf(new Random().nextInt(900000) + 100000);

        user.setTwoFactorCode(code);
        user.setTwoFactorExpiry(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        emailService.sendEmail(user.getEmail(), "2FA Login Code", "Your login code is: " + code);

        return "2FA Code sent to email: " + user.getEmail();
    }


    public AuthResponse verifyCode(VerifyRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) throw new RuntimeException("User not found");

        if (user.getTwoFactorCode() == null || !user.getTwoFactorCode().equals(request.getCode())) {
            throw new RuntimeException("Invalid 2FA Code");
        }

        if (user.getTwoFactorExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Code Expired");
        }

        user.setTwoFactorCode(null);
        userRepository.save(user);

        String token = jwtUtils.generateToken(new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                java.util.Collections.emptyList()
        ));

        return new AuthResponse(token, user.getRole().name(), user.getId());
    }
}