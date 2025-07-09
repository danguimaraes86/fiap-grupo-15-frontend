package com.bytebank.backend.controllers;

import com.bytebank.backend.models.TipoTransacao;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/config")
public class ConfigurationController {

    @GetMapping("/transacao")
    public ResponseEntity<List<String>> transacao() {
        return ResponseEntity.ok(Arrays.stream(TipoTransacao.values()).map(TipoTransacao::getDescricao).toList());
    }
}
