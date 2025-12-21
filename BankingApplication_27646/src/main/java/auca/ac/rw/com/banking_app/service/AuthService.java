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
        // Default role is USER if none provided
        if (user.getRole() == null) user.setRole(ERole.USER);
        return userRepository.save(user);
    }

    // STEP 1: Login with Password -> Generates 2FA Code
    public String login(LoginRequest request) {
        // 1. Check Password
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
        } catch (Exception e) {
            throw new RuntimeException("Invalid Login Credentials");
        }

        // 2. Load User
        User user = userRepository.findByEmail(request.getEmail());

        // 3. Generate 6-digit Code
        String code = String.valueOf(new Random().nextInt(900000) + 100000);

        // 4. Save to DB
        user.setTwoFactorCode(code);
        user.setTwoFactorExpiry(LocalDateTime.now().plusMinutes(5)); // Code valid for 5 mins
        userRepository.save(user);

        // 5. Send Email (Mock or Real)
        emailService.sendEmail(user.getEmail(), "2FA Login Code", "Your login code is: " + code);

        return "2FA Code sent to email: " + user.getEmail();
    }

    // STEP 2: Verify Code -> Generates Token & Returns Role
    public AuthResponse verifyCode(VerifyRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) throw new RuntimeException("User not found");

        // Check Code
        if (user.getTwoFactorCode() == null || !user.getTwoFactorCode().equals(request.getCode())) {
            throw new RuntimeException("Invalid 2FA Code");
        }

        // Check Expiry
        if (user.getTwoFactorExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Code Expired");
        }

        // If Valid: Clear code
        user.setTwoFactorCode(null);
        userRepository.save(user);

        // Generate Token
        String token = jwtUtils.generateToken(new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                java.util.Collections.emptyList()
        ));

        // --- NEW CHANGE HERE ---
        // Return BOTH the Token AND the Role
        return new AuthResponse(token, user.getRole().name(), user.getId());
    }
}