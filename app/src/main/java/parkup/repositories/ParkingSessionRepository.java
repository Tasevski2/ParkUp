package parkup.repositories;
import parkup.entities.ParkingSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ParkingSessionRepository extends JpaRepository<ParkingSession, UUID>{
    
}
