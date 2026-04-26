package com.medicontrol.service.impl;

import com.medicontrol.model.Medico;
import com.medicontrol.repository.MedicoRepository;
import com.medicontrol.service.MedicoService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MedicoServiceImpl implements MedicoService {

    private final MedicoRepository medicoRepository;

    public MedicoServiceImpl(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    @Override
    public List<Medico> listarMedicos() {
        return medicoRepository.findAll()
                .stream()
                .filter(m -> Boolean.TRUE.equals(m.getEstado()))
                .toList();
    }

    @Override
    public Medico buscarPorId(Long id) {
        return medicoRepository.findById(id)
                .filter(m -> Boolean.TRUE.equals(m.getEstado()))
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));
    }

    @Override
    public Medico registrarMedico(Medico medico) {
        medico.setFechaRegistro(LocalDateTime.now());
        medico.setEstado(true);

        return medicoRepository.save(medico);
    }

    @Override
    public Medico actualizarMedico(Long id, Medico medico) {
        Medico existente = buscarPorId(id);

        existente.setNombre(medico.getNombre());
        existente.setApellido(medico.getApellido());
        existente.setTelefono(medico.getTelefono());
        existente.setCorreo(medico.getCorreo());
        existente.setEspecialidad(medico.getEspecialidad());

        return medicoRepository.save(existente);
    }

    @Override
    public void eliminarMedico(Long id) {
        Medico medico = buscarPorId(id);
        medico.setEstado(false);
        medicoRepository.save(medico);
    }
}