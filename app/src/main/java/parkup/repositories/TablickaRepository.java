package parkup.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import parkup.data.Tablicka;

public interface TablickaRepository extends JpaRepository<Tablicka,Integer> {
    Tablicka findByTablica(String tablica);
}
