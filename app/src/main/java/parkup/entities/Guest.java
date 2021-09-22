package parkup.entities;

import parkup.data.Tablicka;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "guest")
public class Guest extends Parkirac{
    //da ne se dozvoli povise od edna tablicka, vo sprotivno da se registrira

    public Guest(){
        super();
        this.regParkirac = false;
    }

    public Guest(UUID parkiracId, List<Tablicka> regTablicki, String email, String mobile)  {
        super(parkiracId, regTablicki, email, mobile);
        this.regParkirac = false;
    }

    public Guest(List<Tablicka> regTablicki, String email, String mobile) {
        super(regTablicki, email, mobile);
        this.regParkirac = false;
    }

}
