package parkup.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import parkup.entities.ParkingSpace;
import parkup.entities.ParkingZone;

import java.util.List;

@Repository
public interface ParkingZoneRepository extends JpaRepository<ParkingZone, Integer> {
    ParkingZone findByPzId(int id);

    ParkingZone findByPzName(String name);
    void deleteByPzId(int id);
}