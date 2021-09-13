package parkup.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parkup.entities.*;
import parkup.repositories.*;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    private UserRepository probaRepository;

    @Autowired
    public UserServiceImpl(UserRepository probaRepository) {
        this.probaRepository = probaRepository;
    }

    @Override
    public User findById(int id) {
        Optional<User> user = probaRepository.findById(id);
        if(user.isPresent())
            return user.get();

        return null;

    }

    @Override
    public void saveUser(User user) {
        probaRepository.save(user);
    }

    @Override
    public void updateUser(int id, User user) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void deleteUser(int id) {
        // TODO Auto-generated method stub
        
    }

    public List<User> getUsers() {
        return null;
    }
}
