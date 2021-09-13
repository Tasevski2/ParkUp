package parkup.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parkup.entities.*;
import parkup.repositories.*;

import java.util.List;
import java.util.Optional;


@Service
public class ParkiracServiceImpl implements ParkiracService{
    
    private ParkiracRepository parkiracRepository;

    @Autowired
    public ParkiracServiceImpl(ParkiracRepository parkiracRepository) {
        this.parkiracRepository = parkiracRepository;
    }
}
