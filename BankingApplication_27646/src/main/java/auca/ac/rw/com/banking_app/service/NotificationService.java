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

        notification.setUsers(java.util.List.of(user));

        return notificationRepository.save(notification);
    }
}