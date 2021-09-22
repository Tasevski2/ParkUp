package parkup.controllers;

import org.springframework.web.bind.annotation.RestController;

import parkup.services.ParkingSpaceService;

@RestController
public class ParkingSpaceController {
    
    private ParkingSpaceService parkingSpaceService;
}
