package auca.ac.rw.com.banking_app.controller;

import auca.ac.rw.com.banking_app.model.Card;
import auca.ac.rw.com.banking_app.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    @Autowired
    private CardService cardService;

    // POST http://localhost:3000/api/cards?accountId=1
    @PostMapping
    public ResponseEntity<Card> createCard(@RequestBody Card card, @RequestParam Long accountId) {
        return ResponseEntity.ok(cardService.createCard(accountId, card));
    }
}