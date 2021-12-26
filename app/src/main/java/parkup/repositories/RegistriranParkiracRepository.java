package parkup.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import parkup.entities.RegistriranParkirac;

import javax.transaction.Transactional;

@Repository
public interface RegistriranParkiracRepository extends JpaRepository<RegistriranParkirac, Integer> {
    RegistriranParkirac findByRegParkId(int regParkId);
    void deleteByRegParkId(int regParkId);
    Optional<RegistriranParkirac> findRegistriranParkiracByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE RegistriranParkirac rp " +
            "SET rp.enabled = TRUE WHERE rp.email = ?1")
    int enableRegistriranParkirac(String email);
}
