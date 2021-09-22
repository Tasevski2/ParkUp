package parkup.services;

import org.springframework.beans.factory.annotation.Autowired;

import parkup.repositories.ParkingZoneRepository;

public class ParkingSpaceService {
    
    private ParkingZoneRepository parkingZoneRepository;

    @Autowired
    public ParkingSpaceService(ParkingZoneRepository parkingZoneRepository) {
        this.parkingZoneRepository = parkingZoneRepository;
    }
}
