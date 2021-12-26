package parkup.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parkup.configs.RegistrationRequest;
import parkup.configs.RegistrationServiceRP;
import parkup.entities.RegistriranParkirac;
import parkup.services.RegistriranParkiracService;

@RestController
public class RegistriranParkiracController {
    private final RegistriranParkiracService registriranParkiracService;
    private final RegistrationServiceRP registrationServiceRP;

    @Autowired
    public RegistriranParkiracController(RegistriranParkiracService registriranParkiracService, RegistrationServiceRP registrationServiceRP) {
        this.registriranParkiracService = registriranParkiracService;
        this.registrationServiceRP = registrationServiceRP;
    }

    @GetMapping({"/registriranParkirac"})
    public List<RegistriranParkirac> getAllRegistriraniParkiraci() {
        return this.registriranParkiracService.getRegPark();
    }

    @GetMapping({"/registriranParkirac/{regParkId}"})
    public RegistriranParkirac getRegistriranParkirac(@PathVariable int regParkId) {
        RegistriranParkirac regPark = this.registriranParkiracService.findById(regParkId);
        if (regPark != null) {
            return regPark;
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @PostMapping({"/registriranParkirac"})
    public Optional<RegistriranParkirac> addRegistriranParkirac(@RequestBody RegistriranParkirac regPark) {
        return this.registriranParkiracService.addRegPark(regPark);
    }

    @PutMapping({"/registriranParkirac/{regParkId}"})
    public RegistriranParkirac updateRegistriranParkirac(@PathVariable int regParkId, @RequestBody RegistriranParkirac regPark) {
        return this.registriranParkiracService.updateRegPark(regParkId, regPark.getName(), regPark.getSurname(), regPark.getMobile(), regPark.getEmail(),regPark.getRegTablicki());
    }

    @DeleteMapping({"/registriranParkirac/{regParkId}"})
    public Optional<RegistriranParkirac> deleteRegistriranParkirac(@PathVariable int regParkId) {
        return this.registriranParkiracService.deleteRegPark(regParkId);
    }

    @PostMapping({"/registriranParkirac/registration"})
    public String register(@RequestBody RegistrationRequest request){
        return registrationServiceRP.register(request);
    }

    @GetMapping(path = "/registriranParkirac/registration/confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationServiceRP.confirmToken(token);
    }
}