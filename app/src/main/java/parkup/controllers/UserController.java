package parkup.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parkup.entities.User;
import parkup.services.UserService;

import java.util.List;
import java.util.UUID;

@RestController
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public List<User> getAllUsers(){
        return userService.getUsers();
    }

    @GetMapping("/user/{userId}")
    public User getUser(@PathVariable UUID userId) {
        User user = userService.findById(userId);

        if(user != null)
            return user;

        throw new RuntimeException("User not found");
    }

    @PostMapping("/user")
    public void addUser(@RequestBody User user) {
        userService.addUser(user);
    }

    @PutMapping("/user/{userId}")
    public void updateUser(@PathVariable UUID userId, @RequestBody User user) {
        userService.updateUser(userId, user);
    }

    @DeleteMapping("/user/{userId}")
    public void deleteUser(@PathVariable UUID userId, @RequestBody User user) {
        userService.deleteUser(userId);
    }
}
