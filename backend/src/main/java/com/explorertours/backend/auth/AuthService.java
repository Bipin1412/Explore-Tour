package com.explorertours.backend.auth;

import com.explorertours.backend.security.JwtService;
import com.explorertours.backend.user.AuthProvider;
import com.explorertours.backend.user.UserAccount;
import com.explorertours.backend.user.UserAccountRepository;
import java.util.Locale;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

  private final UserAccountRepository userAccountRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  public AuthService(
      UserAccountRepository userAccountRepository,
      PasswordEncoder passwordEncoder,
      JwtService jwtService
  ) {
    this.userAccountRepository = userAccountRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
  }

  public AuthResponse signup(SignupRequest request) {
    String email = normalizeEmail(request.email());
    String phoneNumber = normalizePhoneNumber(request.phoneNumber());

    if (!request.password().equals(request.confirmPassword())) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Passwords do not match.");
    }

    if (userAccountRepository.existsByEmailIgnoreCase(email)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email is already registered.");
    }

    if (userAccountRepository.existsByPhoneNumber(phoneNumber)) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Phone number is already registered.");
    }

    UserAccount user = new UserAccount();
    user.setFullName(request.fullName().trim());
    user.setEmail(email);
    user.setPhoneNumber(phoneNumber);
    user.setPasswordHash(passwordEncoder.encode(request.password()));
    user.setProvider(AuthProvider.LOCAL);

    return issueAuthResponse(userAccountRepository.save(user));
  }

  public AuthResponse login(LoginRequest request) {
    String email = normalizeEmail(request.email());
    UserAccount user = userAccountRepository.findByEmailIgnoreCase(email)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password."));

    if (user.getPasswordHash() == null || user.getPasswordHash().isBlank()) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "This account uses Google sign-in.");
    }

    if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password.");
    }

    return issueAuthResponse(user);
  }

  public AuthResponse handleGoogleLogin(String email, String fullName, String providerId) {
    String normalizedEmail = normalizeEmail(email);
    UserAccount user = userAccountRepository.findByEmailIgnoreCase(normalizedEmail)
        .orElseGet(UserAccount::new);

    user.setEmail(normalizedEmail);
    user.setFullName(fullName == null || fullName.isBlank() ? "Explorer User" : fullName.trim());
    user.setProviderId(providerId);

    if (user.getId() == null) {
      user.setProvider(AuthProvider.GOOGLE);
    }

    return issueAuthResponse(userAccountRepository.save(user));
  }

  public AuthResponse issueAuthResponse(UserAccount user) {
    return new AuthResponse(jwtService.generateToken(user), UserResponse.from(user));
  }

  private String normalizeEmail(String email) {
    return email.trim().toLowerCase(Locale.ROOT);
  }

  private String normalizePhoneNumber(String phoneNumber) {
    return phoneNumber.replaceAll("\\s+", "");
  }
}
