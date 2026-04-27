package com.medicontrol.dto.paciente;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PacienteRegisterRequest {

    private String username;
    private String password;

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
}