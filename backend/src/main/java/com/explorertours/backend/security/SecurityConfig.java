package com.explorertours.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final JwtAuthenticationFilter jwtAuthenticationFilter;
  private final OAuth2AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler;
  private final OAuth2AuthenticationFailureHandler oauth2AuthenticationFailureHandler;
  private final String googleClientId;

  public SecurityConfig(
      JwtAuthenticationFilter jwtAuthenticationFilter,
      OAuth2AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler,
      OAuth2AuthenticationFailureHandler oauth2AuthenticationFailureHandler,
      @Value("${GOOGLE_CLIENT_ID:}") String googleClientId
  ) {
    this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    this.oauth2AuthenticationSuccessHandler = oauth2AuthenticationSuccessHandler;
    this.oauth2AuthenticationFailureHandler = oauth2AuthenticationFailureHandler;
    this.googleClientId = googleClientId;
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(AbstractHttpConfigurer::disable)
        .cors(Customizer.withDefaults())
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
        .authorizeHttpRequests(authorize -> authorize
            .requestMatchers(
                "/api/auth/login",
                "/api/auth/signup",
                "/oauth2/**",
                "/login/oauth2/**",
                "/error"
            )
            .permitAll()
            .anyRequest()
            .authenticated()
        )
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    if (googleClientId != null && !googleClientId.isBlank()) {
      http.oauth2Login(oauth2 -> oauth2
          .successHandler(oauth2AuthenticationSuccessHandler)
          .failureHandler(oauth2AuthenticationFailureHandler)
      );
    }

    return http.build();
  }
}
