package auca.ac.rw.com.banking_app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users") // "user" is a reserved keyword in Postgres, so we must use "users"
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String email;
    private String password;

    // LINK TO LOCATION (User lives in a specific Village)
    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    // REQUIREMENT: One-to-Many (One User -> Many Accounts)
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Account> accounts;

    // REQUIREMENT: Many-to-Many (One User -> Many Notifications)
    @ManyToMany
    @JoinTable(
            name = "user_notifications",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "notification_id")
    )
    private List<Notification> notifications;

    // ... inside User class ...

    @Enumerated(EnumType.STRING)
    private ERole role;

    // For 2FA (Two Factor Authentication)
    private String twoFactorCode;
    private java.time.LocalDateTime twoFactorExpiry;
}