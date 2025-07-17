package com.bytebank.backend.controllers;

import com.bytebank.backend.controllers.dtos.TransacaoRequest;
import com.bytebank.backend.controllers.dtos.TransacaoResponse;
import com.bytebank.backend.services.TransacaoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/transacao")
public class TransacaoController {

    private final TransacaoService transacaoService;

    @GetMapping
    public ResponseEntity<List<TransacaoResponse>> getTransacoes(Authentication authentication) {
        return ResponseEntity.ok(transacaoService.findTransacoesByUsuario(authentication.getName()));
    }

    @GetMapping("/{id}/anexo")
    public ResponseEntity<byte[]> getAnexoTransacao(@PathVariable Long id) {
        return ResponseEntity.ok(transacaoService.getAnexoTransacao(id));
    }

    @PostMapping
    public ResponseEntity<TransacaoResponse> createTransacao(
            @RequestPart("transacao") @Valid TransacaoRequest transacao,
            @RequestPart(value = "anexo", required = false) MultipartFile anexo,
            Authentication authentication) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(transacaoService.createTransacao(transacao, anexo, authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TransacaoResponse> deleteTransacao(@PathVariable Long id, Authentication authentication) {
        return ResponseEntity.ok(transacaoService.deleteTransacao(id, authentication.getName()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TransacaoResponse> updateTransacao(
            @PathVariable Long id,
            @RequestBody @Valid TransacaoRequest transacao,
            Authentication authentication) {
        return ResponseEntity.ok(transacaoService.updateTransacao(id, transacao, authentication.getName()));
    }
}
