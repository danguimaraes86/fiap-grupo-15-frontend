package com.bytebank.backend.controllers.dtos;

import com.bytebank.backend.models.Categoria;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record TransacaoRequest(
        @NotBlank String descricao,
        @PositiveOrZero @NotNull BigDecimal valor,
        @NotBlank String tipoTransacao,
        Categoria categoria
) {
}
