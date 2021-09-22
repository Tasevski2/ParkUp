package parkup.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import parkup.entities.Vraboten;

import java.util.UUID;

public interface VrabotenRepository extends JpaRepository<Vraboten, UUID> {

}
