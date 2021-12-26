package parkup.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import parkup.configs.email.EmailValidator;
import parkup.configs.token.ConfirmationTokenRP;
import parkup.configs.token.ConfirmationTokenService;
import parkup.data.Tablicka;
import parkup.entities.RegistriranParkirac;
import parkup.repositories.RegistriranParkiracRepository;

@Service
public class RegistriranParkiracService implements UserDetailsService {
    private final RegistriranParkiracRepository registriranParkiracRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private EmailValidator emailValidator;

    @Autowired
    public RegistriranParkiracService(RegistriranParkiracRepository registriranParkiracRepository, BCryptPasswordEncoder bCryptPasswordEncoder, ConfirmationTokenService confirmationTokenService) {
        this.registriranParkiracRepository = registriranParkiracRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.confirmationTokenService = confirmationTokenService;
    }

    public List<RegistriranParkirac> getRegPark() {
        return this.registriranParkiracRepository.findAll();
    }

    public Optional<RegistriranParkirac> addRegPark(RegistriranParkirac regPark) {
        Optional<RegistriranParkirac> regParkOpt = this.registriranParkiracRepository.findRegistriranParkiracByEmail(regPark.getEmail());
        if (regParkOpt.isPresent()) {
            throw new IllegalStateException("Email already taken, try adding a registriranParkirac with a different valid email address");
        } else {
            if (regPark.getEmail() != null && regPark.getEmail().length() > 1 && regPark.getEmail().contains("@")) {
                //System.out.println(regPark);
                this.registriranParkiracRepository.save(regPark);
            }
            else {
                throw new IllegalStateException("email not valid");
            }
        }
        return regParkOpt;
    }

    @Transactional
    public RegistriranParkirac updateRegPark(int regParkId, String name, String surname, String mobile, String email,List<Tablicka> regTablicki) {
        Optional<RegistriranParkirac> regParkOpt = Optional.ofNullable(this.registriranParkiracRepository.findByRegParkId(regParkId));
        if (regParkOpt.isPresent()) {
            RegistriranParkirac regParkNov = this.registriranParkiracRepository.findByRegParkId(regParkId);
            if (email != null && email.length() > 1 && email.contains("@") && !Objects.equals(regParkNov.getEmail(), email)) {
                Optional<RegistriranParkirac> userOpt1 = this.registriranParkiracRepository.findRegistriranParkiracByEmail(email);
                if (userOpt1.isPresent()) {
                    throw new IllegalStateException("email taken");
                }

                regParkNov.setEmail(email);
            }

            if (name != null && name.length() > 1 && !Objects.equals(regParkNov.getName(), name)) {
                regParkNov.setName(name);
            }

            if (surname != null && surname.length() > 1 && !Objects.equals(regParkNov.getSurname(), surname)) {
                regParkNov.setSurname(surname);
            }

            if (mobile != null && mobile.length() > 0 && !Objects.equals(regParkNov.getMobile(), mobile)) {
                regParkNov.setMobile(mobile);
            }
            regParkNov.setRegTablicki(regTablicki);
            return regParkNov;
        }else{
            throw new IllegalStateException("RegistriranParkirac doesn't exist, therefore can't be updated");
        }
    }

    @Transactional
    @Modifying
    public Optional<RegistriranParkirac> deleteRegPark(int regParkId) {
        Optional<RegistriranParkirac> regPark = Optional.ofNullable(this.registriranParkiracRepository.findByRegParkId(regParkId));
        if (regPark.isPresent()) {
            //TODO da se izbrisat tablicki i da ne se dupliraat istite tablicki pri update ili add na nov registriranParkirac
            this.confirmationTokenService.deleteByRegistriranParkirac_RegParkId(regParkId);
            this.registriranParkiracRepository.deleteByRegParkId(regParkId);
        } else {
            throw new IllegalStateException("RegistriranParkirac doesn't exist, therefore can't be deleted");
        }
        return regPark;
    }

    public RegistriranParkirac findById(int regParkId) {
        Optional<RegistriranParkirac> regPark = Optional.ofNullable(this.registriranParkiracRepository.findByRegParkId(regParkId));
        return regPark.orElse(null);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return registriranParkiracRepository.findRegistriranParkiracByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Email not found"));

    }

    public String signUpRegistriranParkirac(RegistriranParkirac registriranParkirac){
        boolean registriranParkiracExists = registriranParkiracRepository
                .findRegistriranParkiracByEmail(registriranParkirac.getEmail())
                .isPresent();
        if(registriranParkiracExists){
            // TODO check if attributes are the same and
            // TODO if email not confirmed send confirmation email

            throw new IllegalStateException("Email already taken");
        }

        String encodedPassword = bCryptPasswordEncoder
                .encode(registriranParkirac.getPassword());

        registriranParkirac.setPassword(encodedPassword);

        registriranParkiracRepository.save(registriranParkirac);

        // TODO: Send confirmation token

        String token = UUID.randomUUID().toString();
        ConfirmationTokenRP confirmationTokenRP = new ConfirmationTokenRP(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                registriranParkirac
        );

        confirmationTokenService.saveConfirmationTokenRP(confirmationTokenRP);

        // TODO: SEND EMAIL

        return token;
    }

    public int enableRegistriranParkirac(String email) {
        return registriranParkiracRepository.enableRegistriranParkirac(email);
    }
}
