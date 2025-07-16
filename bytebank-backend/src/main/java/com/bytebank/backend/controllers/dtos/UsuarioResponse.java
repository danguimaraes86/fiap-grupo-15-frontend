package com.bytebank.backend.controllers.dtos;

public record UsuarioResponse(
        Long id,
        String nome,
        String email
) {
}
