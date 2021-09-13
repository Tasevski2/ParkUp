package parkup.entities;
import javax.persistence.*;

@Entity
@Table(name = "parking_session")
public class ParkingSession {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parking_session_id")
    private int pssId;

    @Column(name = "time_start")
    private String timeStart;

    @Column(name = "time_end")
    private String timeEnd;

    ParkingSession(){}

    public ParkingSession(int pssId, String timeStart, String timeEnd) {
        this.pssId = pssId;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
    }

    public int getPssId() {
        return pssId;
    }

    public void setPssId(int pssId) {
        this.pssId = pssId;
    }

    public String getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(String timeStart) {
        this.timeStart = timeStart;
    }

    public String getTimeEnd() {
        return timeEnd;
    }

    public void setTimeEnd(String timeEnd) {
        this.timeEnd = timeEnd;
    }

    
}
