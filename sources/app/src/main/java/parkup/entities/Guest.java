package parkup.entities;

import javax.persistence.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import parkup.data.Plate;
import parkup.data.enumarations.UserRole;

import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "guest")
public class Guest implements UserDetails {
    @Id
    @SequenceGenerator(
            name="guest_sequence_generator",
            sequenceName = "guest_sequence",
            allocationSize = 1,
            initialValue = 400
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "guest_sequence_generator"
    )
    @Column(name = "guestId")
    private int guestId;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "tablickaId", nullable = false)
    private Plate plate;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile")
    private String mobile;

    @Column(name="password")
    private String password;

    @OneToOne
    private ParkingSession session;

    @Enumerated
    private UserRole role;


    public Guest() {
        this.role = UserRole.ROLE_USER;
        this.session = null;
    }
    public Guest(Plate plate, String email,String mobile,String password,ParkingSession session){
        this.plate=plate;
        this.email=email;
        this.mobile=mobile;
        this.password=password;
        this.session=session;
        this.role=UserRole.ROLE_USER;
    }

    public Guest(Plate plate, String email, String mobile) {
        this.plate = plate;
        this.email = email;
        this.mobile = mobile;
        this.password = "";
        this.role=UserRole.ROLE_USER;
    }

    public int getGuestId() {
        return guestId;
    }

    public void setGuestId(int guestId) {
        this.guestId = guestId;
    }

    public Plate getTablicka() {
        return plate;
    }

    public void setTablicka(Plate plate) {
        this.plate = plate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ParkingSession getSession() {
        return session;
    }

    public void setSession(ParkingSession session) {
        this.session = session;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.name());
        return Collections.singleton(authority);
    }

    public Plate getPlate() {
        return plate;
    }

    public void setPlate(Plate plate) {
        this.plate = plate;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return Integer.toString(guestId);
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
