package parkup.services;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import parkup.configs.token.ConfirmationTokenW;
import parkup.configs.token.ConfirmationTokenService;
import parkup.data.enumerations.EmployeeStatus;
import parkup.entities.ParkingZone;
import parkup.entities.Vraboten;
import parkup.repositories.ParkingZoneRepository;
import parkup.repositories.VrabotenRepository;
import parkup.data.VrabotenDemo;

@Service
public class VrabotenService implements UserDetailsService {
    private final VrabotenRepository vrabotenRepository;
    private final ParkingZoneRepository parkingZoneRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    @Autowired
    public VrabotenService(VrabotenRepository vrabotenRepository, ParkingZoneRepository parkingZoneRepository, BCryptPasswordEncoder bCryptPasswordEncoder, ConfirmationTokenService confirmationTokenService) {
        this.vrabotenRepository = vrabotenRepository;
        this.parkingZoneRepository = parkingZoneRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.confirmationTokenService = confirmationTokenService;
    }

    public List<Vraboten> getVraboteni() {
        return this.vrabotenRepository.findAll();
    }

    public Vraboten findById(int vrabotenId) {
        Optional<Vraboten> vraboten = Optional.ofNullable(this.vrabotenRepository.findByVrabotenId(vrabotenId));
        return vraboten.orElse(null);
    }

    public List<VrabotenDemo> getAllVraboteniDemos() {
        List<Vraboten> vraboteni = this.vrabotenRepository.findAll();
        List<VrabotenDemo> vrabotenDemos = new ArrayList<>();
        for (Vraboten v : vraboteni){
            VrabotenDemo vd = new VrabotenDemo(v.getVrabotenId(),v.getFirstName(), v.getLastName(), v.getEmail());
            vrabotenDemos.add(vd);
        }
        return vrabotenDemos;
    }

    public Optional<Vraboten> addVraboten(String password,String confirmPass,boolean locked, String firstName, String lastName, String mobile, String email, EmployeeStatus status,List<String> parkingZones) {
        Optional<Vraboten> vrabotenOpt = this.vrabotenRepository.findVrabotenByEmail(email);
        if (vrabotenOpt.isPresent()){
            throw new IllegalArgumentException("User with that mail already exists");
        }
        Vraboten vrabotenToAdd=new Vraboten();
        if (email != null && email.length() > 1 && email.contains("@") ) {
            vrabotenToAdd.setEmail(email);
        } else {
            throw new IllegalStateException("email not valid");
        }
        if(password.equals(confirmPass)){
            vrabotenToAdd.setPassword(bCryptPasswordEncoder.encode(password));
        }
        vrabotenToAdd.setLocked(locked);

        if (firstName != null && firstName.length() > 1) {
            vrabotenToAdd.setFirstName(firstName);
        }

        if (lastName != null && lastName.length() > 1 ) {
            vrabotenToAdd.setLastName(lastName);
        }

        if (mobile != null && mobile.length() > 0 ) {
            vrabotenToAdd.setMobile(mobile);
        }

        vrabotenToAdd.setStatus(status);

        if(parkingZones!=null){
            List<ParkingZone> parkingZonesAvailable =parkingZoneRepository.findAll();
            List<ParkingZone> zonesToAdd= new ArrayList<>();
            vrabotenToAdd.setParkingZones(null);
            for(String pzName:parkingZones){
                for(ParkingZone pz :parkingZonesAvailable){
                    if(pzName.equals(pz.getPzName())) {
                        zonesToAdd.add(pz);
//                            pz.getOdgovorniLica().add(vrabotenRepository.findByVrabotenId(vrabotenId));
                    }
                }
            }
            vrabotenToAdd.setParkingZones(zonesToAdd);
        }
        String token = UUID.randomUUID().toString();
        ConfirmationTokenW confirmationTokenW = new ConfirmationTokenW(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                vrabotenToAdd
        );

        confirmationTokenService.saveConfirmationTokenW(confirmationTokenW);

        return Optional.of(vrabotenToAdd);
//        Optional<Vraboten> vrabotenOpt = this.vrabotenRepository.findVrabotenByEmail(vraboten.getEmail());
//        if (vrabotenOpt.isPresent()) {
//            throw new IllegalStateException("Email already taken, try adding a vraboten with a different valid email address");
//        } else {
//            if (vraboten.getEmail() != null && vraboten.getEmail().length() > 1 && vraboten.getEmail().contains("@")) {
//                //System.out.println(vraboten);
//                this.vrabotenRepository.save(vraboten);
//            }
//            else{
//                throw new IllegalStateException("email not valid");
//            }
//        }
//        return vrabotenOpt;
    }

