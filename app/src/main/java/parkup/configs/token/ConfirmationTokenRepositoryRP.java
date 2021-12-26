package parkup.configs.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface ConfirmationTokenRepositoryRP extends JpaRepository<ConfirmationTokenRP,Integer> {

    Optional<ConfirmationTokenRP> findByToken(String token);

    void deleteByRegistriranParkirac_RegParkId(int regParkId);

    @Transactional
    @Modifying
    @Query("UPDATE ConfirmationTokenRP c " +
            "SET c.confirmedAt = ?2 " +
            "WHERE c.token = ?1")
    int updateConfirmedAt(String token, LocalDateTime confirmedAt);
}
