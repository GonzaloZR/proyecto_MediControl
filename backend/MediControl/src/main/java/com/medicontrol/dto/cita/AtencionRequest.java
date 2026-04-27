package com.medicontrol.dto.cita;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AtencionRequest {

    @NotBlank(message = "El diagnóstico es obligatorio")
    private String diagnostico;

    private String observaciones;
}