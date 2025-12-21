package auca.ac.rw.com.banking_app.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    // We don't need JavaMailSender for the mock version
    // @Autowired
    // private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body) {
        // SIMULATE SENDING EMAIL
        System.out.println("==================================================");
        System.out.println(" [MOCK EMAIL SERVICE] ");
        System.out.println(" TO: " + to);
        System.out.println(" SUBJECT: " + subject);
        System.out.println(" BODY: " + body);
        System.out.println("==================================================");

        // In the real version, you would uncomment this:
        // SimpleMailMessage message = new SimpleMailMessage();
        // ... set properties ...
        // mailSender.send(message);
    }
}