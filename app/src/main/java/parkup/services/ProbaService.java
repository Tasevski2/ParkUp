package parkup.services;

import parkup.entities.ProbaUser;

public interface ProbaService {
    ProbaUser findById(int id);
    void saveUser(ProbaUser user);
}
