package com.medicontrol.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @Column(length = 120, unique = true)
    private String correo;

    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;

    @Column(length = 20)
    private String sexo;

    @Column(name = "tipo_sangre", length = 10)
    private String tipoSangre;

    @Column(length = 255)
    private String alergias;

    @Column(name = "contacto_emergencia", length = 120)
    private String contactoEmergencia;

    @Column(name = "telefono_emergencia", length = 20)
    private String telefonoEmergencia;

    @Column(name = "fecha_registro", insertable = false, updatable = false)
    private LocalDateTime fechaRegistro;

    @Column
    private Boolean estado = true;

    @OneToOne
    @JoinColumn(name = "usuario_id", unique = true)
    private Usuario usuario;

    @Override
    public String obtenerTipoPersona() {
        return "Paciente";
    }
}