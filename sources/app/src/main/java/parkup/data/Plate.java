package parkup.data;

import javax.persistence.*;

@Entity
public class Plate {
    @Id
    private String plate;

    public Plate() {}

    public Plate(String plate) {
        this.plate = plate;
    }

    public String getPlate() {
        return this.plate;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }
}