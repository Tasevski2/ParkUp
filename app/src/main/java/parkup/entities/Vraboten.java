package parkup.entities;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "vraboten")
public class Vraboten extends User{

    public Vraboten() {
        super();
        this.regAdmin = false;
    }

    public Vraboten(UUID userId, String firstName, String lastName, String email, String password, String mobile) {
        super(userId, firstName, lastName, email, password, mobile);
        this.regAdmin = false;
    }

    public Vraboten(String firstName, String lastName, String email, String password, String mobile) {
        super(firstName, lastName, email, password, mobile);
        this.regAdmin = false;
    }
}
