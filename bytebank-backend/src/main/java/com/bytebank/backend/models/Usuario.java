package com.bytebank.backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank
    private String nome;
    @NotBlank
    @Column(unique = true)
    private String email;
    @NotBlank
    private String password;
    private String token;
    private BigDecimal saldo;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Transacao> transacoes;

    public void updateToken(String token) {
        this.token = token;
    }

    public void addTransacao(Transacao transacao) {
        this.transacoes.add(transacao);
    }

    public void removeTransacao(Transacao transacao) {
        this.transacoes.remove(transacao);
    }

    public void adicionarSaldo(BigDecimal saldo) {
        this.saldo = this.saldo.add(saldo);
    }

    public void subtrairSaldo(BigDecimal saldo) {
        this.saldo = this.saldo.subtract(saldo);
    }

}
