package parkup.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import parkup.entities.Guest;

@Repository
public interface GuestRepository extends JpaRepository<Guest, Integer> {
    Guest findByGuestId(int id);

    void deleteByGuestId(int id);

    Optional<Guest> findGuestByEmail(String email);
}
