package com.bytebank.backend.controllers;

import com.bytebank.backend.controllers.dtos.AuthResponse;
import com.bytebank.backend.controllers.dtos.LoginRequest;
import com.bytebank.backend.controllers.dtos.RegistrationRequest;
import com.bytebank.backend.models.Usuario;
import com.bytebank.backend.services.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsers() {
        return ResponseEntity.ok(usuarioService.findAllUsuarios());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        return ResponseEntity.ofNullable(usuarioService.findUsuarioById(id));
    }

    @PostMapping
    public ResponseEntity<AuthResponse> createUsuario(@RequestBody @Valid RegistrationRequest request) {
        Usuario novoUsuario = usuarioService.createNovoUsuario(request);
        URI uri = UriComponentsBuilder.newInstance()
                .path("/user/{id}").buildAndExpand(novoUsuario.getId()).toUri();
        return ResponseEntity.created(uri).body(new AuthResponse(novoUsuario.getToken()));
    }

    @PostMapping("/token")
    public ResponseEntity<AuthResponse> createToken(@RequestBody @Valid LoginRequest loginRequest) {
        String token = usuarioService.handleLoginUsuario(loginRequest);
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
