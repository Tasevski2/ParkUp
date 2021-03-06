package parkup.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parkup.data.ParkingZoneAdminView;
import parkup.entities.ParkingZone;
import parkup.services.ParkingZoneService;

import java.util.List;
import java.util.Optional;

@RestController
public class ParkingZoneController {
    private final ParkingZoneService parkingZoneService;

    @Autowired
    public ParkingZoneController(ParkingZoneService parkingZoneService) {
        this.parkingZoneService = parkingZoneService;
    }

    @GetMapping({"/parkingZone"})
    public List<ParkingZone> getAllParkingZone() {
        return parkingZoneService.getAllParkingZones();
    }

    @GetMapping({"/parkingZone/{parkingZoneId}"})
    public ParkingZoneAdminView getParkingZone(@PathVariable int parkingZoneId) {
        ParkingZoneAdminView parkingZone = parkingZoneService.findById(parkingZoneId);
        if (parkingZone != null) {
            return parkingZone;
        } else {
            throw new RuntimeException("ParkingZone not found");
        }
    }

    @GetMapping({"/parkingZone/name/{parkingZoneName}"})
    public ParkingZone getParkingZone(@PathVariable String parkingZoneName){
        return parkingZoneService.getParkingZoneByName(parkingZoneName);
    }

    @GetMapping({"parkingZone/parkingZoneNames"})
    public List<String> getParkingZoneNames(){
        return this.parkingZoneService.getAllParkingZoneNames();
    }

    @PostMapping({"/parkingZone"})
    public Optional<ParkingZone> addParkingZone(@RequestBody ParkingZone parkingZone) {
        return this.parkingZoneService.addParkingZone(parkingZone);
    }

    @PostMapping("/parkingZoneName")
    public ParkingZone addParkingZoneName(@RequestBody String name){
        return this.parkingZoneService.addParkingZoneNameOnly(name);
    }

    @PutMapping({"/parkingZone/{parkingZoneId}"})
    public ParkingZoneAdminView updateParkingZone(@PathVariable int parkingZoneId, @RequestBody ParkingZoneAdminView parkingZone) {
        return this.parkingZoneService.updateParkingZone(parkingZoneId, parkingZone.getPzName(), parkingZone.getPrice(),
                parkingZone.getAddress(), parkingZone.getFrom(), parkingZone.getTo(), parkingZone.getColor(),
                parkingZone.getParkingSpaces(), parkingZone.getParkingZoneLocation(),parkingZone.getResponsibleWorkers());
    }

    @DeleteMapping({"/parkingZone/{parkingZoneId}"})
    public Optional<ParkingZone> deleteParkingZone(@PathVariable int parkingZoneId) {
        return this.parkingZoneService.deleteParkingZone(parkingZoneId);
    }
}