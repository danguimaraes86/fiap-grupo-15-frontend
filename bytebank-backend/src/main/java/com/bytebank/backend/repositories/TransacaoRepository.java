package com.bytebank.backend.repositories;

import com.bytebank.backend.models.TipoTransacao;
import com.bytebank.backend.models.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    Transacao findTransacaoById(Long id);

    Transacao findTransacaoByDataCriacaoAndTipoTransacao(LocalDateTime dataCriacao, TipoTransacao tipoTransacao);
}
