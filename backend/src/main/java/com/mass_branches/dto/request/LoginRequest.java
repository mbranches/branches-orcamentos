package com.mass_branches.dto.request;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest (
        @NotBlank(message = "The field 'email' is required")
        String email,
        @NotBlank(message = "The field 'password' is required")
        String password
) {
}
