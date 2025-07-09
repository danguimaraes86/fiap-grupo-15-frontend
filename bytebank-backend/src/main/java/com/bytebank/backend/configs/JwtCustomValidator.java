package com.bytebank.backend.configs;

import com.bytebank.backend.models.Usuario;
import com.bytebank.backend.repositories.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2ErrorCodes;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Optional;

import static org.springframework.security.oauth2.core.OAuth2TokenValidatorResult.failure;
import static org.springframework.security.oauth2.core.OAuth2TokenValidatorResult.success;

@RequiredArgsConstructor
public class JwtCustomValidator implements OAuth2TokenValidator<Jwt> {

    private final UsuarioRepository usuarioRepository;

    @Override
    public OAuth2TokenValidatorResult validate(Jwt token) {

        Optional<Usuario> usuario = usuarioRepository.findUsuarioByEmailIgnoreCase(token.getSubject());
        if (usuario.isEmpty() || isTokenInvalid(usuario.get(), token)) {
            return failure(new OAuth2Error(OAuth2ErrorCodes.ACCESS_DENIED, "user/token not found", null));
        }

        return success();
    }

    private boolean isTokenInvalid(Usuario usuario, Jwt jwt) {
        return !usuario.getToken().equals(jwt.getTokenValue());
    }
}
