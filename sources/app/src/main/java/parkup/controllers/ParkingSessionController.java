package parkup.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parkup.entities.ParkingSession;
import parkup.services.ParkingSessionService;

import java.util.List;
import java.util.Optional;

@RestController
public class ParkingSessionController {
    private final ParkingSessionService parkingSessionService;

    @Autowired
    public ParkingSessionController(ParkingSessionService parkingSessionService) {
        this.parkingSessionService = parkingSessionService;
    }

    @GetMapping({"/parkingSession/{parkingZoneId}"})
    public List<ParkingSession> getAllParkingSessions(@PathVariable Integer parkingZoneId) {
        return parkingSessionService.getAllParkingSessionsFromZone(parkingZoneId);
    }
    @GetMapping({"/parkingSession"})
    public ParkingSession getParkingSession(){
        return parkingSessionService.getParkingSession();
    }

    @PostMapping({"/parkingSession/{parkingZoneName}"})
    public Optional<ParkingSession> startParkingSession(@RequestParam String tablicka, @PathVariable String parkingZoneName) {
        return this.parkingSessionService.startParkingSession(tablicka,parkingZoneName);
    }

    @PutMapping("/parkingSession/end")
    public ParkingSession endParkingSession(){
        return this.parkingSessionService.endParkingSession();
    }
    @PutMapping("/parkingSession/verify/{parkingSessionId}")
    public ParkingSession verifyParkingSession(@PathVariable int parkingSessionId,@RequestParam String parkingSpaceName){
        return this.parkingSessionService.verifyParkingSession(parkingSessionId,parkingSpaceName);
    }
    @GetMapping("/parkingSession/end/calculate")
    public int calculateParkingSession(){
        return this.parkingSessionService.calculatePayment();
    }
    @PutMapping("/parkingSession/pay")
    public boolean payParkingSession(@RequestParam(required = false) String expireDate){
        return this.parkingSessionService.payParkingSession(expireDate);
    }

    @DeleteMapping({"/parkingSession/{parkingSessionId}"})
    public Optional<ParkingSession> deleteParkingSession(@PathVariable int parkingSessionId) {
        return this.parkingSessionService.deleteParkingSession(parkingSessionId);
    }
}