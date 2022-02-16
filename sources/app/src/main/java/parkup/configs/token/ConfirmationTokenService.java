package parkup.configs.token;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ConfirmationTokenService {

    private final ConfirmationTokenRepositoryRP confirmationTokenRepositoryRP;


    public ConfirmationTokenService(ConfirmationTokenRepositoryRP confirmationTokenRepositoryRP) {
        this.confirmationTokenRepositoryRP = confirmationTokenRepositoryRP;
    }
    public void saveConfirmationTokenRP(ConfirmationTokenRP token){
        confirmationTokenRepositoryRP.save(token);
    }


    public Optional<ConfirmationTokenRP> getTokenRP(String token) {
        return confirmationTokenRepositoryRP.findByToken(token);
    }

    public void deleteByRegisteredUser_RegParkId(int regParkId){
        confirmationTokenRepositoryRP.deleteByRegisteredUser_RegParkId(regParkId);
    }

    public int setConfirmedAtRP(String token) {
        return confirmationTokenRepositoryRP.updateConfirmedAt(token, LocalDateTime.now());
    }
}
