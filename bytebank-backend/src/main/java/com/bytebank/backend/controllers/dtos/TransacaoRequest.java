package com.bytebank.backend.controllers.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record TransacaoRequest(
        @NotBlank String descricao,
        @PositiveOrZero @NotNull BigDecimal valor,
        @NotBlank String tipoTransacao,
        String categoria
) {
}
