package com.bytebank.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@NoArgsConstructor
@Getter
public class Anexo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Lob
    private byte[] arquivo;

    public Anexo(byte[] arquivo) {
        this.arquivo = arquivo;
    }
}
