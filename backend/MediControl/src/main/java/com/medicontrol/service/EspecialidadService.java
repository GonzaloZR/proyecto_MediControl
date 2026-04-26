package com.medicontrol.service;

import com.medicontrol.model.Especialidad;

import java.util.List;

public interface EspecialidadService {

    List<Especialidad> listarEspecialidades();

    Especialidad buscarPorId(Long id);

    Especialidad registrarEspecialidad(Especialidad especialidad);

    Especialidad actualizarEspecialidad(Long id, Especialidad especialidad);

    void eliminarEspecialidad(Long id);
}