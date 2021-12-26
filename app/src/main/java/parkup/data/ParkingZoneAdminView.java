package parkup.data;

import parkup.entities.ParkingSpace;

import java.util.List;

public class ParkingZoneAdminView {
    private int pzId;
    private String pzName;
    private int price;
    private int time_from;
    private int time_to;
    private String address;
    private String color;
    private List<ParkingSpace> parkingSpaces;
    private ParkingZoneLocation parkingZoneLocation;
    private List<Integer> odgovorniLica;

    public ParkingZoneAdminView(int pzId, String pzName, int price, int time_from, int time_to, String address, String color, List<ParkingSpace> parkingSpaces, ParkingZoneLocation parkingZoneLocation, List<Integer> odgovorniLica) {
        this.pzId = pzId;
        this.pzName = pzName;
        this.price = price;
        this.time_from = time_from;
        this.time_to = time_to;
        this.address = address;
        this.color = color;
        this.parkingSpaces = parkingSpaces;
        this.parkingZoneLocation = parkingZoneLocation;
        this.odgovorniLica = odgovorniLica;
    }

    public ParkingZoneAdminView() {}

    public int getPzId() {
        return pzId;
    }

    public void setPzId(int pzId) {
        this.pzId = pzId;
    }

    public String getPzName() {
        return pzName;
    }

    public void setPzName(String pzName) {
        this.pzName = pzName;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getTime_from() {
        return time_from;
    }

    public void setTime_from(int time_from) {
        this.time_from = time_from;
    }

    public int getTime_to() {
        return time_to;
    }

    public void setTime_to(int time_to) {
        this.time_to = time_to;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public List<ParkingSpace> getParkingSpaces() {
        return parkingSpaces;
    }

    public void setParkingSpaces(List<ParkingSpace> parkingSpaces) {
        this.parkingSpaces = parkingSpaces;
    }

    public ParkingZoneLocation getParkingZoneLocation() {
        return parkingZoneLocation;
    }

    public void setParkingZoneLocation(ParkingZoneLocation parkingZoneLocation) {
        this.parkingZoneLocation = parkingZoneLocation;
    }

    public List<Integer> getOdgovorniLica() {
        return odgovorniLica;
    }

    public void setOdgovorniLica(List<Integer> odgovorniLica) {
        this.odgovorniLica = odgovorniLica;
    }
}
