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
//import parkup.services.VrabotenService;
//
//@EnableWebSecurity
//@Order(99)
//@Configuration
//public class WebSecurityConfigVraboten extends WebSecurityConfigurerAdapter {
//    private final VrabotenService vrabotenService;
//    private final BCryptPasswordEncoder bCryptPasswordEncoder;
//
//    public WebSecurityConfigVraboten(VrabotenService vrabotenService, BCryptPasswordEncoder bCryptPasswordEncoder) {
//        this.vrabotenService = vrabotenService;
//        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                .csrf().disable()
//                .authorizeRequests()
//                .antMatchers("/vraboten/registration/**")
//                .permitAll()
//                .anyRequest()
//                .authenticated()
//                .and()
//                .formLogin();//ruta na viktor
//    }
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.authenticationProvider(daoAuthenticationProviderW());
//    }
//
//    @Bean
//    public DaoAuthenticationProvider daoAuthenticationProviderW() {
//        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//        provider.setPasswordEncoder(bCryptPasswordEncoder);
//        provider.setUserDetailsService(vrabotenService);
//        return provider;
//    }
//}
