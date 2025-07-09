package com.bytebank.backend.exceptions;

public class TransacaoNaoAutorizadaException extends RuntimeException {
    public TransacaoNaoAutorizadaException(String mensagem) {
        super(mensagem);
    }
}
