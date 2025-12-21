package auca.ac.rw.com.banking_app.controller;

import auca.ac.rw.com.banking_app.model.User;
import auca.ac.rw.com.banking_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // POST Create User
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user, @RequestParam Long locationId) {
        User savedUser = userService.createUser(user, locationId);
        return ResponseEntity.ok(savedUser);
    }

    // GET By Province (Midterm Requirement)
    @GetMapping("/by-province")
    public ResponseEntity<List<User>> getUsersByProvince(@RequestParam String name) {
        List<User> users = userService.getUsersByProvince(name);
        return ResponseEntity.ok(users);
    }

    // GET All Users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // DELETE User
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }

    // PUT Update User
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    // GET One User (The fix is here: we use userService now)
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    // GET Global Search
    @GetMapping("/search")
    public ResponseEntity<Page<User>> searchUsers(
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return ResponseEntity.ok(userService.searchUsers(keyword, page, size));
    }
}