package parkup.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import parkup.entities.Worker;

import javax.transaction.Transactional;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Integer> {
    Worker findByWorkerId(int id);

    void deleteByWorkerId(int id);

    Optional<Worker> findWorkerByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE Worker a " +
            "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableWorker(String email);
}
