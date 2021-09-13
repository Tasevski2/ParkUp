package parkup.services;

import org.springframework.stereotype.Service;

import parkup.repositories.ParkingSessionRepository;

@Service
public class ParkingSessionServiceImpl implements ParkingSessionService{
    
    private ParkingSessionRepository parkingSessionRepository;

    public ParkingSessionServiceImpl(ParkingSessionRepository parkingSessionRepository) {
        this.parkingSessionRepository = parkingSessionRepository;
    }
    
}
