package parkup.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import javax.persistence.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import parkup.data.Tablicka;

@Entity
@Table(name = "registriranParkirac")
public class RegistriranParkirac implements UserDetails {
    @Id
    @SequenceGenerator(
            name="registriranParkirac_sequence_generator",
            sequenceName = "registriranParkirac_sequence",
            allocationSize = 1,
            initialValue = 300
    )
    @GeneratedValue(    //za postgres treba sequence da se namesti i ime na generator mi ga davamo kako od gore sto e
            strategy = GenerationType.SEQUENCE,
            generator = "registriranParkirac_sequence_generator"
    )
    @Column(name = "regParkId")
    private int regParkId;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "password")
    private String password;

    @OneToMany(cascade ={CascadeType.ALL})
    @Column(name = "regTablicki")
    private List<Tablicka> regTablicki;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "role")
    private String role;

    @OneToOne
    private ParkingSession session;

    private boolean locked;

    private boolean enabled;

    public RegistriranParkirac() {
        this.regTablicki = new ArrayList<Tablicka>();
        this.role = "ROLE_REGISTRIRAN_PARKIRAC";
        session=null;
    }

    public RegistriranParkirac(int regParkId, String name, String surname, String password, List<Tablicka> regTablicki, String email, String mobile) {
        this.regParkId = regParkId;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.regTablicki = regTablicki;
        this.email = email;
        this.mobile = mobile;
        this.role = "ROLE_REGISTRIRAN_PARKIRAC";
        session=null;
    }

    public RegistriranParkirac(String name, String surname, String password, List<Tablicka> regTablicki, String email, String mobile) {
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.regTablicki = regTablicki;
        this.email = email;
        this.mobile = mobile;
        this.role = "ROLE_REGISTRIRAN_PARKIRAC";
        session=null;
    }

    public RegistriranParkirac(String name, String surname, String email, String password, String mobile) {
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.email = email;
        this.mobile = mobile;
        this.role = "ROLE_REGISTRIRAN_PARKIRAC";
        session=null;
    }

    public ParkingSession getSession() {
        return session;
    }

    public void setSession(ParkingSession session) {
        this.session = session;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }


    public int getRegParkId() {
        return regParkId;
    }

    public void setRegParkId(int regParkId) {
        this.regParkId = regParkId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public List<Tablicka> getRegTablicki() {
        return regTablicki;
    }

    public void setRegTablicki(List<Tablicka> regTablicki) {
        this.regTablicki = regTablicki;
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

    public String getRole() {return role;}

    public void setRole(String role) {this.role = role;}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);
        return Collections.singleton(authority);
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}

