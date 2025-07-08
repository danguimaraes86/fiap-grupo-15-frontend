package com.bytebank.backend.controllers.dtos;

import jakarta.validation.constraints.NotBlank;

public record RegistrationRequest(
        @NotBlank String nome,
        @NotBlank String email,
        @NotBlank String password
) {
}
