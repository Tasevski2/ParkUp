package parkup.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import parkup.entities.ParkingSpace;
import parkup.repositories.ParkingSpaceRepository;
import parkup.repositories.ParkingZoneRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ParkingSpaceService {
    private final ParkingSpaceRepository parkingSpaceRepository;
    private final ParkingZoneRepository parkingZoneRepository;

    @Autowired
    public ParkingSpaceService(ParkingSpaceRepository parkingSpaceRepository, ParkingZoneRepository parkingZoneRepository) {
        this.parkingSpaceRepository = parkingSpaceRepository;
        this.parkingZoneRepository = parkingZoneRepository;
    }

    public List<ParkingSpace> getAllParkingSpaces() {
        return parkingSpaceRepository.findAll();
    }

    public ParkingSpace findById(int parkingSpaceId) {
        Optional<ParkingSpace> parkingSpaceOpt = Optional.ofNullable(parkingSpaceRepository.findByPsId(parkingSpaceId));
        return parkingSpaceOpt.orElse(null);
    }

    public Optional<ParkingSpace> addParkingSpace(ParkingSpace parkingSpace,int parkingZoneId) {
        List<String> names = parkingZoneRepository.findByPzId(parkingZoneId).getParkingSpaces().stream().map(ParkingSpace::getPsName).collect(Collectors.toList());
        if (names.contains(parkingSpace.getPsName())) {
            throw new IllegalStateException("Name already taken, try adding a ParkingSpace with a different name");
        } else {
            System.out.println(parkingSpace);
            parkingSpaceRepository.save(parkingSpace);
        }
        return Optional.of(parkingSpace);
    }

    @Transactional
    public ParkingSpace updateParkingSpace(int parkingSpaceId, String psName, boolean taken, float lat, float lng) {
        Optional<ParkingSpace> ParkingSpaceOpt = Optional.ofNullable(parkingSpaceRepository.findByPsId(parkingSpaceId));
        if (ParkingSpaceOpt.isPresent()) {
            ParkingSpace ParkingSpaceNov = parkingSpaceRepository.findByPsId(parkingSpaceId);
            if (psName != null && psName.length() > 1 && !Objects.equals(ParkingSpaceNov.getPsName(), psName)) {
                Optional<ParkingSpace> parkingSpaceOpt1 = Optional.ofNullable(parkingSpaceRepository.findByPsName(psName));
                if (parkingSpaceOpt1.isPresent()) {
                    throw new IllegalStateException("There is already a ParkingSpace with the same name");
                }

                ParkingSpaceNov.setPsName(psName);
            }

            if (!Objects.equals(ParkingSpaceNov.isTaken(), taken)) {
                ParkingSpaceNov.setTaken(taken);
            }


            if(lat!=0 && !Objects.equals(ParkingSpaceNov.getLat(), lat)){
                ParkingSpaceNov.setLat(lat);
            }

            if(lng!=0 && !Objects.equals(ParkingSpaceNov.getLng(), lng)){
                ParkingSpaceNov.setLng(lng);
            }
            return ParkingSpaceNov;
        }else{
            throw new IllegalStateException("ParkingSpace does not exist");
        }
    }

    @Transactional
    public Optional<ParkingSpace> deleteParkingSpace(int parkingSpaceId) {
        Optional<ParkingSpace> parkingSpaceOpt = Optional.ofNullable(parkingSpaceRepository.findByPsId(parkingSpaceId));
        if (parkingSpaceOpt.isPresent()) {
            parkingSpaceRepository.deleteByPsId(parkingSpaceId);
        } else {
            throw new IllegalStateException("ParkingSpace doesn't exist, therefore can't be deleted");
        }
        return parkingSpaceOpt;
    }
    public long getNumberOfTakenSpaces(){
        return parkingSpaceRepository.findAll().stream().filter(ParkingSpace::isTaken).count();
    }
}
