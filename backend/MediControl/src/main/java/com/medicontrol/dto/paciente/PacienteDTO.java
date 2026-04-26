package com.medicontrol.dto.paciente;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class PacienteDTO {

    private Long id;
    private String nombre;
    private String apellido;
    private String dni;
    private String telefono;
    private String correo;
    private String direccion;
    private LocalDate fechaNacimiento;
    private String sexo;
    private String tipoSangre;
    private String alergias;
    private String contactoEmergencia;
    private String telefonoEmergencia;
    private LocalDateTime fechaRegistro;
}