package auca.ac.rw.com.banking_app.Repository;

import auca.ac.rw.com.banking_app.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // You can add custom finders here if needed, but standard CRUD is enough for now.
}