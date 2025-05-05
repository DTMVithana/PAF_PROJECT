package com.PAF.CookingPostAdding.auth.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // 1) enable CORS support
            .cors().and()
            // 2) disable CSRF for simplicity in dev
            .csrf().disable()
            // 3) configure URL permissions
            .authorizeHttpRequests()
                // <-- Permit only these two endpoints
                .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()
                // everything else needs authentication
                .anyRequest().authenticated()
            .and()
            // 4) enable HTTP Basic (optional, but helps for testing)
            .httpBasic();

        return http.build();
    }

    /** 
     * Declare a CorsFilter bean so that Spring Security’s cors() picks it up 
     * and adds the proper Access-Control-Allow-* headers on every response.
     */
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        // allow your React app’s origin
        config.addAllowedOrigin("http://localhost:3000");
        // allow all headers (Content-Type, Authorization, etc.)
        config.addAllowedHeader("*");
        // allow all HTTP methods
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // apply this CORS config to every endpoint
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
