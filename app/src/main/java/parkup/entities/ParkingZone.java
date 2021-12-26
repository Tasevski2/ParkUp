package parkup.entities;

import parkup.data.ParkingZoneLocation;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "parking_zone")
public class ParkingZone {
    @Id
    @SequenceGenerator(
            name="parking_zone_sequence_generator",
            sequenceName = "parking_zone_sequence",
            allocationSize = 1,
            initialValue = 600
    )
    @GeneratedValue(    //za postgres treba sequence da se namesti i ime na generator mi ga davamo kako od gore sto e
            strategy = GenerationType.SEQUENCE,
            generator = "parking_zone_sequence_generator"
    )
    @Column(name = "parking_zone_id")
    private int pzId;

    @Column(name = "pz_name")
    private String pzName;

    @Column(name = "price")
    private int price;

    @Transient
    @Column(name = "capacity")
    private int capacity;
    @Column(name = "time_from")  //za rabotni casovi od:
    private int from;

    @Column(name = "time_to")    //za rabotni casovi do:
    private int to;

    @Column(name = "address")
    private String address;

    @Transient
    @Column(name = "zafateniMesta")
    private int takenSpaces;

    @Column(name = "color")
    private String color;

//    @ManyToMany(cascade = {CascadeType.ALL})
//    private List<Vraboten> odgovorniLica;

    @OneToMany(cascade = {CascadeType.MERGE})
    private List<ParkingSpace> parkingSpaces;

    @OneToOne(cascade = {CascadeType.ALL})
    private ParkingZoneLocation parkingZoneLocation;

   public ParkingZone() {
       this.takenSpaces = 0;
       this.parkingSpaces = new ArrayList<ParkingSpace>();
   }

    public ParkingZone(String pzName) {
        this.pzName = pzName;
        this.takenSpaces = 0;
        this.parkingSpaces = new ArrayList<ParkingSpace>();
    }

    public ParkingZone(int pzId, String pzName, int price, int capacity, String address, List<ParkingSpace> parkingSpaces, String color, int from, int to) {
        this.pzId = pzId;
        this.pzName = pzName;
        this.price = price;
        this.capacity = capacity;
        this.address = address;
        this.takenSpaces = 0;
        this.parkingSpaces = parkingSpaces;
        this.color = color;
        this.from = from;
        this.to = to;
    }

    public ParkingZone(String pzName, int price, int capacity, String address, List<ParkingSpace> parkingSpaces, String color, int from, int to) {
        this.pzName = pzName;
        this.price = price;
        this.capacity = capacity;
        this.address = address;
        this.takenSpaces = 0;
        this.parkingSpaces = parkingSpaces;
        this.color = color;
        this.from = from;
        this.to = to;
    }

    public int getId() {
        return this.pzId;
    }

    public void setId(int pzId) {
        this.pzId = pzId;
    }

    public String getPzName() {
        return this.pzName;
    }

    public void setPzName(String pzName) {
        this.pzName = pzName;
    }

    public int getPrice() {
        return this.price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getCapacity() {
        return this.capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String location) {
        this.address = location;
    }

    public int getTakenSpaces() {return takenSpaces;}

    public void setTakenSpaces(int takenSpaces) {this.takenSpaces = takenSpaces;}

    public List<ParkingSpace> getParkingSpaces() {return parkingSpaces;}

    public void setParkingSpaces(List<ParkingSpace> parkingSpaces) {this.parkingSpaces = parkingSpaces;}

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getFrom() {
        return from;
    }

    public void setFrom(int from) {
        this.from = from;
    }

    public int getTo() {
        return to;
    }

    public void setTo(int to) {
        this.to = to;
    }

    public ParkingZoneLocation getParkingZoneLocation() {
        return parkingZoneLocation;
    }

    public void setParkingZoneLocation(ParkingZoneLocation parkingZoneLocation) {
        this.parkingZoneLocation = parkingZoneLocation;
    }

    //    public List<Vraboten> getOdgovorniLica() {
//        return odgovorniLica;
//    }
//
//    public void setOdgovorniLica(List<Vraboten> odgovorniLica) {
//        this.odgovorniLica = odgovorniLica;
//    }
}
