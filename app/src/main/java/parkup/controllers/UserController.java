package parkup.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parkup.entities.User;
import parkup.services.UserServiceImpl;

import java.util.HashMap;
import java.util.List;

@RestController
public class UserController {
    private UserServiceImpl userService;

    @Autowired
    public UserController(UserServiceImpl userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getUsers();
    }

    @GetMapping("/user/{userId}")
    public User getUser(@PathVariable int userId) {
        User user = userService.findById(userId);

        if(user != null)
            return user;

        throw new RuntimeException("User not found");
    }

    @PostMapping("/user")
    public void addUser(@RequestBody User user) {
        user.setId(0);
        userService.saveUser(user);
    }

    @PutMapping("/user")
    public void updateUser(@PathVariable int userId, @RequestBody User user) {
        user.setId(0);
        userService.updateUser(userId, user);
    }

    @DeleteMapping("/user")
    public void deleteUser(@RequestBody User user) {
        user.setId(0);
        userService.saveUser(user);
    }
}
