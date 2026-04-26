package com.medicontrol.service.impl;

import com.medicontrol.model.Cita;
import com.medicontrol.repository.CitaRepository;
import com.medicontrol.service.CitaService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CitaServiceImpl implements CitaService {

    private final CitaRepository citaRepository;

    public CitaServiceImpl(CitaRepository citaRepository) {
        this.citaRepository = citaRepository;
    }

    @Override
    public List<Cita> listarCitas() {
        return citaRepository.findAll()
                .stream()
                .filter(cita -> Boolean.TRUE.equals(cita.getActivo()))
                .toList();
    }

    @Override
    public Cita buscarPorId(Long id) {
        return citaRepository.findById(id)
                .filter(cita -> Boolean.TRUE.equals(cita.getActivo()))
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
    }

    @Override
    public Cita registrarCita(Cita cita) {
        if (cita.getFecha().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("No se puede registrar una cita en una fecha pasada");
        }

        citaRepository.findByMedicoIdAndFecha(
                cita.getMedico().getId(),
                cita.getFecha()
        ).ifPresent(c -> {
            throw new RuntimeException("El médico ya tiene una cita registrada en ese horario");
        });

        cita.setEstado("PENDIENTE");
        cita.setActivo(true);
        cita.setFechaRegistro(LocalDateTime.now());
        cita.setDiagnostico(cita.getDiagnostico());
        cita.setObservaciones(cita.getObservaciones());

        return citaRepository.save(cita);
    }

    @Override
    public Cita actualizarCita(Long id, Cita cita) {
        Cita existente = buscarPorId(id);

        if (cita.getFecha().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("No se puede reprogramar una cita a una fecha pasada");
        }

        existente.setFecha(cita.getFecha());
        existente.setMotivo(cita.getMotivo());
        existente.setMedico(cita.getMedico());
        existente.setPaciente(cita.getPaciente());
        existente.setDiagnostico(cita.getDiagnostico());
        existente.setObservaciones(cita.getObservaciones());

        return citaRepository.save(existente);
    }

    @Override
    public void cancelarCita(Long id) {
        Cita cita = buscarPorId(id);
        cita.setEstado("CANCELADA");
        cita.setActivo(false);
        citaRepository.save(cita);
    }
}