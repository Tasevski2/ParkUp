package parkup.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parkup.repositories.*;


@Service
public class ParkiracService {
    
    private ParkiracRepository parkiracRepository;

    @Autowired
    public ParkiracService(ParkiracRepository parkiracRepository) {
        this.parkiracRepository = parkiracRepository;
    }
}
