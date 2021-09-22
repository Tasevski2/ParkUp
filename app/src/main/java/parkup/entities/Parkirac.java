package parkup.entities;
import parkup.data.Tablicka;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "parkirac")
public class Parkirac {

    @Id
    @Column(name = "parkirac_id")
    private UUID parkiracId;

    @OneToMany
    @Column(name = "reg_tablicki")
    private List<Tablicka> regTablicki;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "regParkirac")
    protected boolean regParkirac;

    public Parkirac(){
        List<Tablicka> regTablicki = new ArrayList<Tablicka>();
    }

    public Parkirac(UUID parkiracId, List<Tablicka> regTablicki, String email, String mobile) {
        this.parkiracId = parkiracId;
        this.regTablicki = regTablicki;
        this.email = email;
        this.mobile = mobile;
    }

    public Parkirac(List<Tablicka> regTablicki, String email, String mobile) {
        this.regTablicki = regTablicki;
        this.email = email;
        this.mobile = mobile;
    }


    public UUID getId() {
        return parkiracId;
    }

    public void setId(UUID parkiracId) {
        this.parkiracId = parkiracId;
    }

    public List<Tablicka> getRegTablicki() {return regTablicki;}

    public void setRegTablicki(List<Tablicka> regTablicki) {this.regTablicki = regTablicki;}

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

    public boolean RegParkirac() {return regParkirac;}

    public void setRegParkirac(boolean regParkirac) {this.regParkirac = regParkirac;}
}
