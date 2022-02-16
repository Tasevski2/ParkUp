package parkup.data;

import parkup.entities.Worker;

public class WorkerDemo {
    private int workerId;
    private String firstName;
    private String lastName;
    private String email;

    public WorkerDemo() {}

    public WorkerDemo(Worker w) {
        this.workerId =w.getWorkerId();
        this.firstName = w.getFirstName();
        this.lastName = w.getLastName();
        this.email = w.getEmail();
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
}

