package parkup.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parkup.repositories.ParkiracRepository;
import parkup.repositories.RegistriranParkiracRepository;

@Service
public class RegistriranParkiracService {

    private RegistriranParkiracRepository registriranParkiracRepository;

    @Autowired
    public RegistriranParkiracService(RegistriranParkiracRepository registriranParkiracRepository) {
        this.registriranParkiracRepository = registriranParkiracRepository;
    }
}
