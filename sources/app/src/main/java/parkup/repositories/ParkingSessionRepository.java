package parkup.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import parkup.entities.ParkingSession;

import java.util.List;

public interface ParkingSessionRepository extends JpaRepository<ParkingSession, Integer> {

    ParkingSession findByPssId(int parkingSessionId);
    List<ParkingSession> findByParkingZonePzName(String pzName);
    void deleteByPssId(int parkingSessionId);
}