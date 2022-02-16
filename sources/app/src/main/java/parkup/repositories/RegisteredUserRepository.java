package parkup.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import parkup.entities.RegisteredUser;

import javax.transaction.Transactional;

@Repository
public interface RegisteredUserRepository extends JpaRepository<RegisteredUser, Integer> {
    RegisteredUser findByRegParkId(int regParkId);

    void deleteByRegParkId(int regParkId);

    Optional<RegisteredUser> findRegisteredUserByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE RegisteredUser rp " +
            "SET rp.enabled = TRUE WHERE rp.email = ?1")
    int enableRegisteredUser(String email);
}
