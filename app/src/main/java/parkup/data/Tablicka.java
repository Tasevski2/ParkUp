package parkup.data;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
public class Tablicka {

    @Id
    private UUID tablicaId;

    private String tablica;

    public Tablicka(){}

    public Tablicka(String tablica) {
        this.tablica = tablica;
    }

    public String getTablica() {
        return tablica;
    }

    public void setTablica(String tablica) {
        this.tablica = tablica;
    }
}
