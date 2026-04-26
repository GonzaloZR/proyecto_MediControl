package com.medicontrol.service;

import com.medicontrol.model.Paciente;

import java.util.List;

public interface PacienteService {

    List<Paciente> listarPacientes();

    Paciente buscarPorId(Long id);

    Paciente registrarPaciente(Paciente paciente);

    Paciente actualizarPaciente(Long id, Paciente paciente);

    void eliminarPaciente(Long id);
}