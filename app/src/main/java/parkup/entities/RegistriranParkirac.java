package parkup.entities;

import parkup.data.Tablicka;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "registriranParkirac")
public class RegistriranParkirac extends Parkirac{

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "password")
    private String password;

    public RegistriranParkirac(){
        super();
        this.regParkirac = true;
    }

    public RegistriranParkirac(String name, String surname, String password) {
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.regParkirac = true;
    }

    public RegistriranParkirac(UUID parkiracId, List<Tablicka> regTablicki, String email, String mobile, String name, String surname, String password) {
        super(parkiracId, regTablicki, email, mobile);
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.regParkirac = true;
    }

    public RegistriranParkirac(List<Tablicka> regTablicki, String email, String mobile, String name, String surname, String password) {
        super(regTablicki, email, mobile);
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.regParkirac = true;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
