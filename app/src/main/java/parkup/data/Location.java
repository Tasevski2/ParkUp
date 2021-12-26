package parkup.data;

import javax.persistence.*;

@Entity
public class Location {
    @Id
    @Column(name = "location_id")
    @SequenceGenerator(
            name="location_sequence_generator",
            sequenceName = "location_sequence",
            allocationSize = 1,
            initialValue = 1300
    )
    @GeneratedValue(    //za postgres treba sequence da se namesti i ime na generator mi ga davamo kako od gore sto e
            strategy = GenerationType.SEQUENCE,
            generator = "location_sequence_generator"
    )
    private int locationId;

    private float longitude;

    private float latitude;

    public Location(){}

    public Location(float longtitude, float latitude) {
        this.longitude = longtitude;
        this.latitude = latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }
}
