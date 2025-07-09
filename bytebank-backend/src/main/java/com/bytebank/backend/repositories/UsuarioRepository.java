package com.bytebank.backend.repositories;

import com.bytebank.backend.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findUsuarioByEmailIgnoreCase(String email);

    Usuario getUsuarioByEmailIgnoreCase(String email);

    Boolean existsUsuarioByEmailIgnoreCase(String email);
}
