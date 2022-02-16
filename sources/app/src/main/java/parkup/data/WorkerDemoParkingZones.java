package parkup.data;

import parkup.configs.PasswordEncoder;
import parkup.data.enumarations.EmployeeStatus;
import parkup.data.enumarations.UserRole;
import parkup.entities.ParkingZone;
import parkup.entities.Worker;

import java.util.List;
import java.util.stream.Collectors;

public class WorkerDemoParkingZones {
    private int workerId;
    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private UserRole role;
    private boolean locked;

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    private EmployeeStatus status;
    private List<String> pzNames;

    public WorkerDemoParkingZones(Worker v){
        this.workerId = v.getWorkerId();
        this.firstName = v.getFirstName();
        this.lastName = v.getLastName();
        this.email = v.getEmail();
        this.mobile = v.getMobile();
        this.role = v.getRole();
        this.status = v.getStatus();
        this.locked= !v.isAccountNonLocked();
        this.pzNames = v.getParkingZones().stream().map(ParkingZone::getPzName).collect(Collectors.toList());
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

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public EmployeeStatus getStatus() {
        return status;
    }

    public void setStatus(EmployeeStatus status) {
        this.status = status;
    }

    public List<String> getPzNames() {
        return pzNames;
    }

    public void setPzNames(List<String> pzNames) {
        this.pzNames = pzNames;
    }
}
