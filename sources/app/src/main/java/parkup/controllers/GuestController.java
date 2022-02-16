package parkup.controllers;

import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import parkup.entities.Guest;
import parkup.services.GuestService;

@RestController
public class GuestController {
    private final GuestService guestService;

    @Autowired
    public GuestController(GuestService guestService) {
        this.guestService = guestService;
    }

    @GetMapping({"/guest"})
    public List<Guest> getAllGuest() {
        return this.guestService.getGuests();
    }

    @GetMapping({"/guest/{guestId}"})
    public Guest getGuest(@PathVariable int guestId) {
        Guest guest = this.guestService.findById(guestId);
        if (guest != null) {
            return guest;
        } else {
            throw new RuntimeException("Guest not found");
        }
    }

    @PostMapping({"/guest"})
    public Guest addGuest(@RequestBody Guest guest) {
        Guest guestToReturn = this.guestService.addGuest(guest);
        return guestToReturn;
    }

    @DeleteMapping({"/guest/{guestId}"})
    public void deleteGuest(@PathVariable int guestId) {
        this.guestService.deleteGuest(guestId);
    }
}
