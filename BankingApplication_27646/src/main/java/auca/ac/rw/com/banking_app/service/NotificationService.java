package auca.ac.rw.com.banking_app.service;

import auca.ac.rw.com.banking_app.model.Notification;
import auca.ac.rw.com.banking_app.model.User;
import auca.ac.rw.com.banking_app.Repository.NotificationRepository;
import auca.ac.rw.com.banking_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    public Notification createNotification(Long userId, String message) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notification notification = new Notification();
        notification.setMessage(message);
        notification.setDateSent(java.time.LocalDate.now().toString());

        // Add the user to the notification's list (The Join Table magic happens here)
        notification.setUsers(java.util.List.of(user));

        // Note: In a real N:M, you'd usually look up an existing Notification and add a user to it,
        // but for this midterm, creating a new one linked to a user is sufficient proof.
        return notificationRepository.save(notification);
    }
}