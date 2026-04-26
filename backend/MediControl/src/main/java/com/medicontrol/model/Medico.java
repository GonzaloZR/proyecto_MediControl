package com.medicontrol.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "medicos")
public class Medico extends Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 120, unique = true)
    private String correo;

    @Column(name = "numero_colegiatura", length = 50, unique = true)
    private String numeroColegiatura;

    @Column(name = "fecha_registro")
    private java.time.LocalDateTime fechaRegistro;

    @Column
    private Boolean estado = true;

    @ManyToOne
    @JoinColumn(name = "especialidad_id", nullable = false)
    private Especialidad especialidad;

    @Override
    public String obtenerTipoPersona() {
        return "Médico";
    }


}