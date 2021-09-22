package parkup.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import parkup.services.VrabotenService;

@RestController
public class VrabotenController {

    private final VrabotenService vrabotenService;

    @Autowired
    public VrabotenController(VrabotenService vrabotenService) {
        this.vrabotenService = vrabotenService;
    }
}
