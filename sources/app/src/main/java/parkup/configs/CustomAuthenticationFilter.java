package parkup.configs;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import parkup.entities.Administrator;
import parkup.entities.Guest;
import parkup.entities.RegisteredUser;
import parkup.entities.Worker;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@CrossOrigin
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {
        Object principal = authentication.getPrincipal();
        String className = principal.getClass().getName().split("\\.")[2];
        String email=null;
        String fullName=null;
        Integer id =null;
        Collection<? extends GrantedAuthority> roles= new ArrayList<>();
        switch (className) {
            case "RegisteredUser": {
                RegisteredUser user = (RegisteredUser) authentication.getPrincipal();
                fullName=user.getFirstName()+" "+user.getLastName();
                email = user.getEmail();
                roles = user.getAuthorities();
                id=user.getRegParkId();
                break;
            }
            case "Worker": {
                Worker user = (Worker) authentication.getPrincipal();
                email = user.getEmail();
                fullName=user.getFirstName()+" "+user.getLastName();
                roles = user.getAuthorities();
                id=user.getWorkerId();
                break;
            }
            case "Administrator": {
                Administrator user = (Administrator) authentication.getPrincipal();
                email = user.getEmail();
                fullName=user.getFirstName()+" "+user.getLastName();
                id=user.getAdministratorId();
                roles = user.getAuthorities();
                break;
            }
            case "Guest":{
                Guest user = (Guest) authentication.getPrincipal();
                email = user.getEmail();
                fullName="GuestUser";
                id=user.getGuestId();
                roles = user.getAuthorities();
                break;
            }
        }
        //TODO see if guest needs to go through authentication
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        String access_token = JWT.create()
                .withSubject(email)
                .withClaim("fullName",fullName)
                .withClaim("id",id)
                .withExpiresAt(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
                .withIssuer(request.getRequestURL().toString())
                .withClaim("roles", roles.stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
//        String refresh_token = JWT.create()
//                .withSubject(user.getUsername())
//                .withExpiresAt(new Date(System.currentTimeMillis() + 30 * 60 * 1000))
//                .withIssuer(request.getRequestURL().toString())
//                .sign(algorithm);
        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", access_token);
//        tokens.put("refresh_token", refresh_token);
        response.setContentType(APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }
}