package com.medicontrol.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "pacientes")
public class Paciente extends Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255)
    private String direccion;

    @Column(name = "fecha_registro")
    private java.time.LocalDateTime fechaRegistro;

    @Column
    private Boolean estado = true;

    @Override
    public String obtenerTipoPersona() {
        return "Paciente";
    }
}