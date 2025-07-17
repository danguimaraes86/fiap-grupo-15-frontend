package com.bytebank.backend.models;

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
    @Enumerated(EnumType.STRING)
    private Categoria categoria;
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Anexo anexo;

    public void updateDados(String descricao, BigDecimal valor, Categoria categoria) {
        this.descricao = descricao;
        this.valor = valor;
        this.categoria = categoria;
    }

    public void addAnexo(Anexo anexo) {
        this.anexo = anexo;
    }
}
