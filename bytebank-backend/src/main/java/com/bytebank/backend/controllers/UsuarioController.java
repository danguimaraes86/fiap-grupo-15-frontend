package com.bytebank.backend.controllers;

import com.bytebank.backend.controllers.dtos.AuthResponse;
import com.bytebank.backend.controllers.dtos.LoginRequest;
import com.bytebank.backend.controllers.dtos.RegistrationRequest;
import com.bytebank.backend.controllers.dtos.UsuarioResponse;
import com.bytebank.backend.models.Usuario;
import com.bytebank.backend.services.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RequiredArgsConstructor
@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<UsuarioResponse> getUsuario(Authentication authentication) {
        Usuario usuario = usuarioService.getUsuarioByEmail(authentication.getName());
        return ResponseEntity.ok(new UsuarioResponse(usuario.getId(), usuario.getNome(), usuario.getEmail()));
    }

    @PostMapping
    public ResponseEntity<AuthResponse> createUsuario(@RequestBody @Valid RegistrationRequest request) {
        Usuario novoUsuario = usuarioService.createNovoUsuario(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(novoUsuario.getToken()));
    }

    @PostMapping("/token")
    public ResponseEntity<AuthResponse> createToken(@RequestBody @Valid LoginRequest loginRequest) {
        String token = usuarioService.handleLoginUsuario(loginRequest);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @GetMapping("/saldo")
    public ResponseEntity<BigDecimal> getSaldo(Authentication authentication) {
        return ResponseEntity.ok(usuarioService.getSaldo(authentication.getName()));
    }
}
