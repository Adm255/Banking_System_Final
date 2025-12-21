package auca.ac.rw.com.banking_app.controller;

import auca.ac.rw.com.banking_app.dto.DashboardResponse;
import auca.ac.rw.com.banking_app.model.Account;
import auca.ac.rw.com.banking_app.Repository.AccountRepository;
import auca.ac.rw.com.banking_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboardData() {
        long totalUsers = userRepository.count();
        long totalAccounts = accountRepository.count();

        // Calculate total money in the bank
        List<Account> accounts = accountRepository.findAll();
        double totalBalance = accounts.stream()
                .mapToDouble(Account::getBalance) // Assuming balance is Double
                .sum();

        return ResponseEntity.ok(new DashboardResponse(totalUsers, totalAccounts, totalBalance));
    }
}