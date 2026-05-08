package com.medicontrol.service;

import com.medicontrol.model.Medico;

import java.util.List;

public interface MedicoService {

    List<Medico> listarMedicos();

    Medico buscarPorId(Long id);

    Medico registrarMedico(Medico medico);

    Medico actualizarMedico(Long id, Medico medico);

    void eliminarMedico(Long id);

    List<Medico> listarTodos();

    Medico activarMedico(Long id);

    Medico registrarMedicoConUsuario(com.medicontrol.dto.medico.MedicoRegistroDTO dto);


}