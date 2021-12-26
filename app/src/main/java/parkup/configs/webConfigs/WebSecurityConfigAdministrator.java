//package parkup.configs.webConfigs;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.annotation.Order;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import parkup.services.AdministratorService;
//
//@EnableWebSecurity
//@Order(101)
//@Configuration
//public class WebSecurityConfigAdministrator extends WebSecurityConfigurerAdapter {
//    private final AdministratorService administratorService;
//    private final BCryptPasswordEncoder bCryptPasswordEncoder;
//
//    public WebSecurityConfigAdministrator(AdministratorService administratorService, BCryptPasswordEncoder bCryptPasswordEncoder) {
//        this.administratorService = administratorService;
//        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()
//                .authorizeRequests()
//                .antMatchers("/administrator/registration/**")
//                .permitAll()
//                .anyRequest()
//                .authenticated().and().formLogin();//ruta na viktor
//    }
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.authenticationProvider(daoAuthenticationProviderA());
//    }
//
//    @Bean
//    public DaoAuthenticationProvider daoAuthenticationProviderA() {
//        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//        provider.setPasswordEncoder(bCryptPasswordEncoder);
//        provider.setUserDetailsService(administratorService);
//        return provider;
//    }
//}
