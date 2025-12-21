package auca.ac.rw.com.banking_app.service;

import auca.ac.rw.com.banking_app.model.Account;
import auca.ac.rw.com.banking_app.model.Card;
import auca.ac.rw.com.banking_app.Repository.AccountRepository;
import auca.ac.rw.com.banking_app.Repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private AccountRepository accountRepository;

    public Card createCard(Long accountId, Card card) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (account.getCard() != null) {
            throw new RuntimeException("This account already has a card! One-to-One relationship violation.");
        }

        card.setAccount(account);
        return cardRepository.save(card);
    }
}