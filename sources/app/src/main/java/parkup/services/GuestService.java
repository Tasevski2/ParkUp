package parkup.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import parkup.entities.Guest;
import parkup.repositories.GuestRepository;

@Service
public class GuestService implements UserDetailsService {
    private final GuestRepository guestRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public GuestService(GuestRepository guestRepository, BCryptPasswordEncoder passwordEncoder) {
        this.guestRepository = guestRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<Guest> getGuests() {
        return this.guestRepository.findAll();
    }

    public Guest findById(int guestId) {
        Optional<Guest> guest = Optional.ofNullable(this.guestRepository.findByGuestId(guestId));
        return guest.orElse(null);
    }

    public Guest addGuest(Guest guest) {
        Optional<Guest> guestOpt = this.guestRepository.findGuestByEmail(guest.getEmail());
        if (guestOpt.isPresent()) {
            throw new IllegalStateException("Email already taken, try adding a guest with a different valid email address");
        } else {
            double random = Math.random()*10000;
            guest.setPassword(passwordEncoder.encode(Integer.toString((int)random)));
            this.guestRepository.save(guest);
            guest.setPassword(Integer.toString((int)random));
           return  guest;
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

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return guestRepository.findGuestByEmail(s)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Email not found"));
    }
}
