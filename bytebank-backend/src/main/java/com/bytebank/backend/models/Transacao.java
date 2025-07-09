package com.bytebank.backend.models;

import com.bytebank.backend.controllers.dtos.TransacaoRequest;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank
    private String descricao;
    @PositiveOrZero
    private BigDecimal valor;
    private LocalDateTime dataCriacao;
    @Enumerated(EnumType.STRING)
    private TipoTransacao tipoTransacao;

    public void updateDados(TransacaoRequest request) {
        this.descricao = request.descricao();
        this.valor = request.valor();
    }
}
