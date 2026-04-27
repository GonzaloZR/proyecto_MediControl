package com.medicontrol.service;

import com.medicontrol.model.Cita;

import java.util.List;

public interface CitaService {

    List<Cita> listarCitas();

    Cita buscarPorId(Long id);

    Cita registrarCita(Cita cita);

    Cita actualizarCita(Long id, Cita cita);

    void cancelarCita(Long id);

    List<Cita> listarCitasPorPaciente(Long pacienteId);

    Cita confirmarCita(Long id);

    Cita marcarEnCurso(Long id);

    Cita marcarAtendida(Long id, String diagnostico, String observaciones);

    Cita rechazarCita(Long id);
}