package parkup.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parkup.data.PriceAndTime;
import parkup.data.Tablicka;
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

    @GetMapping({"/parkingSession"})
    public List<ParkingSession> getAllParkingSessions() {
        return parkingSessionService.getAllParkingSessions();
    }

    @GetMapping({"/parkingSession/{parkingSessionId}"})
    public ParkingSession getParkingSession(@PathVariable int parkingSessionId) {
        ParkingSession parkingSession = parkingSessionService.findById(parkingSessionId);
        if (parkingSession != null) {
            return parkingSession;
        } else {
            throw new RuntimeException("ParkingSession not found");
        }
    }

    @PostMapping({"/parkingSession/{parkingZoneId}"})
    public Optional<ParkingSession> startParkingSession(@RequestParam String tablicka, @PathVariable int parkingZoneId) {
        return this.parkingSessionService.startParkingSession(tablicka,parkingZoneId);
    }

// TODO: vidi kako kje funkcionira update na sesija i nejzino plakjanje so frontot

//    @PutMapping({"/parkingSession/{parkingSessionId}"})
//    public void updateParkingSession(@PathVariable int parkingSessionId, @RequestBody ParkingSession parkingSession) {
//        parkingSessionService.updateParkingSession(parkingSessionId,
//                parkingSession.getTimeStart(), parkingSession.getTimeEnd(), parkingSession.getTablica());
//    }
//    @PutMapping({"/parkingSession/pay/{parkingSessionId"})
//    public void payParkingSession(@PathVariable int parkingSessionId){
//        parkingSessionService.paySession
//    }

    @PutMapping("/parkingSession/end/{parkingSessionId}")
    public ParkingSession endParkingSession(@PathVariable int regParkId){
        return this.parkingSessionService.endParkingSession(regParkId);
    }

    @PutMapping("/parkingSession/verify/{parkingSessionId}")
    public ParkingSession verifyParkingSession(@PathVariable int parkingSessionId,@RequestParam String parkingSpaceName,@RequestParam int parkingZoneId){
        return this.parkingSessionService.verifyParkingSession(parkingSessionId,parkingSpaceName,parkingZoneId);
    }

//    @GetMapping("/parkingSession/calculate/{parkingSessionId}")
//    public int calculateParkingSession(@PathVariable int parkingSessionId){
//        return this.parkingSessionService.calculatePayment(parkingSessionId);
//    }
    //soodvetno smeneta da prima id od registriran parkirac i od nego da se dobie sesija
    //plus namesto da vrakja samo cena vo int, vrakja objekt sto sodrzi cena i vkupno vremetraenje vo minuti
    @GetMapping("/parkingSession/calculate/{parkingSessionId}")
    public PriceAndTime calculateParkingSession(@PathVariable int regParkId){
        return this.parkingSessionService.calculatePayment(regParkId);
    }

    @PutMapping("/parkingSession/pay/{parkingSessionId}")
    public boolean payParkingSession(@PathVariable int regParkId,@RequestParam String expireDate){
        return this.parkingSessionService.payParkingSession(regParkId,expireDate);
    }

    @DeleteMapping({"/parkingSession/{parkingSessionId}"})
    public Optional<ParkingSession> deleteParkingSession(@PathVariable int parkingSessionId) {
        return this.parkingSessionService.deleteParkingSession(parkingSessionId);
    }
}