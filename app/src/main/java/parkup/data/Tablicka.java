package parkup.data;

import javax.persistence.*;

@Entity
public class Tablicka {
    @Id
    @SequenceGenerator(
            name="tablicka_sequence_generator",
            sequenceName = "tablicka_sequence",
            allocationSize = 1,
            initialValue = 1000
    )
    @GeneratedValue(    //za postgres treba sequence da se namesti i ime na generator mi ga davamo kako od gore sto e
            strategy = GenerationType.SEQUENCE,
            generator = "tablicka_sequence_generator"
    )
    private int tablicaId;

    private String tablica;

    public Tablicka() {}

    public Tablicka(String tablica) {
        this.tablica = tablica;
    }

    public String getTablica() {
        return this.tablica;
    }

    public void setTablica(String tablica) {
        this.tablica = tablica;
    }
}