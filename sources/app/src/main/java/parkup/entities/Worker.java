package parkup.entities;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import parkup.data.enumarations.EmployeeStatus;
import parkup.data.enumarations.UserRole;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "worker")
public class Worker implements UserDetails {
    @Id
    @SequenceGenerator(
            name="worker_sequence_generator",
            sequenceName = "worker_sequence",
            allocationSize = 1,
            initialValue = 200
    )
    @GeneratedValue(    //za postgres treba sequence da se namesti i ime na generator mi ga davamo kako od gore sto e
            strategy = GenerationType.SEQUENCE,
            generator = "worker_sequence_generator"
    )
    @Column(name = "workerId")
    private int workerId;

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

    @Enumerated
    @Column(name = "role")
    private UserRole role;

    @ManyToMany(fetch = FetchType.EAGER)
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


    public Worker() {
        this.role = UserRole.ROLE_WORKER;
        this.parkingZones = new ArrayList<ParkingZone>();
        this.enabled = true;
        this.status = EmployeeStatus.NOT_WORKING;
    }

    public Worker(int workerId, String firstName, String lastName, String email, String password, String mobile, List<ParkingZone> parkingZones) {
        this.workerId = workerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.mobile = mobile;
        this.parkingZones = parkingZones;
        this.role = UserRole.ROLE_WORKER;
        this.enabled = true;
        this.status = EmployeeStatus.NOT_WORKING;
    }

    public Worker(String firstName, String lastName, String email, String password, String mobile, List<ParkingZone> parkingZones) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.mobile = mobile;
        this.parkingZones = parkingZones;
        this.role = UserRole.ROLE_WORKER;
        this.enabled = true;
        this.status = EmployeeStatus.NOT_WORKING;
    }

    public Worker(String firstName, String lastName, String email, String password, String mobile) {
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
        this.password=password;
        this.mobile=mobile;
        this.parkingZones=new ArrayList<>();
        this.role = UserRole.ROLE_WORKER;
        this.enabled=true;
        this.status = EmployeeStatus.NOT_WORKING;
    }

    public int getWorkerId() {
        return workerId;
    }

    public void setWorkerId(int workerId) {
        this.workerId = workerId;
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
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.getAuthority());
        return Collections.singleton(authority);
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

    public UserRole getRole() {return role;}

    public void setRole(UserRole role) {this.role = role;}

    public List<ParkingZone> getParkingZones() {return parkingZones;}

    public void setParkingZones(List<ParkingZone> parkingZones) {this.parkingZones = parkingZones;}

    public EmployeeStatus getStatus() {return status;}

    public void setStatus(EmployeeStatus status) {this.status = status;}

    public boolean isAccount() {return enabled;}

    public void setAccount(boolean account) {this.enabled = account;}
}