package parkup.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parkup.entities.ProbaUser;
import parkup.services.ProbaServiceImpl;

import java.util.HashMap;

@RestController
public class ProbaController {
    private ProbaServiceImpl probaService;

    @Autowired
    public ProbaController(ProbaServiceImpl probaService) {
        this.probaService = probaService;
    }

    @GetMapping("/user/{userId}")
    public ProbaUser getUser(@PathVariable int userId) {
        ProbaUser user = probaService.findById(userId);

        if(user != null)
            return user;

        throw new RuntimeException("User not found");
    }

    @PostMapping("/user/create")
    public void addUser(@RequestBody ProbaUser user) {
        user.setId(0);
        probaService.saveUser(user);
    }
}
