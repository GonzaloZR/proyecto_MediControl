package com.medicontrol.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResponse {

    private String token;
    private String username;
    private String rol;
    private Long pacienteId;
}