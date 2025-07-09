package com.bytebank.backend.controllers.dtos;

import java.math.BigDecimal;

public record TransacaoResponse(
        String descricao,
        BigDecimal valor,
        String tipoTransacao,
        BigDecimal saldo
) {
}
