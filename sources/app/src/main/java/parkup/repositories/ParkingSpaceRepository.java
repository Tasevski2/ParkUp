package parkup.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import parkup.entities.ParkingSpace;

import java.util.List;

public interface ParkingSpaceRepository extends JpaRepository<ParkingSpace, Integer> {
    ParkingSpace findByPsName(String psName);
    ParkingSpace findByPsId(int parkingSpaceId);
    void deleteByPsId(int parkingSpaceId);
    void deleteAllByPsName(String name);
}
