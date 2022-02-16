package parkup.services;

import java.util.*;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import parkup.data.WorkerDemoParkingZones;
import parkup.data.enumarations.EmployeeStatus;
import parkup.entities.ParkingZone;
import parkup.entities.Worker;
import parkup.repositories.ParkingZoneRepository;
import parkup.repositories.WorkerRepository;
import parkup.data.WorkerDemo;

@Service
public class WorkerService implements UserDetailsService {
    private final WorkerRepository workerRepository;
    private final ParkingZoneRepository parkingZoneRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public WorkerService(WorkerRepository workerRepository, ParkingZoneRepository parkingZoneRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.workerRepository = workerRepository;
        this.parkingZoneRepository = parkingZoneRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public List<Worker> getWorkers() {
        return this.workerRepository.findAll();
    }

    public WorkerDemoParkingZones findById(int workerId) {
        Worker worker = this.workerRepository.findByWorkerId(workerId);
        return new WorkerDemoParkingZones(worker);
    }

    public List<WorkerDemo> getAllVraboteniDemos() {
        List<Worker> workers = this.workerRepository.findAll();
        List<WorkerDemo> workerDemos = new ArrayList<>();
        for (Worker w : workers){
            WorkerDemo vd = new WorkerDemo(w);
            workerDemos.add(vd);
        }
        return workerDemos;
    }

    public Optional<Worker> addWorker(String password, String confirmPass, boolean locked, String firstName, String lastName, String mobile, String email, EmployeeStatus status, List<String> parkingZones) {
        Optional<Worker> workerOpt = this.workerRepository.findWorkerByEmail(email);
        if (workerOpt.isPresent()){
            throw new IllegalArgumentException("User with that mail already exists");
        }
        Worker workerToAdd =new Worker();
        if (email != null && email.length() > 1 && email.contains("@") ) {
            workerToAdd.setEmail(email);
        } else {
            throw new IllegalStateException("email not valid");
        }
        if(!password.isEmpty()&&password.equals(confirmPass)){
            workerToAdd.setPassword(bCryptPasswordEncoder.encode(password));
        }
        workerToAdd.setLocked(locked);

        if (firstName != null && firstName.length() > 1) {
            workerToAdd.setFirstName(firstName);
        }

        if (lastName != null && lastName.length() > 1 ) {
            workerToAdd.setLastName(lastName);
        }

        if (mobile != null && mobile.length() > 0 ) {
            workerToAdd.setMobile(mobile);
        }

        workerToAdd.setStatus(status);

        if(parkingZones!=null){
            List<ParkingZone> parkingZonesAvailable =parkingZoneRepository.findAll();
            List<ParkingZone> zonesToAdd= new ArrayList<>();
            workerToAdd.setParkingZones(null);
            for(String pzName:parkingZones){
                for(ParkingZone pz :parkingZonesAvailable){
                    if(pzName.equals(pz.getPzName())) {
                        zonesToAdd.add(pz);
//                            pz.getOdgovorniLica().add(vrabotenRepository.findByVrabotenId(vrabotenId));
                    }
                }
            }
            workerToAdd.setParkingZones(zonesToAdd);
        }
        workerRepository.save(workerToAdd);
        return Optional.of(workerToAdd);
    }

    @Transactional
    public WorkerDemoParkingZones updateWorker(int workerId, String password, String confirmPass, boolean locked, String firstName, String lastName, String mobile, String email, EmployeeStatus status, List<String> parkingZones) {
        Optional<Worker> workerOpt = Optional.ofNullable(this.workerRepository.findByWorkerId(workerId));
        if (workerOpt.isPresent()) {
            if (email != null && email.length() > 1 && email.contains("@") ) {
                List<String> emails = workerRepository.findAll().stream().map(Worker::getEmail).collect(Collectors.toList());
                for(String mailToCheck :emails)
                if (email.equals(mailToCheck)&&workerOpt.get().getWorkerId()!=workerId) {
                    throw new IllegalStateException("email taken");
                }
                workerOpt.get().setEmail(email);
            } else {
                throw new IllegalStateException("email not valid");
            }
            if(!password.isEmpty()&&password.equals(confirmPass)){
                workerOpt.get().setPassword(bCryptPasswordEncoder.encode(password));
            }
            workerOpt.get().setLocked(locked);

            if (firstName != null && firstName.length() > 1 && !Objects.equals(workerOpt.get().getFirstName(), firstName)) {
                workerOpt.get().setFirstName(firstName);
            }

            if (lastName != null && lastName.length() > 1 && !Objects.equals(workerOpt.get().getLastName(), lastName)) {
                workerOpt.get().setLastName(lastName);
            }

            if (mobile != null && mobile.length() > 0 && !Objects.equals(workerOpt.get().getMobile(), mobile)) {
                workerOpt.get().setMobile(mobile);
            }

//            if (status != null && status.toString().length() > 0) {
//                if(Arrays.stream(EmployeeStatus.values()).toList().contains(EmployeeStatus.valueOf(status))){
            workerOpt.get().setStatus(status);
//                }else{
//                    throw new IllegalStateException("Please enter one of the following statuses: 'raboti', 'ne raboti', 'na odmor', 'na boleduvanje'");
//                }
//            }
            if(parkingZones!=null){
                List<ParkingZone> parkingZonesAvailable =parkingZoneRepository.findAll();
                List<ParkingZone> zonesToAdd= new ArrayList<>();
                workerOpt.get().setParkingZones(null);
                for(String pzName:parkingZones){
                    for(ParkingZone pz :parkingZonesAvailable){
                        if(pzName.equals(pz.getPzName())) {
                            zonesToAdd.add(pz);
//                            pz.getOdgovorniLica().add(vrabotenRepository.findByVrabotenId(workerId));
                        }
                    }
                }
                workerOpt.get().setParkingZones(zonesToAdd);
            }
//            VrabotenDemoParkingZones zoneToReturn = new VrabotenDemoParkingZones(workerOpt.get());
            return new WorkerDemoParkingZones(workerOpt.get());
        }
        else{
            throw new IllegalStateException("Worker doesn't exist, therefore can't be updated");
        }
    }//za menjanje password da se implementira

    @Transactional
    public Optional<Worker> deleteWorker(int workerId) {
        Optional<Worker> workerOpt = Optional.ofNullable(this.workerRepository.findByWorkerId(workerId));
        if (workerOpt.isPresent()) {
            this.workerRepository.deleteByWorkerId(workerId);
        } else {
            throw new IllegalStateException("Worker doesn't exist, therefore can't be deleted");
        }
        return workerOpt;
    }

    @Transactional
    public void lockWorkerAcc(int workerId) {
        Worker workerOpt = this.workerRepository.findByWorkerId(workerId);
        if (workerOpt !=null) {
            workerOpt.lockVraboten();
        } else {
            throw new IllegalStateException("Worker doesn't exist, therefore his account can't be locked/unlocked");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return workerRepository.findWorkerByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Email not found"));
    }

//    @Transactional
//    public void setVrabotenStatus(int vrabotenId,String vrabotenStatus) {
//        Vraboten vraboten = vrabotenRepository.findByVrabotenId(vrabotenId);
//        if(vraboten!=null && value){
//            vraboten.setStatus(valuee);
//        }
//        else {
//            throw new IllegalStateException(String.format("Vraboten with id %d does not exist.",vrabotenId));
//        }
//    }
}