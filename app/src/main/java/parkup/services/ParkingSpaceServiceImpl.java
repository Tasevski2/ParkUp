package parkup.services;

import org.springframework.beans.factory.annotation.Autowired;

import parkup.repositories.ParkingZoneRepository;

public class ParkingSpaceServiceImpl implements ParkingSpaceService{
    
    private ParkingZoneRepository parkingZoneRepository;

    @Autowired
    public ParkingSpaceServiceImpl(ParkingZoneRepository parkingZoneRepository) {
        this.parkingZoneRepository = parkingZoneRepository;
    }
}
