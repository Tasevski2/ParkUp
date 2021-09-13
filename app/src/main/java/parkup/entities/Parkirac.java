package parkup.entities;
import javax.persistence.*;

@Entity
@Table(name = "parkirac")
public class Parkirac {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parkirac_id")
    private int parkiracId;

    @Column(name = "reg_tablicki")  //??? ako ima povekje vaka li da se pretstavat
    private String [] regTablickStrings;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile")
    private String mobile;


    public Parkirac(){}

    public Parkirac(int parkiracId, String[] regTablickStrings, String email, String mobile) {
        this.parkiracId = parkiracId;
        this.regTablickStrings = regTablickStrings;
        this.email = email;
        this.mobile = mobile;
    }

    public int getId() {
        return parkiracId;
    }

    public void setId(int parkiracId) {
        this.parkiracId = parkiracId;
    }

    public String[] getRegTablickStrings() {
        return regTablickStrings;
    }

    public void setRegTablickStrings(String[] regTablickStrings) {
        this.regTablickStrings = regTablickStrings;
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

    
}
