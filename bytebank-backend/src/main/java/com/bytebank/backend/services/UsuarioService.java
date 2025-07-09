package com.bytebank.backend.services;

import com.bytebank.backend.controllers.dtos.LoginRequest;
import com.bytebank.backend.controllers.dtos.RegistrationRequest;
import com.bytebank.backend.exceptions.LoginException;
import com.bytebank.backend.exceptions.RegistrationException;
import com.bytebank.backend.models.Usuario;
import com.bytebank.backend.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public List<Usuario> findAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> findUsuarioById(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario getUsuarioByEmail(String email) {
        return usuarioRepository.getUsuarioByEmailIgnoreCase(email);
    }

    public Usuario createNovoUsuario(RegistrationRequest request) {
        if (Boolean.TRUE.equals(usuarioRepository.existsUsuarioByEmailIgnoreCase(request.email()))) {
            throw new RegistrationException("email já cadastrado.");
        }
        Usuario novoUsuario = handleNewUserAccount(request);
        novoUsuario.updateToken(tokenService.generateAccessToken(novoUsuario.getEmail()));
        return usuarioRepository.save(novoUsuario);
    }

    public BigDecimal getSaldo(String email) {
        return getUsuarioByEmail(email).getSaldo();
    }

    public String handleLoginUsuario(LoginRequest loginRequest) {
        if (Boolean.FALSE.equals(usuarioRepository.existsUsuarioByEmailIgnoreCase(loginRequest.email()))
                || !handleValidarSenhaUsuario(loginRequest)) {
            throw new LoginException("usuário e/ou senha incorretos.");
        }
        Usuario usuarioByEmail = getUsuarioByEmail(loginRequest.email());
        usuarioByEmail.updateToken(tokenService.generateAccessToken(usuarioByEmail.getEmail()));
        return usuarioRepository.save(usuarioByEmail).getToken();
    }

    private Boolean handleValidarSenhaUsuario(LoginRequest loginRequest) {
        return passwordEncoder.matches(loginRequest.password(), getUsuarioByEmail(loginRequest.email()).getPassword());
    }

    private Usuario handleNewUserAccount(RegistrationRequest request) {
        return Usuario.builder()
                .nome(request.nome())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .saldo(BigDecimal.ZERO)
                .build();
    }
}
