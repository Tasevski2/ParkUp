package parkup.configs.webConfigs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import parkup.configs.CustomAuthenticationFilter;
import parkup.configs.CustomAuthorizationFilter;
import parkup.services.AdministratorService;
import parkup.services.GuestService;
import parkup.services.RegisteredUserService;
import parkup.services.WorkerService;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
        private final WorkerService workerService;
        private final BCryptPasswordEncoder bCryptPasswordEncoder;
        private final RegisteredUserService registeredUserService;
        private final AdministratorService administratorService;
        private final GuestService guestService;

        public WebSecurityConfig(WorkerService workerService, BCryptPasswordEncoder bCryptPasswordEncoder, RegisteredUserService registeredUserService, AdministratorService administratorService, GuestService guestService) {
            this.workerService = workerService;
            this.bCryptPasswordEncoder = bCryptPasswordEncoder;
            this.registeredUserService = registeredUserService;
            this.administratorService = administratorService;
            this.guestService = guestService;
        }

        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
            auth.userDetailsService(registeredUserService).passwordEncoder(bCryptPasswordEncoder);
            auth.userDetailsService(workerService).passwordEncoder(bCryptPasswordEncoder);
            auth.userDetailsService(administratorService).passwordEncoder(bCryptPasswordEncoder);
            auth.userDetailsService(guestService).passwordEncoder(bCryptPasswordEncoder);
        }

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManagerBean());
            customAuthenticationFilter.setFilterProcessesUrl("/api/login");
            http.csrf().disable();
            http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());
            http.sessionManagement().sessionCreationPolicy(STATELESS);
            http.authorizeRequests().antMatchers("/**").permitAll();
            http.addFilter(customAuthenticationFilter);
            http.addFilterBefore(new CustomAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);
        }

        @Bean
        @Override
        public AuthenticationManager authenticationManagerBean() throws Exception {
            return super.authenticationManagerBean();
        }


    }
