package parkup.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import parkup.entities.User;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    User findByUserId(UUID id);
    void deleteByUserId(UUID id);
    Optional<User> findUserByEmail(String email);
}
