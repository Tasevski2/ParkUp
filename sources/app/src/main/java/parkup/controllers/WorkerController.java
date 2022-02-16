package parkup.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
//import parkup.configs.RegistrationServiceW;
import parkup.data.AddUpdateWorker;
import parkup.data.WorkerDemoParkingZones;
import parkup.entities.Worker;
import parkup.services.WorkerService;
import parkup.data.WorkerDemo;

@RestController
public class WorkerController {
    private final WorkerService workerService;
//    private final RegistrationServiceW registrationServiceW;

    @Autowired
    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    @GetMapping({"/vraboten"})
    public List<Worker> getAllVraboten() {
        return this.workerService.getWorkers();
    }

    @GetMapping({"/vraboten/{vrabotenId}"})
    public WorkerDemoParkingZones getVraboten(@PathVariable int vrabotenId) {
        WorkerDemoParkingZones vraboten = this.workerService.findById(vrabotenId);
        if (vraboten != null) {
            return vraboten;
        } else {
            throw new RuntimeException("Vraboten not found");
        }
    }

    @GetMapping({"/vraboten/vrabotenDemo"})
    public List<WorkerDemo> getVraboteniDemos(){
        return this.workerService.getAllVraboteniDemos();
    }

    @PostMapping({"/vraboten"})
    public Optional<Worker> addVraboten(@RequestBody AddUpdateWorker vraboten) {
        return this.workerService.addWorker(vraboten.getPassword(), vraboten.getConfirmPass(), vraboten.isLocked(),vraboten.getFirstName(), vraboten.getLastName(),
                vraboten.getMobile(), vraboten.getEmail(), vraboten.getStatus(),vraboten.getParkingZones());
    }

    @PutMapping({"/vraboten/lock/{vrabotenId}"})
    public void lockVraboten(@PathVariable int vrabotenId) {
        this.workerService.lockWorkerAcc(vrabotenId);
    }

//    @PostMapping({"/vraboten/setStatus/{vrabotenId}"})
//    public void setVrabotenStatus(@PathVariable int vrabotenId,@RequestParam String vrabotenStatus){
//        this.vrabotenService.setVrabotenStatus(vrabotenId,vrabotenStatus);
//    }

    @PutMapping({"/vraboten/{vrabotenId}"})
    public WorkerDemoParkingZones updateVraboten(@PathVariable int vrabotenId, @RequestBody AddUpdateWorker vraboten) {
        return this.workerService.updateWorker(vrabotenId,vraboten.getPassword(), vraboten.getConfirmPass(), vraboten.isLocked(),vraboten.getFirstName(), vraboten.getLastName(),
                vraboten.getMobile(), vraboten.getEmail(), vraboten.getStatus(),vraboten.getParkingZones());
    }

    @DeleteMapping({"/vraboten/{vrabotenId}"})
    public Optional<Worker> deleteVraboten(@PathVariable int vrabotenId) {
        return this.workerService.deleteWorker(vrabotenId);
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