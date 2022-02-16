package parkup.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import parkup.ParkUpApplication;
import parkup.data.ParkingZoneAdminView;
import parkup.data.ParkingZoneLocation;
import parkup.data.WorkerDemo;
import parkup.entities.ParkingSpace;
import parkup.entities.ParkingZone;
import parkup.entities.Worker;
import parkup.repositories.ParkingSessionRepository;
import parkup.repositories.ParkingSpaceRepository;
import parkup.repositories.ParkingZoneRepository;
import parkup.repositories.WorkerRepository;
import static parkup.ParkUpApplication.getToken;
import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ParkingZoneService {
    private final ParkingZoneRepository parkingZoneRepository;
    private final ParkingSpaceRepository parkingSpaceRepository;
    private final WorkerRepository workerRepository;
    private final ParkingSessionRepository parkingSessionRepository;

    @Autowired
    public ParkingZoneService(ParkingZoneRepository parkingZoneRepository, ParkingSpaceRepository parkingSpaceRepository, WorkerRepository workerRepository, ParkingSessionRepository parkingSessionRepository) {
        this.parkingZoneRepository = parkingZoneRepository;
        this.parkingSpaceRepository = parkingSpaceRepository;
        this.parkingSessionRepository = parkingSessionRepository;
        this.workerRepository = workerRepository;
    }

    public List<ParkingZone> getAllParkingZones() {
        Authentication user = getToken();
        String role =user.getAuthorities().stream().findFirst().get().getAuthority();
        String email = user.getName();
        List<ParkingZone> parkingZones;
        if(role.equals("ROLE_REG_USER"))
            parkingZones= parkingZoneRepository.findAll();
        else if(role.equals("ROLE_WORKER")){
            Worker loggedInWorker = workerRepository.findWorkerByEmail(email).orElseThrow(null);
            parkingZones= parkingZoneRepository.findAll().stream().filter(pz->loggedInWorker.getParkingZones().contains(pz)).collect(Collectors.toList());
        }else if(role.equals("ROLE_ADMIN"))
            parkingZones= parkingZoneRepository.findAll();
        else
            parkingZones=parkingZoneRepository.findAll();
        for(ParkingZone pz:parkingZones){
            setTransientVariables(pz);
        }
        return parkingZones;
    }

    public ParkingZoneAdminView findById(int parkingZoneId) {
        Optional<ParkingZone> parkingZone = Optional.ofNullable(this.parkingZoneRepository.findByPzId(parkingZoneId));
        if (!parkingZone.isPresent()) {
            throw new IllegalStateException("ParkingZone does not exist");
        }
        setTransientVariables(parkingZone.get());
        return new ParkingZoneAdminView(parkingZone.get(),getResponsibleWorkers(parkingZoneId));
    }

    public List<String> getAllParkingZoneNames() {
        List<ParkingZone> parkingZones = this.parkingZoneRepository.findAll();
        List<String> parkingZonesNames = new ArrayList<>();
        for (ParkingZone pz : parkingZones) {
            parkingZonesNames.add(pz.getPzName());
        }
        return parkingZonesNames;
    }

    public Optional<ParkingZone> addParkingZone(ParkingZone parkingZone) {   //zavisno vo koj grad ili opstina i napravi proverki pred dodavanje, implementiraj u naredna faza
        Optional<ParkingZone> parkingZoneOpt = Optional.ofNullable(parkingZoneRepository.findByPzName(parkingZone.getPzName()));
        if (parkingZoneOpt.isPresent()) {
            throw new IllegalStateException("Name already taken, try adding a ParkingZone with a different name");
        } else {
            System.out.println(parkingZone);
            parkingZoneRepository.save(parkingZone);
        }
        return parkingZoneOpt;
    }

    public ParkingZone addParkingZoneNameOnly(String name) {
        Optional<ParkingZone> parkingZoneOpt = Optional.ofNullable(parkingZoneRepository.findByPzName(name));
        if (parkingZoneOpt.isPresent()) {
            throw new IllegalStateException("Name already taken, try adding a ParkingZone with a different name");
        } else {
            ParkingZone parkingZone = new ParkingZone(name.trim());
            parkingZoneRepository.save(parkingZone);
            return parkingZone;
        }
    }

    //TODO proveri dali ima odgovorni i dokolku ima dali postojat vo bazata
    @Transactional
    public ParkingZoneAdminView updateParkingZone(int parkingZoneId, String pzName, int price,
                                         String location, int from, int to, String color,
                                         List<ParkingSpace> parkingSpaces, ParkingZoneLocation parkingZoneLocation, List<WorkerDemo> responsibleWorkers) {

        //TODO prati niza od objekti ParkingSpaces i prati objekt ParkingZoneLocation
            ParkingZone parkingZone = parkingZoneRepository.findByPzId(parkingZoneId);
            ParkingZone parkingZoneNov = parkingZoneRepository.findByPzId(parkingZoneId);
            if (parkingZoneNov!=null) {
                if (pzName != null && pzName.length() > 1) {
                    if (parkingZoneNov.getPzName().equals(pzName)&&parkingZoneNov.getId()!=parkingZoneId) {
                        throw new IllegalStateException("There is already a ParkingZone with the same name");
                    }

                    parkingZoneNov.setPzName(pzName);
                }

                if (price != 0 && !Objects.equals(parkingZoneNov.getPrice(), price)) {
                    parkingZoneNov.setPrice(price);
                }

                if (location != null && location.length() > 0 && !Objects.equals(parkingZoneNov.getAddress(), location)) {
                    parkingZoneNov.setAddress(location);
                }

                if (from != 0 && !Objects.equals(parkingZoneNov.getFrom(), from)) {
                    parkingZoneNov.setFrom(from);
                }

                if (to != 0 && !Objects.equals(parkingZoneNov.getTo(), to)) {
                    parkingZoneNov.setTo(to);
                }

                if (color != null && color.length() > 0 && !Objects.equals(parkingZoneNov.getColor(), color)) {
                    parkingZoneNov.setColor(color);
                }

                if (parkingZoneLocation != null) {
                    parkingZoneNov.setParkingZoneLocation(parkingZoneLocation);
                }

                if (!parkingSpaces.isEmpty()) {
                    List<ParkingSpace> spacesToDelete = parkingZoneNov.getParkingSpaces();
                    parkingZoneNov.setParkingSpaces(null);
                    parkingSpaceRepository.deleteAll(spacesToDelete);
                    parkingZoneNov.setParkingSpaces(parkingSpaces);
                }
                else{
                    parkingZoneNov.setParkingSpaces(new ArrayList<>());
                }
                if (!responsibleWorkers.isEmpty()) {

                    for(Integer workerId: getResponsibleWorkers(parkingZoneId).stream().map(WorkerDemo::getWorkerId).collect(Collectors.toList())){
                        workerRepository.findByWorkerId(workerId).getParkingZones().remove(parkingZone);
                    }
                    for (Integer workerId : responsibleWorkers.stream().map(WorkerDemo::getWorkerId).collect(Collectors.toList())) {
                        Worker workerToAdd = workerRepository.findByWorkerId(workerId);
                        if(workerToAdd !=null)
                        workerToAdd.getParkingZones().add(parkingZone);
                    }
                }else{
                    workerRepository.findAll().stream().filter(w->w.getParkingZones().contains(parkingZone)).forEach(w->w.getParkingZones().remove(parkingZone));
                }

                setTransientVariables(parkingZoneNov);
                return new ParkingZoneAdminView(parkingZoneNov,getResponsibleWorkers(parkingZoneId));
            } else {
                throw new IllegalStateException("There ParkingZone does not exist");
            }
        }


        @Transactional
        public Optional<ParkingZone> deleteParkingZone ( int parkingZoneId){
            Optional<ParkingZone> parkingZoneOpt = Optional.ofNullable(parkingZoneRepository.findByPzId(parkingZoneId));
            if (parkingZoneOpt.isPresent()) {
                parkingZoneOpt.get().setParkingSpaces(null);
                parkingZoneOpt.get().setParkingZoneLocation(null);
                workerRepository.findAll().stream().filter(w->w.getParkingZones().contains(parkingZoneOpt.get())).forEach(w->w.getParkingZones().remove(parkingZoneOpt.get()));
                parkingZoneRepository.deleteByPzId(parkingZoneId);
            } else {
                throw new IllegalStateException("ParkingZone doesn't exist, therefore can't be deleted");
            }
            return parkingZoneOpt;
        }

        public int calculateTakenSpaces(int pzId){
            ParkingZone parkingZone=parkingZoneRepository.findByPzId(pzId);
            return (int)parkingZone.getParkingSpaces().stream().filter(ParkingSpace::isTaken).count();
        }
        public int calculateCapacity(int pzId){
            ParkingZone parkingZone=parkingZoneRepository.findByPzId(pzId);
            return parkingZone.getParkingSpaces().size();
        }
        public void setTransientVariables(ParkingZone pz){
            pz.setCapacity(calculateCapacity(pz.getId()));
            pz.setTakenSpaces(calculateTakenSpaces(pz.getId()));
            pz.setResponsibleWorkers(getWorkers(pz.getId()));
        }
        public List<WorkerDemo> getResponsibleWorkers(int pzId){
            ParkingZone parkingZone =parkingZoneRepository.findByPzId(pzId);
            return workerRepository.findAll().stream().filter(w->w.getParkingZones().contains(parkingZone)).map(WorkerDemo::new).collect(Collectors.toList());
        }
        public List<String> getWorkers(int pzId){
            ParkingZone parkingZone =parkingZoneRepository.findByPzId(pzId);
            return workerRepository.findAll().stream().filter(w->w.getParkingZones().contains(parkingZone)).map(w->w.getFirstName() + " " + w.getLastName()).collect(Collectors.toList());

        }

        public ParkingZone getParkingZoneByName(String parkingZoneName){
            ParkingZone parkingZone=parkingZoneRepository.findByPzName(parkingZoneName);
            if(parkingZone==null)
                throw new IllegalStateException("No such parking zone exists");
            setTransientVariables(parkingZone);
            return parkingZone;
        }
    }

