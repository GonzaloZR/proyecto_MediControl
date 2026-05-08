package com.medicontrol.dto.medico;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MedicoRegistroDTO {

    private String username;
    private String password;

    private String nombre;
    private String apellido;
    private String dni;
    private String telefono;
    private String correo;
    private String numeroColegiatura;

    private Long especialidadId;
}