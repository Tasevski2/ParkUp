package parkup.configs.webConfigs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import parkup.services.RegistriranParkiracService;
import parkup.services.VrabotenService;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
        private final VrabotenService vrabotenService;
        private final BCryptPasswordEncoder bCryptPasswordEncoder;
        private final RegistriranParkiracService registriranParkiracService;

        public WebSecurityConfig(VrabotenService vrabotenService, BCryptPasswordEncoder bCryptPasswordEncoder, RegistriranParkiracService registriranParkiracService) {
            this.vrabotenService = vrabotenService;
            this.bCryptPasswordEncoder = bCryptPasswordEncoder;
            this.registriranParkiracService = registriranParkiracService;
        }

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http
                    .csrf().disable()
                    .authorizeRequests()
                        .antMatchers("/registriranParkirac/registration/**")
                        .permitAll()
                    .anyRequest()
                    .authenticated().and().formLogin();//ruta na viktor
        }

        @Override
        protected void configure(AuthenticationManagerBuilder auth) throws Exception {
            auth.authenticationProvider(daoAuthenticationProviderW());
            auth.authenticationProvider(daoAuthenticationProviderRP());
        }

        @Bean
        public DaoAuthenticationProvider daoAuthenticationProviderW() {
            DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
            provider.setPasswordEncoder(bCryptPasswordEncoder);
            provider.setUserDetailsService(vrabotenService);
            return provider;
        }

        @Bean
        public DaoAuthenticationProvider daoAuthenticationProviderRP(){
            DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
            provider.setPasswordEncoder(bCryptPasswordEncoder);
            provider.setUserDetailsService(registriranParkiracService);
            return provider;
        }

    }
