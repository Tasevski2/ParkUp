package parkup.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
//import parkup.configs.RegistrationServiceW;
import parkup.data.AddUpdateVraboten;
import parkup.entities.Vraboten;
import parkup.services.VrabotenService;
import parkup.data.VrabotenDemo;

@RestController
public class VrabotenController {
    private final VrabotenService vrabotenService;
//    private final RegistrationServiceW registrationServiceW;

    @Autowired
    public VrabotenController(VrabotenService vrabotenService) {
        this.vrabotenService = vrabotenService;
    }

    @GetMapping({"/vraboten"})
    public List<Vraboten> getAllVraboten() {
        return this.vrabotenService.getVraboteni();
    }

    @GetMapping({"/vraboten/{vrabotenId}"})
    public Vraboten getVraboten(@PathVariable int vrabotenId) {
        Vraboten vraboten = this.vrabotenService.findById(vrabotenId);
        if (vraboten != null) {
            return vraboten;
        } else {
            throw new RuntimeException("Vraboten not found");
        }
    }

    @GetMapping({"/vraboten/vrabotenDemo"})
    public List<VrabotenDemo> getVraboteniDemos(){
        return this.vrabotenService.getAllVraboteniDemos();
    }

    @PostMapping({"/vraboten"})
    public Optional<Vraboten> addVraboten(@RequestBody AddUpdateVraboten vraboten) {
        return this.vrabotenService.addVraboten(vraboten.getPassword(), vraboten.getConfirmPass(), vraboten.isLocked(),vraboten.getFirstName(), vraboten.getLastName(),
                vraboten.getMobileNumber(), vraboten.getEmail(), vraboten.getStatus(),vraboten.getParkingZones());
    }

    @PutMapping({"/vraboten/lock/{vrabotenId}"})
    public void lockVraboten(@PathVariable int vrabotenId) {
        this.vrabotenService.lockVrabotenAcc(vrabotenId);
    }

//    @PostMapping({"/vraboten/setStatus/{vrabotenId}"})
//    public void setVrabotenStatus(@PathVariable int vrabotenId,@RequestParam String vrabotenStatus){
//        this.vrabotenService.setVrabotenStatus(vrabotenId,vrabotenStatus);
//    }

    @PutMapping({"/vraboten/{vrabotenId}"})
    public Vraboten updateVraboten(@PathVariable int vrabotenId, @RequestBody AddUpdateVraboten vraboten) {
        return this.vrabotenService.updateVraboten(vrabotenId,vraboten.getPassword(), vraboten.getConfirmPass(), vraboten.isLocked(),vraboten.getFirstName(), vraboten.getLastName(),
                vraboten.getMobileNumber(), vraboten.getEmail(), vraboten.getStatus(),vraboten.getParkingZones());
    }

    @DeleteMapping({"/vraboten/{vrabotenId}"})
    public Optional<Vraboten> deleteVraboten(@PathVariable int vrabotenId) {
        return this.vrabotenService.deleteVraboten(vrabotenId);
    }

//    @PostMapping({"/vraboten/registration"})
//    public String register(@RequestBody RegistrationRequest request){
//        return registrationServiceW.register(request);
//    }
//
//    @GetMapping(path = "/vraboten/registration/confirm")
//    public String confirm(@RequestParam("token") String token) {
//        return registrationServiceW.confirmToken(token);
//    }
}