package parkup.entities;

import org.springframework.format.annotation.DateTimeFormat;
import parkup.data.Tablicka;
import parkup.data.enumerations.SessionStatus;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "parking_session")
public class ParkingSession {
    @Id
    @Column(name = "parking_session_id")
    @SequenceGenerator(
            name="parking_session_sequence_generator",
            sequenceName = "parking_session_sequence",
            allocationSize = 1,
            initialValue = 800
    )
    @GeneratedValue(    //za postgres treba sequence da se namesti i ime na generator mi ga davamo kako od gore sto e
            strategy = GenerationType.SEQUENCE,
            generator = "parking_session_sequence_generator"
    )
    private int pssId;

    @DateTimeFormat(pattern = "yyyy-MM-dd-HH-mm-ss")
    @Column(name = "time_start")
    private LocalDateTime timeStart;

    @DateTimeFormat(pattern = "yyyy-MM-dd-HH-mm-ss")
    @Column(name = "time_end")
    private LocalDateTime timeEnd;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "reg_tablicka", nullable = false)
    private Tablicka tablica;

    @Column(name="session_status")
    @Enumerated
    private SessionStatus status;

    @ManyToOne
    private ParkingSpace parkingSpace;

    @ManyToOne
    private ParkingZone parkingZone;


//    public ParkingSpace getParkingSpace() {
//        return parkingSpace;
//    }
//
//    public void setParkingSpace(ParkingSpace parkingSpace) {
//        this.parkingSpace = parkingSpace;
//    }

    public ParkingSession() {

    }

    public ParkingSession(Tablicka tablica){
        this.timeStart= LocalDateTime.now();
        this.timeEnd=null;
        this.tablica=tablica;
        this.status=SessionStatus.STARTED_UNVERIFIED;
    }


    public int getPssId() {
        return this.pssId;
    }

    public void setPssId(int pssId) {
        this.pssId = pssId;
    }

    public LocalDateTime getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(LocalDateTime timeStart) {
        this.timeStart = timeStart;
    }

    public LocalDateTime getTimeEnd() {
        return timeEnd;
    }

    public void setTimeEnd(LocalDateTime timeEnd) {
        this.timeEnd = timeEnd;
    }

    public Tablicka getTablica() {
        return tablica;
    }

    public void setTablica(Tablicka tablica) {
        this.tablica = tablica;
    }

    public SessionStatus getStatus() {
        return status;
    }

    public void setStatus(SessionStatus status) {
        this.status = status;
    }

    public ParkingSpace getParkingSpace() {
        return parkingSpace;
    }

    public ParkingZone getParkingZone() {
        return parkingZone;
    }

    public void setParkingSpace(ParkingSpace parkingSpace) {
        this.parkingSpace = parkingSpace;
    }

    public void setParkingZone(ParkingZone parkingZone) {
        this.parkingZone = parkingZone;
    }
}
