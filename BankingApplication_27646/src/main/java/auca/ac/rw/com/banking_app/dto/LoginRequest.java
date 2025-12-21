package auca.ac.rw.com.banking_app.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}