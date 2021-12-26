package parkup.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parkup.entities.Guest;
import parkup.repositories.GuestRepository;

@Service
public class GuestService {
    private final GuestRepository guestRepository;

    @Autowired
    public GuestService(GuestRepository guestRepository) {
        this.guestRepository = guestRepository;
    }

    public List<Guest> getGuests() {
        return this.guestRepository.findAll();
    }

    public Guest findById(int guestId) {
        Optional<Guest> guest = Optional.ofNullable(this.guestRepository.findByGuestId(guestId));
        return guest.orElse(null);
    }

    public void addGuest(Guest guest) {
        Optional<Guest> guestOpt = this.guestRepository.findGuestByEmail(guest.getEmail());
        if (guestOpt.isPresent()) {
            throw new IllegalStateException("Email already taken, try adding a guest with a different valid email address");
        } else {
            System.out.println(guest);
            this.guestRepository.save(guest);
        }
    }

    public void deleteGuest(int guestId) {
        Optional<Guest> guest = Optional.ofNullable(this.guestRepository.findByGuestId(guestId));
        if (guest.isPresent()) {
            this.guestRepository.deleteByGuestId(guestId);
        } else {
            throw new IllegalStateException("Guest doesn't exist, therefore can't be deleted");
        }
    }
}
