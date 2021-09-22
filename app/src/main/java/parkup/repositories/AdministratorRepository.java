package parkup.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import parkup.entities.Administrator;

import java.util.UUID;

public interface AdministratorRepository extends JpaRepository<Administrator, UUID> {
}
