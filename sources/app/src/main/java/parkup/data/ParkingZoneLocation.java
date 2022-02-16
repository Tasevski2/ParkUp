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
    private List<Location> coords;

    public ParkingZoneLocation(int parkingZoneLocationId, Location centre, List<Location> coords) {
        this.parkingZoneLocationId = parkingZoneLocationId;
        this.centre = centre;
        this.coords = coords;
    }

    public ParkingZoneLocation(Location centre, List<Location> coords) {
        this.centre = centre;
        this.coords = coords;
    }

    public ParkingZoneLocation() {}

    public Location getCentre() {
        return centre;
    }

    public void setCentre(Location centre) {
        this.centre = centre;
    }

    public List<Location> getCoords() {
        return coords;
    }

    public void setCoords(List<Location> teminja) {
        this.coords = teminja;
    }
}
