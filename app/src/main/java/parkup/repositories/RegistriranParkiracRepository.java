package parkup.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import parkup.entities.RegistriranParkirac;

import java.util.UUID;

public interface RegistriranParkiracRepository extends JpaRepository<RegistriranParkirac, UUID> {
}
