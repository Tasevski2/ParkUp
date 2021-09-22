package parkup.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import parkup.entities.Guest;

import java.util.UUID;

public interface GuestRepository extends JpaRepository<Guest, UUID> {

}