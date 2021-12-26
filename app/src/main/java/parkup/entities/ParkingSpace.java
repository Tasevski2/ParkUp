package parkup.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "parking_space")
public class ParkingSpace {
    @Id
    @Column(name = "parking_space_id")
    @SequenceGenerator(
            name="parking_space_sequence_generator",
            sequenceName = "parking_space_sequence",
            allocationSize = 1,
            initialValue = 700
    )
    @GeneratedValue(    //za postgres treba sequence da se namesti i ime na generator mi ga davamo kako od gore sto e
            strategy = GenerationType.SEQUENCE,
            generator = "parking_space_sequence_generator"
    )
    private int psId;

    @Column(name = "psName")
    private String psName;

    @Column(name = "isTaken")
    private boolean taken;

    @Column(name = "latitude")
    private float lat;

    @Column(name = "longitude")
    private float lng;

//    @OneToOne(cascade = {CascadeType.ALL})
//    @JoinColumn(name = "parking_zona")
//    private ParkingZone parkingZone;
//    @ManyToOne(cascade = {CascadeType.ALL})
//    @JoinColumn(name = "parking_zona")
//    private ParkingZone parkingZone;
//
//    @OneToMany
//    @Column(name="parking_sessions")
//    private List<ParkingSession> sessions;

    public ParkingSpace() {

    }

    public ParkingSpace(int psId, String psName, boolean isTaken,  float lat, float lng) {
        this.psId = psId;
        this.psName = psName;
        this.taken = isTaken;
        this.lat = lat;
        this.lng = lng;
    }

    public ParkingSpace(String psName,  float lat, float lng) {
        this.psName = psName;
        this.taken = false;
        this.lat = lat;
        this.lng = lng;
    }

    public int getPsId() {
        return this.psId;
    }

//    public ParkingZone getParkingZone() {
//        return parkingZone;
//    }
//
//    public void setParkingZone(ParkingZone parkingZone) {
//        this.parkingZone = parkingZone;
//    }


    public void setPsId(int psId) {
        this.psId = psId;
    }

    public String getPsName() {
        return this.psName;
    }

    public void setPsName(String psName) {
        this.psName = psName;
    }

    public boolean isTaken() {
        return this.taken;
    }

    public void setTaken(boolean isTaken) {
        this.taken = isTaken;
    }

    public float getLat() {
        return lat;
    }

    public void setLat(float lat) {
        this.lat = lat;
    }

    public float getLng() {
        return lng;
    }

    public void setLng(float lng) {
        this.lng = lng;
    }


    @Override
    public String toString() {
        return "ParkingSpace{" +
                "psName='" + psName + '\'' +
                ", isTaken=" + taken +
                ", lat=" + lat +
                ", lng=" + lng+
                '}';
    }
}

