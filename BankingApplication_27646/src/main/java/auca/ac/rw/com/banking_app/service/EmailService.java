package auca.ac.rw.com.banking_app.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void sendEmail(String to, String subject, String body) {
        System.out.println("==================================================");
        System.out.println(" [MOCK EMAIL SERVICE] ");
        System.out.println(" TO: " + to);
        System.out.println(" SUBJECT: " + subject);
        System.out.println(" BODY: " + body);
        System.out.println("==================================================");

    }
}