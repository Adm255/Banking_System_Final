package auca.ac.rw.com.banking_app.Repository;

import auca.ac.rw.com.banking_app.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    // Check if a location exists (to prevent duplicates when seeding data)
    boolean existsByName(String name);

    // Find a location by name (useful for linking users)
    Location findByName(String name);
}