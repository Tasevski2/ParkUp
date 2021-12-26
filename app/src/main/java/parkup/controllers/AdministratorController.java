package parkup.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import parkup.configs.RegistrationRequest;
import parkup.configs.RegistrationServiceRP;
import parkup.entities.Administrator;
import parkup.services.AdministratorService;

@RestController
public class AdministratorController {
    private final AdministratorService administratorService;
    private final RegistrationServiceRP registrationServiceRP;

    @Autowired
    public AdministratorController(AdministratorService administratorService, RegistrationServiceRP registrationServiceRP) {
        this.administratorService = administratorService;
        this.registrationServiceRP = registrationServiceRP;
    }

    @GetMapping({"/administrator"})
    public List<Administrator> getAllAdministrator() {
        return this.administratorService.getAllAdministrators();
    }

    @GetMapping({"/administrator/{administratorId}"})
    public Administrator getAdministrator(@PathVariable int administratorId) {
        Administrator administrator = this.administratorService.findById(administratorId);
        if (administrator != null) {
            return administrator;
        } else {
            throw new RuntimeException("Administrator not found");
        }
    }

    @PostMapping({"/administrator"})
    public Optional<Administrator> addAdministrator(@RequestBody Administrator administrator) {
        return this.administratorService.addAdministrator(administrator);
    }

    @PutMapping({"/administrator/{administratorId}"})
    public Administrator updateAdministrator(@PathVariable int administratorId, @RequestBody Administrator administrator) {
        return this.administratorService.updateAdministrator(administratorId, administrator.getFirstName(), administrator.getLastName(), administrator.getMobile(), administrator.getEmail());
    }

    @DeleteMapping({"/administrator/{administratorId}"})
    public Optional<Administrator> deleteAdministrator(@PathVariable int administratorId) {
        return this.administratorService.deleteAdministrator(administratorId);
    }

    @PostMapping({"/administrator/registration"})
    public String register(@RequestBody RegistrationRequest request){
        return registrationServiceRP.register(request);
    }

    @GetMapping(path = "/administrator/registration/confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationServiceRP.confirmToken(token);
    }
}