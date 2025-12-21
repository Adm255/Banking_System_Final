package auca.ac.rw.com.banking_app.Repository;

import auca.ac.rw.com.banking_app.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    boolean existsByName(String name);

    Location findByName(String name);
}