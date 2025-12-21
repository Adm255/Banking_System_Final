package auca.ac.rw.com.banking_app.controller;

import auca.ac.rw.com.banking_app.model.Account;
import auca.ac.rw.com.banking_app.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    // POST http://localhost:8080/api/accounts?userId=1
    @PostMapping
    public ResponseEntity<Account> createAccount(@RequestBody Account account, @RequestParam Long userId) {
        Account savedAccount = accountService.createAccount(userId, account);
        return ResponseEntity.ok(savedAccount);
    }

    // GET http://localhost:8080/api/accounts/user/1
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Account>> getUserAccounts(@PathVariable Long userId) {
        return ResponseEntity.ok(accountService.getUserAccounts(userId));
    }
}