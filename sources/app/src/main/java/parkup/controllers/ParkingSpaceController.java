package parkup.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parkup.entities.ParkingSpace;
import parkup.services.ParkingSpaceService;

import java.util.List;
import java.util.Optional;

@RestController
public class ParkingSpaceController {
    private final ParkingSpaceService parkingSpaceService;

    @Autowired
    public ParkingSpaceController(ParkingSpaceService parkingSpaceService) {
        this.parkingSpaceService = parkingSpaceService;
    }

    @GetMapping({"/parkingSpace"})
    public List<ParkingSpace> getAllParkingSpaces() {
        return parkingSpaceService.getAllParkingSpaces();
    }

    @GetMapping({"/parkingSpace/{parkingSpaceId}"})
    public ParkingSpace getParkingSpace(@PathVariable int parkingSpaceId) {
        ParkingSpace parkingSpace = parkingSpaceService.findById(parkingSpaceId);
        if (parkingSpace != null) {
            return parkingSpace;
        } else {
            throw new RuntimeException("ParkingSpace not found");
        }
    }

    @PostMapping({"/parkingSpace/add/{parkingZoneId}"})
    public Optional<ParkingSpace> addParkingSpace(@RequestBody ParkingSpace parkingSpace,@PathVariable int parkingZoneId) {
        return this.parkingSpaceService.addParkingSpace(parkingSpace,parkingZoneId);
    }

    @PutMapping({"/parkingSpace/{parkingSpaceId}"})
    public void updateParkingSpace(@PathVariable int parkingSpaceId, @RequestBody ParkingSpace parkingSpace) {
        parkingSpaceService.updateParkingSpace(parkingSpaceId, parkingSpace.getPsName(), parkingSpace.isTaken(), parkingSpace.getLat(), parkingSpace.getLng());
    }

    @DeleteMapping({"/parkingSpace/{parkingSpaceId}"})
    public Optional<ParkingSpace> deleteParkingSpace(@PathVariable int parkingSpaceId) {
        return this.parkingSpaceService.deleteParkingSpace(parkingSpaceId);
    }
}
