package parkup.controllers;

import org.springframework.web.bind.annotation.RestController;

import parkup.services.ParkingSessionServiceImpl;

@RestController
public class ParkingSessionController {

    private ParkingSessionServiceImpl parkingSessionServiceImpl;
}
