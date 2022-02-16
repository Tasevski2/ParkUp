package parkup.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import javax.persistence.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import parkup.data.Plate;
import parkup.data.enumarations.UserRole;

@Entity
@Table(name = "registeredUser")
public class RegisteredUser implements UserDetails {
    @Id
    @SequenceGenerator(
            name="registeredUser_sequence_generator",
            sequenceName = "registeredUser_sequence",
            allocationSize = 1,
            initialValue = 300
    )
    @GeneratedValue(    //za postgres treba sequence da se namesti i ime na generator mi ga davamo kako od gore sto e
            strategy = GenerationType.SEQUENCE,
            generator = "registeredUser_sequence_generator"
    )
    @Column(name = "regParkId")
    private int regParkId;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "password")
    private String password;

    @OneToMany(cascade ={CascadeType.ALL})
    @Column(name = "regPlates")
    private List<Plate> plates;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile")
    private String mobile;

    @Enumerated
    @Column(name = "role")
    private UserRole role;

    @OneToOne
    private ParkingSession session;

    private boolean locked;

    private boolean enabled;

    public RegisteredUser() {
        this.plates = new ArrayList<Plate>();
        this.role = UserRole.ROLE_REG_USER;
        this.session=null;
    }

    public RegisteredUser(int regParkId, String firstName, String lastName, String password, List<Plate> plates, String email, String mobile) {
        this.regParkId = regParkId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.plates = plates;
        this.email = email;
        this.mobile = mobile;
        this.role = UserRole.ROLE_REG_USER;
        session=null;
    }

    public RegisteredUser(String firstName, String lastName, String password, List<Plate> plates, String email, String mobile) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.plates = plates;
        this.email = email;
        this.mobile = mobile;
        this.role = UserRole.ROLE_REG_USER;
        session=null;
    }

    public RegisteredUser(String firstName, String lastName, String email, String password, String mobile) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.mobile = mobile;
        this.role = UserRole.ROLE_REG_USER;
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String name) {
        this.firstName = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String surname) {
        this.lastName = surname;
    }

    public List<Plate> getPlates() {
        return plates;
    }

    public void setPlates(List<Plate> plates) {
        this.plates = plates;
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

    public UserRole getRole() {return role;}

    public void setRole(UserRole role) {this.role = role;}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.getAuthority());
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

