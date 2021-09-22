package parkup.services;

import org.springframework.stereotype.Service;

import parkup.repositories.ParkingZoneRepository;

@Service
public class ParkingZoneService {
    
    private ParkingZoneRepository parkingZoneRepository;

    public ParkingZoneService(ParkingZoneRepository parkingZoneRepository) {
        this.parkingZoneRepository = parkingZoneRepository;
    }

}
