package parkup.entities;
import javax.persistence.*;

@Entity
@Table(name = "parking_zone")
public class ParkingZone {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parking_zone_id")
    private int pzId;

    @Column(name = "pz_name")
    private String pzName;

    @Column(name = "price")
    private int price;

    @Column(name = "capacity")
    private int capacity;

    @Column(name = "work_hours")
    private String workHours;

    @Column(name = "location")
    private String location;

    ParkingZone(){}

    public ParkingZone(int pzId, String pzName, int price, int capacity, String workHours, String location) {
        this.pzId = pzId;
        this.pzName = pzName;
        this.price = price;
        this.capacity = capacity;
        this.workHours = workHours;
        this.location = location;
    }

    public int getId() {
        return pzId;
    }

    public void setId(int pzId) {
        this.pzId = pzId;
    }

    public String getPzName() {
        return pzName;
    }

    public void setPzName(String pzName) {
        this.pzName = pzName;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getWorkHours() {
        return workHours;
    }

    public void setWorkHours(String workHours) {
        this.workHours = workHours;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    
}
