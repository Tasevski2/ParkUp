package parkup.entities;

import javax.persistence.*;

import parkup.data.Tablicka;

@Entity
@Table(name = "guest")
public class Guest {
    @Id
    @SequenceGenerator(
            name="guest_sequence_generator",
            sequenceName = "guest_sequence",
            allocationSize = 1,
            initialValue = 400
    )
    @GeneratedValue(    //za postgres treba sequence da se namesti i ime na generator mi ga davamo kako od gore sto e
            strategy = GenerationType.SEQUENCE,
            generator = "guest_sequence_generator"
    )
    @Column(name = "guestId")
    private int guestId;

    //dali ova treba vaka?
    @OneToOne
    @JoinColumn(name = "tablickaId", nullable = false)
    private Tablicka tablicka;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile")
    private String mobile;

    @OneToOne
    private ParkingSession session;

    public Guest() {}

    public Guest(int guestId, Tablicka tablicka, String email, String mobile) {
        this.guestId = guestId;
        this.tablicka = tablicka;
        this.email = email;
        this.mobile = mobile;
    }

    public Guest(Tablicka tablicka, String email, String mobile) {
        this.tablicka = tablicka;
        this.email = email;
        this.mobile = mobile;
    }

    public int getGuestId() {
        return guestId;
    }

    public void setGuestId(int guestId) {
        this.guestId = guestId;
    }

    public Tablicka getTablicka() {
        return tablicka;
    }

    public void setTablicka(Tablicka tablicka) {
        this.tablicka = tablicka;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }
}
