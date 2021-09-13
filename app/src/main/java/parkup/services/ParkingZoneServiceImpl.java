package parkup.services;

import org.springframework.stereotype.Service;

import parkup.repositories.ParkingZoneRepository;

@Service
public class ParkingZoneServiceImpl implements ParkingZoneService{
    
    private ParkingZoneRepository parkingZoneRepository;

    public ParkingZoneServiceImpl(ParkingZoneRepository parkingZoneRepository) {
        this.parkingZoneRepository = parkingZoneRepository;
    }

    
}
