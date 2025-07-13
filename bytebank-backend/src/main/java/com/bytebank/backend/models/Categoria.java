package com.bytebank.backend.models;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Categoria {

    ENTRADA("Entrada"),
    NAO_CLASSIFICADO("Não Classificado"),
    MORADIA("Moradia"),
    TRANSPORTE("Transporte"),
    LAZER("Lazer"),
    EDUCACAO("Educação"),
    PETS("Pets");

    private final String descricao;

}
