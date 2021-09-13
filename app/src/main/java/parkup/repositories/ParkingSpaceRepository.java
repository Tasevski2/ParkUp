package parkup.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import parkup.entities.ParkingSpace;

public interface ParkingSpaceRepository extends JpaRepository<ParkingSpace, Integer>{
    
}