    @Transactional
    public Vraboten updateVraboten(int vrabotenId,String password,String confirmPass,boolean locked, String firstName, String lastName, String mobile, String email, EmployeeStatus status,List<String> parkingZones) {
        Optional<Vraboten> vrabotenOpt = Optional.ofNullable(this.vrabotenRepository.findByVrabotenId(vrabotenId));
        if (vrabotenOpt.isPresent()) {

            if (email != null && email.length() > 1 && email.contains("@") ) {
                List<String> emails = vrabotenRepository.findAll().stream().map(Vraboten::getEmail).collect(Collectors.toList());
                for(String mailToCheck :emails)
                if (email.equals(mailToCheck)&&vrabotenOpt.get().getVrabotenId()!=vrabotenId) {
                    throw new IllegalStateException("email taken");
                }
                vrabotenOpt.get().setEmail(email);
            } else {
                throw new IllegalStateException("email not valid");
            }
            if(password.equals(confirmPass)){
                vrabotenOpt.get().setPassword(bCryptPasswordEncoder.encode(password));
            }
            vrabotenOpt.get().setLocked(locked);

            if (firstName != null && firstName.length() > 1 && !Objects.equals(vrabotenOpt.get().getFirstName(), firstName)) {
                vrabotenOpt.get().setFirstName(firstName);
            }

            if (lastName != null && lastName.length() > 1 && !Objects.equals(vrabotenOpt.get().getLastName(), lastName)) {
                vrabotenOpt.get().setLastName(lastName);
            }

            if (mobile != null && mobile.length() > 0 && !Objects.equals(vrabotenOpt.get().getMobile(), mobile)) {
                vrabotenOpt.get().setMobile(mobile);
            }

//            if (status != null && status.toString().length() > 0) {
//                if(Arrays.stream(EmployeeStatus.values()).toList().contains(EmployeeStatus.valueOf(status))){
            vrabotenOpt.get().setStatus(status);
//                }else{
//                    throw new IllegalStateException("Please enter one of the following statuses: 'raboti', 'ne raboti', 'na odmor', 'na boleduvanje'");
//                }
//            }
            if(parkingZones!=null){
                List<ParkingZone> parkingZonesAvailable =parkingZoneRepository.findAll();
                List<ParkingZone> zonesToAdd= new ArrayList<>();
                vrabotenOpt.get().setParkingZones(null);
                for(String pzName:parkingZones){
                    for(ParkingZone pz :parkingZonesAvailable){
                        if(pzName.equals(pz.getPzName())) {
                            zonesToAdd.add(pz);
//                            pz.getOdgovorniLica().add(vrabotenRepository.findByVrabotenId(vrabotenId));
                        }
                    }
                }
                vrabotenOpt.get().setParkingZones(zonesToAdd);
            }
            return vrabotenOpt.get();
        }
        else{
            throw new IllegalStateException("Vraboten doesn't exist, therefore can't be updated");
        }
    }//za menjanje password da se implementira

    @Transactional
    public Optional<Vraboten> deleteVraboten(int vrabotenId) {
        Optional<Vraboten> vrabotenOpt = Optional.ofNullable(this.vrabotenRepository.findByVrabotenId(vrabotenId));
        if (vrabotenOpt.isPresent()) {
            this.confirmationTokenService.deleteByVraboten_VrabotenId(vrabotenId);
            this.vrabotenRepository.deleteByVrabotenId(vrabotenId);
        } else {
            throw new IllegalStateException("Vraboten doesn't exist, therefore can't be deleted");
        }
        return vrabotenOpt;
    }

    @Transactional
    public void lockVrabotenAcc(int vrabotenId) {
        Vraboten vrabotenOpt = this.vrabotenRepository.findByVrabotenId(vrabotenId);
        if (vrabotenOpt!=null) {
            vrabotenOpt.lockVraboten();
        } else {
            throw new IllegalStateException("Vraboten doesn't exist, therefore his account can't be locked/unlocked");
        }
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return vrabotenRepository.findVrabotenByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Email not found"));
    }
    public String signUpVraboten(Vraboten vraboten){
        boolean vrabotenExists = vrabotenRepository
                .findVrabotenByEmail(vraboten.getEmail())
                .isPresent();
        if(vrabotenExists){
            // TODO check if attributes are the same and
            // TODO if email not confirmed send confirmation email

            throw new IllegalStateException("Email already taken");
        }

        String encodedPassword = bCryptPasswordEncoder
                .encode(vraboten.getPassword());

        vraboten.setPassword(encodedPassword);

        vrabotenRepository.save(vraboten);

        // TODO: Send confirmation token

        String token = UUID.randomUUID().toString();
        ConfirmationTokenW confirmationTokenW = new ConfirmationTokenW(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                vraboten
        );

        confirmationTokenService.saveConfirmationTokenW(confirmationTokenW);

        // TODO: SEND EMAIL

        return token;
    }

    public int enableVraboten(String email) {
        return vrabotenRepository.enableVraboten(email);
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