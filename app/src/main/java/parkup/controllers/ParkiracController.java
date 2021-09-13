package parkup.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parkup.entities.Parkirac;
import parkup.services.ParkiracServiceImpl;

import java.util.HashMap;
import java.util.List;

@RestController
public class ParkiracController {
    
    private ParkiracServiceImpl parkiracService;
}
