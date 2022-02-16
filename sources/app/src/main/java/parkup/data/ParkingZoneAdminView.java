package parkup.data;

import parkup.entities.ParkingSpace;
import parkup.entities.ParkingZone;

import java.util.List;

public class ParkingZoneAdminView {
    private int pzId;
    private String pzName;
    private int price;
    private int from;
    private int to;
    private String address;
    private String color;
    private List<ParkingSpace> parkingSpaces;
    private ParkingZoneLocation parkingZoneLocation;
    private List<WorkerDemo> responsibleWorkers;

    public ParkingZoneAdminView(ParkingZone pz,List<WorkerDemo> responsibleWorkers) {
        this.pzId = pz.getId();
        this.pzName = pz.getPzName();
        this.price = pz.getPrice();
        this.from = pz.getFrom();
        this.to = pz.getTo();
        this.address = pz.getAddress();
        this.color = pz.getColor();
        this.parkingSpaces = pz.getParkingSpaces();
        this.parkingZoneLocation = pz.getParkingZoneLocation();
        this.responsibleWorkers = responsibleWorkers;
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

    public int getFrom() {
        return from;
    }

    public void setFrom(int from) {
        this.from = from;
    }

    public int getTo() {
        return to;
    }

    public void setTo(int to) {
        this.to = to;
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

    public List<WorkerDemo> getResponsibleWorkers() {
        return responsibleWorkers;
    }

    public void setResponsibleWorkers(List<WorkerDemo> responsibleWorkers) {
        this.responsibleWorkers = responsibleWorkers;
    }
}
