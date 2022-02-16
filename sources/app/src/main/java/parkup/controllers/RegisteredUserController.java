package parkup.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parkup.configs.RegistrationRequest;
import parkup.configs.RegistrationServiceRP;
import parkup.data.Plate;
import parkup.data.enumarations.SessionStatus;
import parkup.entities.RegisteredUser;
import parkup.services.ParkingSessionService;
import parkup.services.RegisteredUserService;

@RestController
public class RegisteredUserController {
    private final RegisteredUserService registeredUserService;
    private final RegistrationServiceRP registrationServiceRP;
    private final ParkingSessionService parkingSessionService;

    @Autowired
    public RegisteredUserController(RegisteredUserService registeredUserService, RegistrationServiceRP registrationServiceRP, ParkingSessionService parkingSessionService) {
        this.registeredUserService = registeredUserService;
        this.registrationServiceRP = registrationServiceRP;
        this.parkingSessionService = parkingSessionService;
    }

    @GetMapping({"/registriranParkirac"})
    public List<RegisteredUser> getAllRegistriraniParkiraci() {
        return this.registeredUserService.getRegPark();
    }

    @GetMapping({"/registriranParkirac/{regParkId}"})
    public RegisteredUser getRegistriranParkirac(@PathVariable int regParkId) {
        RegisteredUser regPark = this.registeredUserService.findById(regParkId);
        if (regPark != null) {
            return regPark;
        } else {
            throw new RuntimeException("User not found");
        }
    }


    @GetMapping({"/registriranParkirac/session"})
    public SessionStatus getStatusOnParkirac(){
        return parkingSessionService.getStatusOfParkirac();
    }

    @PostMapping({"/registriranParkirac"})
    public Optional<RegisteredUser> addRegistriranParkirac(@RequestBody RegisteredUser regPark) {
        return this.registeredUserService.addRegPark(regPark);
    }

    @PutMapping({"/registriranParkirac/{regParkId}"})
    public RegisteredUser updateRegistriranParkirac(@PathVariable int regParkId, @RequestBody RegisteredUser regPark) {
        return this.registeredUserService.updateRegPark(regParkId,regPark.getPassword(), regPark.getFirstName(), regPark.getLastName(), regPark.getMobile(), regPark.getEmail());
    }
    @PutMapping({"/registriranParkirac/{regParkId}/tablici"})
    public String addTablicaToUser(@PathVariable int regParkId, @RequestBody Plate plate){
        return this.registeredUserService.addTablica(regParkId,plate);
    }
    @GetMapping({"/registiranParkirac/tablici"})
    public List<String> getTabliciFromUser(){
        return this.registeredUserService.getTablici();
    }
    @DeleteMapping({"/registriranParkirac/{regParkId}/tablici/{plate}"})
    public String deleteTablicaFromUser(@PathVariable int regParkId, @PathVariable String plate){
        return this.registeredUserService.deleteTablica(regParkId,plate);
    }

    @DeleteMapping({"/registriranParkirac/{regParkId}"})
    public Optional<RegisteredUser> deleteRegistriranParkirac(@PathVariable int regParkId) {
        return this.registeredUserService.deleteRegPark(regParkId);
    }

    @PostMapping({"/registriranParkirac/registration"})
    public String register(@RequestBody RegistrationRequest request){
        return registrationServiceRP.register(request);
    }

    @GetMapping(path = "/registriranParkirac/registration/confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationServiceRP.confirmToken(token);
    }

    @GetMapping({"/testToken"})
    public boolean testToken(){
        return true;
    }
}