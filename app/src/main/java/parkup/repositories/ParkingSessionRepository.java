package parkup.repositories;
import parkup.entities.ParkingSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingSessionRepository extends JpaRepository<ParkingSession, Integer>{
    
}
