package parkup.entities;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import parkup.data.enumerations.EmployeeStatus;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "vraboten")
public class Vraboten implements UserDetails {
    @Id
    @SequenceGenerator(
            name="vraboten_sequence_generator",
            sequenceName = "vraboten_sequence",
            allocationSize = 1,
            initialValue = 200
    )
    @GeneratedValue(    //za postgres treba sequence da se namesti i ime na generator mi ga davamo kako od gore sto e
            strategy = GenerationType.SEQUENCE,
            generator = "vraboten_sequence_generator"
    )
    @Column(name = "vrabotenId")
    private int vrabotenId;

    @Override
    public String toString() {
        return "Vraboten{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", parkingZones=" + parkingZones +
                ", locked=" + locked +
                ", enabled=" + enabled +
                '}';
    }

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "role")
    private String role;

    @ManyToMany(cascade = {CascadeType.ALL})
    private List<ParkingZone> parkingZones;

    @Column(name = "status")
    private EmployeeStatus status;

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    @Column(name="locked")
    private boolean locked;

    @Column(name = "enabled")
    private boolean enabled;


    public Vraboten() {
        this.role = "ROLE_VRABOTEN";
        this.parkingZones = new ArrayList<ParkingZone>();
        this.enabled = true;
        this.status = EmployeeStatus.NOT_WORKING;
    }

    public Vraboten(int vrabotenId, String firstName, String lastName, String email, String password, String mobile, List<ParkingZone> parkingZones) {
        this.vrabotenId = vrabotenId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.mobile = mobile;
        this.parkingZones = parkingZones;
        this.role = "ROLE_VRABOTEN";
        this.enabled = true;
        this.status = EmployeeStatus.NOT_WORKING;
    }

    public Vraboten(String firstName, String lastName, String email, String password, String mobile, List<ParkingZone> parkingZones) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.mobile = mobile;
        this.parkingZones = parkingZones;
        this.role = "ROLE_VRABOTEN";
        this.enabled = true;
        this.status = EmployeeStatus.NOT_WORKING;
    }

    public Vraboten(String firstName, String lastName, String email, String password, String mobile) {
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.password=password;
        this.mobile=mobile;
        this.parkingZones=new ArrayList<>();
        this.role="ROLE_VRABOTEN";
        this.enabled=true;
        this.status = EmployeeStatus.NOT_WORKING;
    }

    public int getVrabotenId() {
        return vrabotenId;
    }

    public void setVrabotenId(int vrabotenId) {
        this.vrabotenId = vrabotenId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    public String getPassword() {
        return password;
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

    public void lockVraboten(){
        this.locked = !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getRole() {return role;}

    public void setRole(String role) {this.role = role;}

    public List<ParkingZone> getParkingZones() {return parkingZones;}

    public void setParkingZones(List<ParkingZone> parkingZones) {this.parkingZones = parkingZones;}

    public EmployeeStatus getStatus() {return status;}

    public void setStatus(EmployeeStatus status) {this.status = status;}

    public boolean isAccount() {return enabled;}

    public void setAccount(boolean account) {this.enabled = account;}
}