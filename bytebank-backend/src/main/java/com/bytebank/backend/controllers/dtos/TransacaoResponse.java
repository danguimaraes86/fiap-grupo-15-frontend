package com.bytebank.backend.controllers.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.math.BigDecimal;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record TransacaoResponse(
        Long id,
        String descricao,
        BigDecimal valor,
        String tipoTransacao,
        String dataCriacao,
        String categoria,
        String anexoId
) {
}
