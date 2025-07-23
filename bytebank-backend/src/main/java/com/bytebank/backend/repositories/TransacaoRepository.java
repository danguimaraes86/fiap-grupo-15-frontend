package com.bytebank.backend.repositories;

import com.bytebank.backend.models.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    Transacao findTransacaoById(Long id);
}
