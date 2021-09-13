package parkup.services;

import parkup.entities.User;
import java.util.List;

public interface UserService {
    User findById(int id);
    void saveUser(User user);
    void updateUser(int id, User user);
    void deleteUser(int id);
    List<User> getUsers();
}
