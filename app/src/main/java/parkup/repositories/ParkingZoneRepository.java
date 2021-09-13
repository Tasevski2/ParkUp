package parkup.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import parkup.entities.ParkingZone;

public interface ParkingZoneRepository extends JpaRepository<ParkingZone, Integer>{
    
}
