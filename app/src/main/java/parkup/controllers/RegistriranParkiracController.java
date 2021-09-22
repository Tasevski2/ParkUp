package parkup.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import parkup.services.RegistriranParkiracService;

@RestController
public class RegistriranParkiracController {

    private RegistriranParkiracService registriranParkiracService;

    @Autowired
    public RegistriranParkiracController(RegistriranParkiracService registriranParkiracService){
        this.registriranParkiracService = registriranParkiracService;
    }
}
