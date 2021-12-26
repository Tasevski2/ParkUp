package parkup.data;

import javax.persistence.*;
import java.util.List;

@Entity
public class ParkingZoneLocation {
    @Id
    @Column(name = "parkingZoneLocation_id")
    @SequenceGenerator(
            name="parkingZoneLocation_sequence_generator",
            sequenceName = "parkingZoneLocation_sequence",
            allocationSize = 1,
            initialValue = 1400
    )
    @GeneratedValue(    //za postgres treba sequence da se namesti i ime na generator mi ga davamo kako od gore sto e
            strategy = GenerationType.SEQUENCE,
            generator = "parkingZoneLocation_sequence_generator"
    )
    private int parkingZoneLocationId;

    @OneToOne(cascade = {CascadeType.ALL})
    private Location centre;

    @OneToMany(cascade = {CascadeType.ALL})
    private List<Location> teminja;

    public ParkingZoneLocation(int parkingZoneLocationId, Location centre, List<Location> teminja) {
        this.parkingZoneLocationId = parkingZoneLocationId;
        this.centre = centre;
        this.teminja = teminja;
    }

    public ParkingZoneLocation(Location centre, List<Location> teminja) {
        this.centre = centre;
        this.teminja = teminja;
    }

    public ParkingZoneLocation() {}

    public Location getCentre() {
        return centre;
    }

    public void setCentre(Location centre) {
        this.centre = centre;
    }

    public List<Location> getTeminja() {
        return teminja;
    }

    public void setTeminja(List<Location> teminja) {
        this.teminja = teminja;
    }
}
