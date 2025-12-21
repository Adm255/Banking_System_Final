package auca.ac.rw.com.banking_app.controller;

import auca.ac.rw.com.banking_app.model.Notification;
import auca.ac.rw.com.banking_app.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public ResponseEntity<Notification> sendNotification(@RequestParam Long userId, @RequestBody String message) {
        return ResponseEntity.ok(notificationService.createNotification(userId, message));
    }
}