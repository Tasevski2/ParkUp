package parkup.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import parkup.entities.Parkirac;

import java.util.UUID;

public interface ParkiracRepository extends JpaRepository<Parkirac, UUID> {

}