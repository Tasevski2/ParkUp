package parkup.services;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import parkup.configs.email.EmailValidator;
import parkup.configs.token.ConfirmationTokenService;
import parkup.entities.Administrator;
import parkup.repositories.AdministratorRepository;

@Service
public class AdministratorService implements UserDetailsService {
    private final AdministratorRepository administratorRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    @Autowired
    public AdministratorService(AdministratorRepository administratorRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.administratorRepository = administratorRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public List<Administrator> getAllAdministrators() {
        return this.administratorRepository.findAll();
    }

    public Administrator findById(int administratorId) {
        Optional<Administrator> administrator = Optional.ofNullable(this.administratorRepository.findByAdministratorId(administratorId));
        return administrator.orElse(null);
    }

    public Optional<Administrator> addAdministrator(Administrator administrator) {
        Optional<Administrator> administratorOpt = this.administratorRepository.findAdministratorByEmail(administrator.getEmail());
        if (administratorOpt.isPresent()) {
            throw new IllegalStateException("Email already taken, try adding an administrator with a different valid email address");
        } else {
            if (administrator.getEmail() != null && administrator.getEmail().length() > 1 && administrator.getEmail().contains("@")) {
                administrator.setPassword(bCryptPasswordEncoder.encode(administrator.getPassword()));
                this.administratorRepository.save(administrator);
            }
            else {
                throw new IllegalStateException("email not valid");
            }
        }
        return administratorOpt;
    }

    @Transactional
    public Administrator updateAdministrator(int administratorId, String firstName, String lastName, String mobile, String email) {
        Optional<Administrator> administratorOpt = Optional.ofNullable(this.administratorRepository.findByAdministratorId(administratorId));
        if (administratorOpt.isPresent()) {
            Administrator administratorNov = this.administratorRepository.findByAdministratorId(administratorId);
            if (email != null && email.length() > 1 && email.contains("@")) {
                List<String> emails = administratorRepository.findAll().stream().map(Administrator::getEmail).collect(Collectors.toList());
                for(String mailToCheck :emails)
                    if (email.equals(mailToCheck) && administratorNov.getAdministratorId()!=administratorId) {
                        throw new IllegalStateException("email taken");
                    }
            }else{
                throw new IllegalStateException("email not valid");
            }

            if (firstName != null && firstName.length() > 1 && !Objects.equals(administratorNov.getFirstName(), firstName)) {
                administratorNov.setFirstName(firstName);
            }

            if (lastName != null && lastName.length() > 1 && !Objects.equals(administratorNov.getLastName(), lastName)) {
                administratorNov.setLastName(lastName);
            }

            if (mobile != null && mobile.length() > 0 && !Objects.equals(administratorNov.getMobile(), mobile)) {
                administratorNov.setMobile(mobile);
            }
            return administratorNov;
        }
        else {
            throw new IllegalStateException("Administrator doesn't exist, therefore can't be updated");
        }

    }

    public Optional<Administrator> deleteAdministrator(int administratorId) {
        Optional<Administrator> administratorOpt = Optional.ofNullable(this.administratorRepository.findByAdministratorId(administratorId));
        if (administratorOpt.isPresent()) {
            this.administratorRepository.deleteByAdministratorId(administratorId);
        } else {
            throw new IllegalStateException("Administrator doesn't exist, therefore can't be deleted");
        }
        return administratorOpt;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return administratorRepository.findAdministratorByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Email not found"));

    }

    public int enableAdministrator(String email) {
        return administratorRepository.enableAdministrator(email);
    }
}