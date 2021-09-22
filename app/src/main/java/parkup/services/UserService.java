package parkup.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parkup.entities.*;
import parkup.repositories.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = UserService.this.userRepository;
    }

    public User findById(UUID id) {
        Optional<User> user = Optional.ofNullable(UserService.this.userRepository.findByUserId(id));
        return user.orElse(null);
    }

    public List<User> getUsers() {
        return UserService.this.userRepository.findAll();
    }

    public void addUser(User user) {
        Optional<User> userOpt = UserService.this.userRepository.findUserByEmail(user.getEmail());
        if(userOpt.isPresent()){
            throw new IllegalStateException("Email already taken, try adding a user with a different valid email address");
        }
        System.out.println(user);
        UserService.this.userRepository.save(user);
    }

    @Transactional
    public void updateUser(UUID id, User user) {
        
    }

    public void deleteUser(UUID id) {
        Optional<User> userOpt = Optional.ofNullable(userRepository.findByUserId(id));
        if(userOpt.isPresent()){
            UserService.this.userRepository.deleteByUserId(id);
        }
        else{
            throw new IllegalStateException("User doesn't exist, therefore can't be deleted");
        }
        userRepository.deleteByUserId(id);
    }
}
