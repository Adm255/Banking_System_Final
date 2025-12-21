package auca.ac.rw.com.banking_app.controller;

import auca.ac.rw.com.banking_app.dto.AuthResponse;
import auca.ac.rw.com.banking_app.dto.LoginRequest;
import auca.ac.rw.com.banking_app.dto.VerifyRequest;
import auca.ac.rw.com.banking_app.model.User;
import auca.ac.rw.com.banking_app.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;


    @PostMapping("/register") // <--- ENSURE it is PostMapping
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(authService.registerUser(user));
    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }


    @PostMapping("/verify-2fa")
    public ResponseEntity<AuthResponse> verify2fa(@RequestBody VerifyRequest request) {
        return ResponseEntity.ok(authService.verifyCode(request));
    }
}