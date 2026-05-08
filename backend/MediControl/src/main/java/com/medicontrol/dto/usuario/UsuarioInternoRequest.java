package com.medicontrol.dto.usuario;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioInternoRequest {

    private String username;
    private String password;
    private String correo;
    private String rol;
}