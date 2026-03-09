package com.explorertours.backend.security;

import com.explorertours.backend.auth.AuthResponse;
import com.explorertours.backend.auth.AuthService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private final AuthService authService;

  @Value("${app.frontend-base-url:http://localhost:3000}")
  private String frontendBaseUrl;

  public OAuth2AuthenticationSuccessHandler(AuthService authService) {
    this.authService = authService;
  }

  @Override
  public void onAuthenticationSuccess(
      HttpServletRequest request,
      HttpServletResponse response,
      Authentication authentication
  ) throws IOException, ServletException {
    OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
    String email = stringValue(oauthUser.getAttribute("email"));
    String fullName = stringValue(oauthUser.getAttribute("name"));
    String providerId = stringValue(oauthUser.getAttribute("sub"));

    if (email == null || email.isBlank()) {
      getRedirectStrategy().sendRedirect(
          request,
          response,
          frontendBaseUrl + "/login?error=google_email_missing"
      );
      return;
    }

    AuthResponse authResponse = authService.handleGoogleLogin(email, fullName, providerId);
    String redirectUrl = UriComponentsBuilder.fromUriString(frontendBaseUrl + "/auth/callback")
        .queryParam("token", authResponse.token())
        .build(true)
        .toUriString();

    getRedirectStrategy().sendRedirect(request, response, redirectUrl);
  }

  private String stringValue(Object value) {
    return value instanceof String string ? string : null;
  }
}
