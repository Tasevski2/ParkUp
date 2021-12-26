package parkup.configs.token;

import parkup.entities.Vraboten;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ConfirmationTokenW {

    @Id
    @Column(name = "confirmation_token_id")
    @SequenceGenerator(
            name="confirmation_token_sequence_generator_W",
            sequenceName = "confirmation_token_sequence_W",
            allocationSize = 1,
            initialValue = 1200
    )
    @GeneratedValue(    //za postgres treba sequence da se namesti i ime na generator mi ga davamo kako od gore sto e
            strategy = GenerationType.SEQUENCE,
            generator = "confirmation_token_sequence_generator_W"
    )
    private int id;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    private LocalDateTime confirmedAt;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(nullable = false, name = "vraboten_id")
    //many confirmation tokens to one registriranParkirac
    private Vraboten vraboten;

    public ConfirmationTokenW() {}

    public ConfirmationTokenW(int id, String token, LocalDateTime createdAt, LocalDateTime expiresAt, Vraboten vraboten) {
        this.id = id;
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.vraboten = vraboten;
    }

    public ConfirmationTokenW(String token, LocalDateTime createdAt, LocalDateTime expiresAt, Vraboten vraboten) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.vraboten = vraboten;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }

    public LocalDateTime getConfirmedAt() {
        return confirmedAt;
    }

    public void setConfirmedAt(LocalDateTime confirmedAt) {
        this.confirmedAt = confirmedAt;
    }

    public Vraboten getRegistriranParkirac() {
        return vraboten;
    }

    public void setRegistriranParkirac(Vraboten vraboten) {
        this.vraboten = vraboten;
    }
}
