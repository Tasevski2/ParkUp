package parkup.controllers;

import org.springframework.web.bind.annotation.RestController;

import parkup.services.ParkingSessionService;

@RestController
public class ParkingSessionController {

    private ParkingSessionService parkingSessionServiceImpl;
}
