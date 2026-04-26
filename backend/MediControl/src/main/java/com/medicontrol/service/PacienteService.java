package com.medicontrol.service;

import com.medicontrol.dto.paciente.PacienteDTO;
import com.medicontrol.dto.paciente.PacienteRequest;

import java.util.List;

public interface PacienteService {

    List<PacienteDTO> listarPacientes();

    PacienteDTO buscarPorId(Long id);

    PacienteDTO registrarPaciente(PacienteRequest request);

    PacienteDTO actualizarPaciente(Long id, PacienteRequest request);

    void eliminarPaciente(Long id);
}