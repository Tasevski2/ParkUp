package parkup.controllers;

import org.springframework.web.bind.annotation.RestController;

import parkup.services.ParkingSpaceServiceImpl;
import parkup.entities.ParkingSpace;

@RestController
public class ParkingSpaceController {
    
    private ParkingSpaceServiceImpl parkingSpaceService;
}
