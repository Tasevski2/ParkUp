package parkup.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import parkup.ParkUpApplication;
import parkup.configs.email.EmailValidator;
import parkup.configs.token.ConfirmationTokenRP;
import parkup.configs.token.ConfirmationTokenService;
import parkup.data.Plate;
import parkup.entities.RegisteredUser;
import parkup.repositories.PlateRepository;
import parkup.repositories.RegisteredUserRepository;

@Service
public class RegisteredUserService implements UserDetailsService {
    private final RegisteredUserRepository registeredUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final EmailValidator emailValidator;
    private final PlateRepository plateRepository;
    @Autowired
    public RegisteredUserService(RegisteredUserRepository registeredUserRepository, BCryptPasswordEncoder bCryptPasswordEncoder, ConfirmationTokenService confirmationTokenService, EmailValidator emailValidator, PlateRepository plateRepository) {
        this.registeredUserRepository = registeredUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.confirmationTokenService = confirmationTokenService;
        this.emailValidator = emailValidator;
        this.plateRepository = plateRepository;
    }

    public List<RegisteredUser> getRegPark() {
        return this.registeredUserRepository.findAll();
    }

    public Optional<RegisteredUser> addRegPark(RegisteredUser regPark) {
        Optional<RegisteredUser> regParkOpt = this.registeredUserRepository.findRegisteredUserByEmail(regPark.getEmail());
        if (regParkOpt.isPresent()) {
            throw new IllegalStateException("Email already taken, try adding a registriranParkirac with a different valid email address");
        } else {
            if (regPark.getEmail() != null && regPark.getEmail().length() > 1 && regPark.getEmail().contains("@")) {
                this.registeredUserRepository.save(regPark);
            }
            else {
                throw new IllegalStateException("email not valid");
            }
        }
        return regParkOpt;
    }

    @Transactional
    public RegisteredUser updateRegPark(int regParkId,String password, String name, String surname, String mobile, String email) {
        Optional<RegisteredUser> regParkOpt = Optional.ofNullable(this.registeredUserRepository.findByRegParkId(regParkId));
        if (regParkOpt.isPresent()) {
            RegisteredUser regParkNov = this.registeredUserRepository.findByRegParkId(regParkId);
            if (email != null && email.length() > 1 && email.contains("@") && !Objects.equals(regParkNov.getEmail(), email)) {
                Optional<RegisteredUser> userOpt1 = this.registeredUserRepository.findRegisteredUserByEmail(email);
                if (userOpt1.isPresent()) {
                    throw new IllegalStateException("email taken");
                }

                regParkNov.setEmail(email);
            }
            if(!password.isEmpty()){
                regParkNov.setPassword(bCryptPasswordEncoder.encode(password));
            }
            if (name != null && name.length() > 1 && !Objects.equals(regParkNov.getFirstName(), name)) {
                regParkNov.setFirstName(name);
            }

            if (surname != null && surname.length() > 1 && !Objects.equals(regParkNov.getLastName(), surname)) {
                regParkNov.setLastName(surname);
            }

            if (mobile != null && mobile.length() > 0 && !Objects.equals(regParkNov.getMobile(), mobile)) {
                regParkNov.setMobile(mobile);
            }
            return regParkNov;
        }else{
            throw new IllegalStateException("RegistriranParkirac doesn't exist, therefore can't be updated");
        }
    }

    @Transactional
    @Modifying
    public Optional<RegisteredUser> deleteRegPark(int regParkId) {
        Optional<RegisteredUser> regPark = Optional.ofNullable(this.registeredUserRepository.findByRegParkId(regParkId));
        if (regPark.isPresent()) {
            //TODO da povikamo metod od ConfirmationTokenService za brisenje na ConfirmationTokenRP *DONE
            //TODO da se izbrisat tablicki i da ne se dupliraat istite tablicki pri update ili add na nov registriranParkirac
            this.confirmationTokenService.deleteByRegisteredUser_RegParkId(regParkId);
            this.registeredUserRepository.deleteByRegParkId(regParkId);
        } else {
            throw new IllegalStateException("RegistriranParkirac doesn't exist, therefore can't be deleted");
        }
        return regPark;
    }

    public RegisteredUser findById(int regParkId) {
        Optional<RegisteredUser> regPark = Optional.ofNullable(this.registeredUserRepository.findByRegParkId(regParkId));
        return regPark.orElse(null);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return registeredUserRepository.findRegisteredUserByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Email not found"));

    }

    public String signUpRegistriranParkirac(RegisteredUser registeredUser){
        if (registeredUser.getEmail() == null || registeredUser.getEmail().isEmpty())
            throw new IllegalArgumentException("Empty email");
        if (!emailValidator.test(registeredUser.getEmail()))
            throw new IllegalArgumentException("Invalid email");
        boolean registriranParkiracExists = registeredUserRepository
                .findRegisteredUserByEmail(registeredUser.getEmail())
                .isPresent();
        if(registriranParkiracExists){
            throw new IllegalStateException("Email already taken");
        }

        String encodedPassword = bCryptPasswordEncoder
                .encode(registeredUser.getPassword());

        registeredUser.setPassword(encodedPassword);

        registeredUserRepository.save(registeredUser);

        String token = UUID.randomUUID().toString();
        ConfirmationTokenRP confirmationTokenRP = new ConfirmationTokenRP(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                registeredUser
        );

        confirmationTokenService.saveConfirmationTokenRP(confirmationTokenRP);

        return token;
    }

    public int enableRegistriranParkirac(String email) {
        return registeredUserRepository.enableRegisteredUser(email);
    }

    @Transactional
    public String addTablica(int regParkId, Plate plate) {
        RegisteredUser user = registeredUserRepository.findByRegParkId(regParkId);
        user.getPlates().add(plate);
        return plate.getPlate();
    }
    @Transactional
    public String deleteTablica(int regParkId, String plate) {
        RegisteredUser user = registeredUserRepository.findByRegParkId(regParkId);
        Plate p = plateRepository.findByPlate(plate);
        user.getPlates().remove(p);
        return plate;
    }

    public List<String> getTablici() {
        Authentication role = ParkUpApplication.getToken();
        return registeredUserRepository.findRegisteredUserByEmail(role.getName()).get().getPlates().stream().map(Plate::getPlate).collect(Collectors.toList());
    }
}
