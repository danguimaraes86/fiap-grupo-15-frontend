package com.bytebank.backend.services;

import com.bytebank.backend.controllers.dtos.TransacaoRequest;
import com.bytebank.backend.controllers.dtos.TransacaoResponse;
import com.bytebank.backend.exceptions.TransacaoNaoAutorizadaException;
import com.bytebank.backend.models.Categoria;
import com.bytebank.backend.models.TipoTransacao;
import com.bytebank.backend.models.Transacao;
import com.bytebank.backend.models.Usuario;
import com.bytebank.backend.repositories.TransacaoRepository;
import com.bytebank.backend.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransacaoService {

    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;
    private final TransacaoRepository transacaoRepository;

    public List<Transacao> findTransacoesByUsuario(String email) {
        return usuarioService.getUsuarioByEmail(email).getTransacoes();
    }

    public TransacaoResponse createTransacao(TransacaoRequest request, String email) {
        Usuario usuario = usuarioService.getUsuarioByEmail(email);
        Transacao transacao = buildNovaTransacao(request);
        handleNovaTransacao(usuario, transacao);
        return buildTransacaoResponse(transacao, usuario);
    }

    public TransacaoResponse deleteTransacao(Long id, String email) {
        Usuario usuario = usuarioService.getUsuarioByEmail(email);
        Transacao transacao = transacaoRepository.findTransacaoById(id);
        handleDeleteTransacao(usuario, transacao);
        return buildTransacaoResponse(transacao, usuario);
    }

    public TransacaoResponse updateTransacao(Long id, TransacaoRequest request, String email) {
        Usuario usuario = usuarioService.getUsuarioByEmail(email);
        Transacao transacao = transacaoRepository.findTransacaoById(id);
        handleUpdateTransacao(usuario, transacao, request);
        return buildTransacaoResponse(transacao, usuario);
    }

    private void handleUpdateTransacao(Usuario usuario, Transacao transacao, TransacaoRequest request) {
        if (!transacao.getTipoTransacao().equals(TipoTransacao.valueOf(request.tipoTransacao().toUpperCase()))) {
            throw new TransacaoNaoAutorizadaException("tipo de transação diferente");
        }

        if (TipoTransacao.DEPOSITO.equals(transacao.getTipoTransacao())) {
            handleUpdateDeposito(usuario, transacao, request);
        }

        if (TipoTransacao.TRANSFERENCIA.equals(transacao.getTipoTransacao())) {
            handleUpdateTransferencia(usuario, transacao, request);
        }
    }

    private void handleUpdateTransferencia(Usuario usuario, Transacao transacao, TransacaoRequest request) {
        BigDecimal saldoAtual = usuario.getSaldo();
        BigDecimal valorAtual = transacao.getValor();
        BigDecimal novoValor = request.valor();
        int comparacao = novoValor.compareTo(valorAtual);

        if (comparacao > 0) {
            // Novo valor é maior que o atual
            BigDecimal diferenca = novoValor.subtract(valorAtual);
            if (saldoAtual.subtract(diferenca).compareTo(BigDecimal.ZERO) < 0) {
                throw new TransacaoNaoAutorizadaException("saldo insuficiente");
            }
            usuario.subtrairSaldo(diferenca);
        }
        if (comparacao < 0) {
            // Novo valor é menor que o atual
            BigDecimal diferenca = valorAtual.subtract(novoValor);
            usuario.adicionarSaldo(diferenca);
        }
        transacao.updateDados(request.descricao(), request.valor(), request.categoria());
        usuarioRepository.save(usuario);
    }

    private void handleUpdateDeposito(Usuario usuario, Transacao transacao, TransacaoRequest request) {
        BigDecimal saldoAtual = usuario.getSaldo();
        BigDecimal valorAtual = transacao.getValor();
        BigDecimal novoValor = request.valor();
        int comparacao = novoValor.compareTo(valorAtual);

        if (comparacao > 0) {
            // Novo valor é maior que o atual
            BigDecimal diferenca = novoValor.subtract(valorAtual);
            usuario.adicionarSaldo(diferenca);
        }
        if (comparacao < 0) {
            // Novo valor é menor que o atual
            BigDecimal diferenca = valorAtual.subtract(novoValor);
            if (saldoAtual.subtract(diferenca).compareTo(BigDecimal.ZERO) < 0) {
                throw new TransacaoNaoAutorizadaException("saldo insuficiente");
            }
            usuario.subtrairSaldo(diferenca);
        }
        transacao.updateDados(request.descricao(), request.valor(), Categoria.ENTRADA);
        usuarioRepository.save(usuario);
    }

    private void handleDeleteTransacao(Usuario usuario, Transacao transacao) {
        if (TipoTransacao.DEPOSITO.equals(transacao.getTipoTransacao())) {
            if (usuario.getSaldo().subtract(transacao.getValor()).compareTo(BigDecimal.ZERO) < 0) {
                throw new TransacaoNaoAutorizadaException("saldo insuficiente");
            }
            usuario.removeTransacao(transacao);
            usuario.subtrairSaldo(transacao.getValor());
            usuarioRepository.save(usuario);
            transacaoRepository.delete(transacao);
        }

        if (TipoTransacao.TRANSFERENCIA.equals(transacao.getTipoTransacao())) {
            usuario.removeTransacao(transacao);
            usuario.adicionarSaldo(transacao.getValor());
            usuarioRepository.save(usuario);
            transacaoRepository.delete(transacao);
        }
    }

    private void handleNovaTransacao(Usuario usuario, Transacao transacao) {
        if (TipoTransacao.DEPOSITO.equals(transacao.getTipoTransacao())) {
            usuario.addTransacao(transacao);
            usuario.adicionarSaldo(transacao.getValor());
            usuarioRepository.save(usuario);
        }
        if (TipoTransacao.TRANSFERENCIA.equals(transacao.getTipoTransacao())) {
            if (usuario.getSaldo().subtract(transacao.getValor()).compareTo(BigDecimal.ZERO) < 0) {
                throw new TransacaoNaoAutorizadaException("saldo insuficiente");
            }
            usuario.addTransacao(transacao);
            usuario.subtrairSaldo(transacao.getValor());
            usuarioRepository.save(usuario);
        }
    }

    private TransacaoResponse buildTransacaoResponse(Transacao transacao, Usuario usuario) {
        return new TransacaoResponse(
                transacao.getDescricao(),
                transacao.getValor(),
                transacao.getTipoTransacao().getDescricao(),
                transacao.getCategoria().getDescricao(),
                usuario.getSaldo()
        );
    }

    private Transacao buildNovaTransacao(TransacaoRequest transacao) {
        return Transacao.builder()
                .valor(transacao.valor())
                .descricao(transacao.descricao())
                .tipoTransacao(TipoTransacao.valueOf(transacao.tipoTransacao().toUpperCase()))
                .categoria(handleCategoriaTransacao((transacao)))
                .dataCriacao(LocalDateTime.now())
                .build();
    }

    private Categoria handleCategoriaTransacao(TransacaoRequest transacao) {
        if (transacao.tipoTransacao().equals(TipoTransacao.DEPOSITO.getDescricao())) {
            return Categoria.ENTRADA;
        }
        return transacao.categoria() == null ? Categoria.NAO_CLASSIFICADO : transacao.categoria();
    }

}
