package auca.ac.rw.com.banking_app.Repository;

import auca.ac.rw.com.banking_app.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    // Find all accounts belonging to a specific user
    List<Account> findByUserId(Long userId);
}