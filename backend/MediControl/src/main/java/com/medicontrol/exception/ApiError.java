package com.medicontrol.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ApiError {

    private String mensaje;
    private int estado;
    private LocalDateTime fecha;
}