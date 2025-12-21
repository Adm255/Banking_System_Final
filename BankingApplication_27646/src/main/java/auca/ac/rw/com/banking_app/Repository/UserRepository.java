package auca.ac.rw.com.banking_app.repository;

import auca.ac.rw.com.banking_app.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 1. SECURITY: Needed for Login
    User findByEmail(String email);

    // 2. MIDTERM REQUIREMENT (This was missing and causing the error!)
    @Query("SELECT u FROM User u WHERE u.location.parent.parent.parent.parent.name = :provinceName")
    List<User> findUsersByProvinceName(@Param("provinceName") String provinceName);

    // 3. FINAL REQUIREMENT: Global Search
    @Query("SELECT u FROM User u WHERE " +
            "LOWER(u.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(u.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<User> searchUsers(@Param("keyword") String keyword, Pageable pageable);
}