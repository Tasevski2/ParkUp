package parkup.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import parkup.entities.ParkingZone;

import java.util.UUID;

public interface ParkingZoneRepository extends JpaRepository<ParkingZone, UUID>{
    
}
