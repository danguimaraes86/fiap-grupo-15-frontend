package com.bytebank.backend.configs;

import com.bytebank.backend.repositories.UsuarioRepository;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${oauth.jwt.secret}")
    private String secretKey;

    @Value("${cors.allowed-origins}")
    private List<String> allowedOrigins;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(CsrfConfigurer::disable)
//                .cors(cors -> cors.configurationSource(request -> {
//                    CorsConfiguration corsConfiguration = new CorsConfiguration();
//                    corsConfiguration.setAllowedOrigins(allowedOrigins);
//                    corsConfiguration.addAllowedMethod("*");
//                    corsConfiguration.addAllowedHeader("*");
//                    return corsConfiguration;
//                }))
                .authorizeHttpRequests(requests -> requests
                        .requestMatchers(HttpMethod.POST, "/user").permitAll()
                        .requestMatchers(HttpMethod.POST, "/user/token").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth ->
                        oauth.jwt(Customizer.withDefaults()))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }

    @Bean
    public JwtDecoder jwtDecoder(UsuarioRepository usuarioRepository) {
        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withSecretKey(Keys.hmacShaKeyFor(secretKey.getBytes())).build();
//        jwtDecoder.setJwtValidator(JwtValidators.createDefaultWithValidators(new JwtCustomValidator(userRepository)));
        return jwtDecoder;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}