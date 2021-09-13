package parkup.entities;
import javax.persistence.*;

@Entity
@Table(name = "parking_space")
public class ParkingSpace {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parking_space_id")
    private int psId;

    @Column(name = "psName")
    private String psName;

    @Column(name = "isTaken")
    private boolean isTaken;

    @Column(name = "isHandicaped")
    private boolean isHandicaped;

    ParkingSpace(){}

    public ParkingSpace(int psId, String psName, boolean isTaken, boolean isHandicaped) {
        this.psId = psId;
        this.psName = psName;
        this.isTaken = isTaken;
        this.isHandicaped = isHandicaped;
    }

    public int getPsId() {
        return psId;
    }

    public void setPsId(int psId) {
        this.psId = psId;
    }

    public String getPsName() {
        return psName;
    }

    public void setPsName(String psName) {
        this.psName = psName;
    }

    public boolean isTaken() {
        return isTaken;
    }

    public void setTaken(boolean isTaken) {
        this.isTaken = isTaken;
    }

    public boolean isHandicaped() {
        return isHandicaped;
    }

    public void setHandicaped(boolean isHandicaped) {
        this.isHandicaped = isHandicaped;
    }

    

}
