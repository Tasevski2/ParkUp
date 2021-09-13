package parkup.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import parkup.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
