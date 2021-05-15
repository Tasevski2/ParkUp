package parkup.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parkup.entities.*;
import parkup.repositories.*;

import java.util.Optional;

@Service
public class ProbaServiceImpl implements ProbaService{

    private ProbaRepository probaRepository;

    @Autowired
    public ProbaServiceImpl(ProbaRepository probaRepository) {
        this.probaRepository = probaRepository;
    }

    @Override
    public ProbaUser findById(int id) {
        Optional<ProbaUser> user = probaRepository.findById(id);
        if(user.isPresent())
            return user.get();

        return null;

    }

    @Override
    public void saveUser(ProbaUser user) {
        probaRepository.save(user);
    }
}
