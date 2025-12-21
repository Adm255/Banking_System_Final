package auca.ac.rw.com.banking_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accountNumber;
    private Double balance;
    private String accountType; // SAVINGS or CURRENT

    // Linking back to User (Many Accounts -> One User)
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    // REQUIREMENT: One-to-One (One Account -> One Debit Card)
    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    private Card card;
}