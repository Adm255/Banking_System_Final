package auca.ac.rw.com.banking_app.service;

import auca.ac.rw.com.banking_app.model.Location;
import auca.ac.rw.com.banking_app.model.User;

// --- PAY ATTENTION HERE: Capital 'R' to match your file ---
import auca.ac.rw.com.banking_app.Repository.LocationRepository;
// ----------------------------------------------------------

import auca.ac.rw.com.banking_app.repository.UserRepository; // Check if this folder is 'Repository' or 'repository' too!
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LocationRepository locationRepository;

    // 1. Create User
    public User createUser(User user, Long locationId) {
        // This findById was red because the import above was wrong.
        // It should work now.
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new RuntimeException("Location not found"));

        user.setLocation(location);
        return userRepository.save(user);
    }

    // 2. Get Users by Province
    public List<User> getUsersByProvince(String provinceName) {
        return userRepository.findUsersByProvinceName(provinceName);
    }

    // 3. Get All Users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 4. Search Users
    public Page<User> searchUsers(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.searchUsers(keyword, pageable);
    }

    // 5. Delete User
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // 6. Update User
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (userDetails.getFirstName() != null) user.setFirstName(userDetails.getFirstName());
        if (userDetails.getLastName() != null) user.setLastName(userDetails.getLastName());
        if (userDetails.getEmail() != null) user.setEmail(userDetails.getEmail());
        if (userDetails.getRole() != null) user.setRole(userDetails.getRole());

        // --- NEW: UPDATE LOCATION ---
        if (userDetails.getLocation() != null && userDetails.getLocation().getId() != null) {
            Location loc = locationRepository.findById(userDetails.getLocation().getId()).orElse(null);
            if (loc != null) {
                user.setLocation(loc);
            }
        }
        // -----------------------------

        return userRepository.save(user);
    }

    // 7. GET ONE USER
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // 8. Count Users
    public long countUsers() {
        return userRepository.count();
    }
}