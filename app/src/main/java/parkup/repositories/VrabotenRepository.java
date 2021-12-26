package parkup.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import parkup.entities.Vraboten;

import javax.transaction.Transactional;

@Repository
public interface VrabotenRepository extends JpaRepository<Vraboten, Integer> {
    Vraboten findByVrabotenId(int id);

    void deleteByVrabotenId(int id);

    Optional<Vraboten> findVrabotenByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE Vraboten v " +
            "SET v.enabled = TRUE WHERE v.email = ?1")
    int enableVraboten(String email);
}
