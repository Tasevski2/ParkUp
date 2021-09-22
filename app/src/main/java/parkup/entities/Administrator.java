package parkup.entities;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Table(name = "administrator")
public class Administrator extends User{

    public Administrator() {
        super();
        this.regAdmin = true;
    }

    public Administrator(UUID userId, String firstName, String lastName, String email, String password, String mobile) {
        super(userId, firstName, lastName, email, password, mobile);
        this.regAdmin = true;
    }

    public Administrator(String firstName, String lastName, String email, String password, String mobile) {
        super(firstName, lastName, email, password, mobile);
        this.regAdmin = true;
    }
}
