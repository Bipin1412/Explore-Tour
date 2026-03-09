package com.explorertours.backend.auth;

import com.explorertours.backend.user.UserAccount;

public record UserResponse(
    String id,
    String fullName,
    String email,
    String phoneNumber,
    String provider,
    String role
) {

  public static UserResponse from(UserAccount user) {
    return new UserResponse(
        user.getId(),
        user.getFullName(),
        user.getEmail(),
        user.getPhoneNumber(),
        user.getProvider().name(),
        user.getRole().name()
    );
  }
}
