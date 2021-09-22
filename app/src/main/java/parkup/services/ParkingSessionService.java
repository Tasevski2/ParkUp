package parkup.services;

import org.springframework.stereotype.Service;

import parkup.repositories.ParkingSessionRepository;

@Service
public class ParkingSessionService {
    
    private ParkingSessionRepository parkingSessionRepository;

    public ParkingSessionService(ParkingSessionRepository parkingSessionRepository) {
        this.parkingSessionRepository = parkingSessionRepository;
    }
    
}
