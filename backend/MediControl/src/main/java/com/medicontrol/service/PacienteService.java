package com.medicontrol.service;

import com.medicontrol.dto.paciente.PacienteDTO;
import com.medicontrol.dto.paciente.PacienteRequest;
import com.medicontrol.model.Paciente;

import java.util.List;

public interface PacienteService {

    List<PacienteDTO> listarPacientes();

    PacienteDTO buscarPorId(Long id);

    PacienteDTO registrarPaciente(PacienteRequest request);

    PacienteDTO actualizarPaciente(Long id, PacienteRequest request);

    Paciente obtenerMiPerfil(String username);

    Paciente actualizarMiPerfil(String username, Paciente paciente);

    List<Paciente> listarTodos();

    Paciente activarPaciente(Long id);

    void eliminarPaciente(Long id);
}