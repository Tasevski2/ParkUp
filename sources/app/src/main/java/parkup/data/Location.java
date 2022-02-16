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

    private float lng;

    private float lat;

    public Location(){}

    public Location(float lng, float lat) {
        this.lng = lng;
        this.lat = lat;
    }

    public float getLng() {
        return lng;
    }

    public void setLng(float lng) {
        this.lng = lng;
    }

    public float getLat() {
        return lat;
    }

    public void setLat(float lat) {
        this.lat = lat;
    }
}
