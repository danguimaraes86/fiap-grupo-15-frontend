package com.bytebank.backend.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum TipoTransacao {
    TRANSFERENCIA("Transferência"),
    DEPOSITO("Depósito");

    private final String descricao;

}
