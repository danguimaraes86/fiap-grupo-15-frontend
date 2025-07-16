package com.bytebank.backend.controllers;

import com.bytebank.backend.models.Categoria;
import com.bytebank.backend.models.TipoTransacao;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/config")
public class ConfigurationController {

    @GetMapping("/transacao")
    public ResponseEntity<Map<String, String>> transacao() {
        Map<String, String> result = Arrays.stream(TipoTransacao.values())
                .collect(Collectors.toMap(
                        t -> t.name().toLowerCase(),
                        TipoTransacao::getDescricao
                ));
        return ResponseEntity.ok(result);
    }

    @GetMapping("/categoria")
    public ResponseEntity<Map<String, String>> categoria() {
        Map<String, String> result = Arrays.stream(Categoria.values())
                .collect(Collectors.toMap(
                        c -> c.name().toLowerCase(),
                        Categoria::getDescricao
                ));
        return ResponseEntity.ok(result);
    }
}
