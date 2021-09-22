package parkup.entities;
import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "parking_session")
public class ParkingSession {
    
    @Id
    @Column(name = "parking_session_id")
    private UUID pssId;

    @Column(name = "time_start")
    private String timeStart;

    @Column(name = "time_end")
    private String timeEnd;

    public ParkingSession(){}

    public ParkingSession(UUID pssId, String timeStart, String timeEnd) {
        this.pssId = pssId;
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
    }

    public ParkingSession(String timeStart, String timeEnd) {
        this.timeStart = timeStart;
        this.timeEnd = timeEnd;
    }

    public UUID getPssId() {
        return pssId;
    }

    public void setPssId(UUID pssId) {
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
