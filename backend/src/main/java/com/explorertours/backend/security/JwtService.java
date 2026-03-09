package com.explorertours.backend.security;

import com.explorertours.backend.user.UserAccount;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

  private final SecretKey secretKey;
  private final long expirationMinutes;

  public JwtService(
      @Value("${app.jwt.secret}") String secret,
      @Value("${app.jwt.expiration-minutes:1440}") long expirationMinutes
  ) {
    this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    this.expirationMinutes = expirationMinutes;
  }

  public String generateToken(UserAccount user) {
    Instant now = Instant.now();

    return Jwts.builder()
        .subject(user.getId())
        .claim("email", user.getEmail())
        .claim("name", user.getFullName())
        .claim("phoneNumber", user.getPhoneNumber())
        .claim("provider", user.getProvider().name())
        .claim("role", user.getRole().name())
        .issuedAt(Date.from(now))
        .expiration(Date.from(now.plus(expirationMinutes, ChronoUnit.MINUTES)))
        .signWith(secretKey)
        .compact();
  }

  public String extractUserId(String token) {
    return parseClaims(token).getSubject();
  }

  public boolean isTokenValid(String token, UserAccount user) {
    Claims claims = parseClaims(token);
    return user.getId().equals(claims.getSubject()) && claims.getExpiration().after(new Date());
  }

  private Claims parseClaims(String token) {
    return Jwts.parser()
        .verifyWith(secretKey)
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }
}
