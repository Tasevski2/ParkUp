package parkup.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import parkup.data.Plate;

public interface PlateRepository extends JpaRepository<Plate,Integer> {
    Plate findByPlate(String plate);
}
