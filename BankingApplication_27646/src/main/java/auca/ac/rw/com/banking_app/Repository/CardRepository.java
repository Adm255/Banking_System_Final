package auca.ac.rw.com.banking_app.Repository;

import auca.ac.rw.com.banking_app.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
}