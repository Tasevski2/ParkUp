package parkup.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import parkup.entities.ProbaUser;

public interface ProbaRepository extends JpaRepository<ProbaUser, Integer> {

}
