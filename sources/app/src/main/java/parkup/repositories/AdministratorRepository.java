package parkup.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import parkup.entities.Administrator;

import javax.transaction.Transactional;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Integer> {

    Administrator findByAdministratorId(int id);

    void deleteByAdministratorId(int id);

    Optional<Administrator> findAdministratorByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE Administrator a " +
            "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableAdministrator(String email);
}