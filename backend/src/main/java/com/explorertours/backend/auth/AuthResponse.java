package com.explorertours.backend.auth;

public record AuthResponse(
    String token,
    UserResponse user
) {
}
