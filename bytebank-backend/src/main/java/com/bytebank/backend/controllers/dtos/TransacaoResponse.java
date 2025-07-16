package com.bytebank.backend.controllers.dtos;

import java.math.BigDecimal;

public record TransacaoResponse(
        Long id,
        String descricao,
        BigDecimal valor,
        String tipoTransacao,
        String dataCriacao,
        String categoria
) {
}
