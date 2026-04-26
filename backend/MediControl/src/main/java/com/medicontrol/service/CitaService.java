package com.medicontrol.service;

import com.medicontrol.model.Cita;

import java.util.List;

public interface CitaService {

    List<Cita> listarCitas();

    Cita buscarPorId(Long id);

    Cita registrarCita(Cita cita);

    Cita actualizarCita(Long id, Cita cita);

    void cancelarCita(Long id);
}