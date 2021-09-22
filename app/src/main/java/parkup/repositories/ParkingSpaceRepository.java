package parkup.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import parkup.entities.ParkingSpace;

import java.util.UUID;

public interface ParkingSpaceRepository extends JpaRepository<ParkingSpace, UUID>{
    
}
