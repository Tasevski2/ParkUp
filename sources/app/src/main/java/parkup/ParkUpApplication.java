package parkup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@SpringBootApplication
public class ParkUpApplication {
    public ParkUpApplication() {
    }

    public static void main(String[] args) {
        SpringApplication.run(ParkUpApplication.class, args);
    }

    @Bean
    public static Authentication getToken() {
        Authentication token = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && !authentication.getAuthorities().stream().findFirst().get().getAuthority().equals("ROLE_ANONYMOUS")) {
            token = authentication;
        }
        return token;
    }
}