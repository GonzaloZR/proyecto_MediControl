package com.medicontrol.dto.paciente;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PacienteRequest {

    @NotBlank
    private String nombre;

    @NotBlank
    private String apellido;

    @NotBlank
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
}