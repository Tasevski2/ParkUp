package parkup.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parkup.repositories.VrabotenRepository;

@Service
public class VrabotenService {
    private final VrabotenRepository vrabotenRepository;

    @Autowired
    public VrabotenService(VrabotenRepository vrabotenRepository) {
        this.vrabotenRepository = vrabotenRepository;
    }
}
