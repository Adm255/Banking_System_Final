package auca.ac.rw.com.banking_app.service;

import auca.ac.rw.com.banking_app.model.Account;
import auca.ac.rw.com.banking_app.model.User;
import auca.ac.rw.com.banking_app.Repository.AccountRepository;
import auca.ac.rw.com.banking_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    public Account createAccount(Long userId, Account account) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        account.setUser(user);
        return accountRepository.save(account);
    }

    public List<Account> getUserAccounts(Long userId) {
        return accountRepository.findByUserId(userId);
    }
}