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

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public List<Usuario> findAllUsuarios() {
        return usuarioRepository.findAll();
    }

    public Usuario findUsuarioById(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario createNovoUsuario(RegistrationRequest request) {
        if (Boolean.TRUE.equals(usuarioRepository.existsUsuarioByEmail(request.email()))) {
            throw new RegistrationException("email já cadastrado.");
        }
        Usuario novoUsuario = handleNewUserAccount(request);
        novoUsuario.updateToken(tokenService.generateAccessToken(novoUsuario));
        return usuarioRepository.save(novoUsuario);
    }

    public String handleLoginUsuario(LoginRequest loginRequest) {
        if (Boolean.FALSE.equals(usuarioRepository.existsUsuarioByEmail(loginRequest.email()))
                || Boolean.FALSE.equals(handleValidarSenhaUsuario(loginRequest))) {
            throw new LoginException("usuário e/ou senha incorretos.");
        }
        Usuario usuarioByEmail = getUsuarioByEmail(loginRequest);
        usuarioByEmail.updateToken(tokenService.generateAccessToken(usuarioByEmail));
        return usuarioRepository.save(usuarioByEmail).getToken();
    }

    private Usuario getUsuarioByEmail(LoginRequest loginRequest) {
        return usuarioRepository.findUsuarioByEmail(loginRequest.email()).orElseThrow(NoSuchElementException::new);
    }

    private Boolean handleValidarSenhaUsuario(LoginRequest loginRequest) {
        Usuario usuario = getUsuarioByEmail(loginRequest);
        return passwordEncoder.matches(loginRequest.password(), usuario.getPassword());
    }

    private Usuario handleNewUserAccount(RegistrationRequest request) {
        return Usuario.builder()
                .nome(request.nome())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .build();
    }

}
