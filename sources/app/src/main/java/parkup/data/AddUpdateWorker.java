package parkup.data;

import parkup.data.enumarations.EmployeeStatus;

import java.util.List;

public class AddUpdateWorker {
    String firstName;
    String lastName;
    String email;
    String password;
    String confirmPass;
    List<String> parkingZones;
    EmployeeStatus status;
    String mobile;
    boolean locked;

    public AddUpdateWorker(String firstName, String lastName, String email, String password, String confirmPass, List<String> parkingZones, EmployeeStatus status, String mobile, boolean locked) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.confirmPass = confirmPass;
        this.parkingZones = parkingZones;
        this.status = status;
        this.mobile = mobile;
        this.locked = locked;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPass() {
        return confirmPass;
    }

    public void setConfirmPass(String confirmPass) {
        this.confirmPass = confirmPass;
    }

    public List<String> getParkingZones() {
        return parkingZones;
    }

    public void setParkingZones(List<String> parkingZones) {
        this.parkingZones = parkingZones;
    }

    public EmployeeStatus getStatus() {
        return status;
    }

    public void setStatus(EmployeeStatus status) {
        this.status = status;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }
}

