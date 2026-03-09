package com.explorertours.backend.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record SignupRequest(
    @NotBlank(message = "Full name is required")
    @Size(min = 2, max = 120, message = "Full name must be between 2 and 120 characters")
    String fullName,
    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    String email,
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[0-9]{10,15}$", message = "Phone number must contain 10 to 15 digits")
    String phoneNumber,
    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 80, message = "Password must be between 8 and 80 characters")
    String password,
    @NotBlank(message = "Confirm password is required")
    String confirmPassword
) {
}
