package auca.ac.rw.com.banking_app.dto;

import lombok.Data;

@Data
public class VerifyRequest {
    private String email;
    private String code;
}