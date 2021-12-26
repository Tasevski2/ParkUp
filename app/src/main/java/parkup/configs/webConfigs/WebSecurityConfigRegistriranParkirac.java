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
//import parkup.services.RegistriranParkiracService;
//
//@EnableWebSecurity
//@Order(100)
//@Configuration
//public class WebSecurityConfigRegistriranParkirac extends WebSecurityConfigurerAdapter {
//    private final BCryptPasswordEncoder bCryptPasswordEncoder;
//    private final RegistriranParkiracService registriranParkiracService;
//
//    public WebSecurityConfigRegistriranParkirac(RegistriranParkiracService registriranParkiracService, BCryptPasswordEncoder bCryptPasswordEncoder) {
//        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
//        this.registriranParkiracService = registriranParkiracService;
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()
//                .authorizeRequests()
//                .antMatchers("/registriranParkirac/registration/**")
//                .permitAll()
//                .anyRequest()
//                .authenticated().and().formLogin();//ruta na viktor
//    }
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.authenticationProvider(daoAuthenticationProviderRP());
//    }
//
//    @Bean
//    public DaoAuthenticationProvider daoAuthenticationProviderRP(){
//        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//        provider.setPasswordEncoder(bCryptPasswordEncoder);
//        provider.setUserDetailsService(registriranParkiracService);
//        return provider;
//    }
//}
