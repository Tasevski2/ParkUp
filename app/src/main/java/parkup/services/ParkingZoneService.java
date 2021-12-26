package parkup.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parkup.data.ParkingZoneLocation;
import parkup.entities.ParkingSession;
import parkup.entities.ParkingSpace;
import parkup.entities.ParkingZone;
import parkup.entities.Vraboten;
import parkup.repositories.ParkingSessionRepository;
import parkup.repositories.ParkingSpaceRepository;
import parkup.repositories.ParkingZoneRepository;
import parkup.repositories.VrabotenRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ParkingZoneService {
    private final ParkingZoneRepository parkingZoneRepository;
    private final ParkingSpaceRepository parkingSpaceRepository;
    private final VrabotenRepository vrabotenRepository;
    private final ParkingSessionRepository parkingSessionRepository;

    @Autowired
    public ParkingZoneService(ParkingZoneRepository parkingZoneRepository, ParkingSpaceRepository parkingSpaceRepository, VrabotenRepository vrabotenRepository, ParkingSessionRepository parkingSessionRepository) {
        this.parkingZoneRepository = parkingZoneRepository;
        this.parkingSpaceRepository = parkingSpaceRepository;
        this.parkingSessionRepository = parkingSessionRepository;
        this.vrabotenRepository = vrabotenRepository;
    }

    public List<ParkingZone> getAllParkingZones() {
        return parkingZoneRepository.findAll();
    }

    public ParkingZone findById(int parkingZoneId) {
        Optional<ParkingZone> parkingZone = Optional.ofNullable(this.parkingZoneRepository.findByPzId(parkingZoneId));
        return parkingZone.orElse(null);
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
    public ParkingZone updateParkingZone(int parkingZoneId, String pzName, int price,
                                         String location, int from, int to, String color,
                                         List<ParkingSpace> parkingSpaces, ParkingZoneLocation parkingZoneLocation, List<Integer> odgovorniLica) {

        //TODO prati niza od objekti ParkingSpaces i prati objekt ParkingZoneLocation

            ParkingZone parkingZoneNov = parkingZoneRepository.findByPzId(parkingZoneId);
            if (parkingZoneNov!=null) {
                if (pzName != null && pzName.length() > 1) { ;
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
                    ParkingZone parkingZone = parkingZoneRepository.findByPzId(parkingZoneId);
//                    for(ParkingSpace space :parkingZone.getParkingSpaces()){
//                        if(!parkingSpaces.contains(space)){
//                            for(ParkingSession session: parkingSessionRepository.findByParkingZonePzName(pzName)){
//                                if(session.getParkingSpace().getPsId()==space.getPsId())
//                                    throw new IllegalStateException("Vlegov vo iffot");
//                            }
//                        }
//                    }
                    //TODO: treba da se opravi 
                    parkingZone.setParkingSpaces(null);
                    List<ParkingSpace> spacesToAdd = new ArrayList<>(parkingSpaces);
                    parkingZone.setParkingSpaces(spacesToAdd);
                }
                if (!odgovorniLica.isEmpty()) {
                    ParkingZone parkingZone = parkingZoneRepository.findByPzId(parkingZoneId);
                    for (Integer vrabotenId : odgovorniLica) {
                        Vraboten vrabotenToAdd = vrabotenRepository.findByVrabotenId(vrabotenId);
                        if(vrabotenToAdd!=null)
                        vrabotenToAdd.getParkingZones().add(parkingZone);
                    }
                }


                return parkingZoneNov;
            } else {
                throw new IllegalStateException("There ParkingZone does not exist");
            }
        }


        @Transactional
        public Optional<ParkingZone> deleteParkingZone ( int parkingZoneId){
            Optional<ParkingZone> parkingZoneOpt = Optional.ofNullable(parkingZoneRepository.findByPzId(parkingZoneId));
            if (parkingZoneOpt.isPresent()) {
                parkingZoneRepository.deleteByPzId(parkingZoneId);
            } else {
                throw new IllegalStateException("ParkingZone doesn't exist, therefore can't be deleted");
            }
            return parkingZoneOpt;
        }
    }

