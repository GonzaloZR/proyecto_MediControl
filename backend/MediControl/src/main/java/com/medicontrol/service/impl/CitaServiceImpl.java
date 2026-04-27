package com.medicontrol.service.impl;

import com.medicontrol.model.Cita;
import com.medicontrol.model.Medico;
import com.medicontrol.model.Paciente;
import com.medicontrol.repository.CitaRepository;
import com.medicontrol.repository.MedicoRepository;
import com.medicontrol.repository.PacienteRepository;
import com.medicontrol.service.CitaService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CitaServiceImpl implements CitaService {

    private final CitaRepository citaRepository;
    private final PacienteRepository pacienteRepository;
    private final MedicoRepository medicoRepository;

    public CitaServiceImpl(
            CitaRepository citaRepository,
            PacienteRepository pacienteRepository,
            MedicoRepository medicoRepository
    ) {
        this.citaRepository = citaRepository;
        this.pacienteRepository = pacienteRepository;
        this.medicoRepository = medicoRepository;
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

        Paciente paciente = pacienteRepository.findById(cita.getPaciente().getId())
                .filter(p -> Boolean.TRUE.equals(p.getEstado()))
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado o inactivo"));

        Medico medico = medicoRepository.findById(cita.getMedico().getId())
                .filter(m -> Boolean.TRUE.equals(m.getEstado()))
                .orElseThrow(() -> new RuntimeException("Médico no encontrado o inactivo"));

        citaRepository.findByMedicoIdAndFecha(medico.getId(), cita.getFecha())
                .ifPresent(c -> {
                    throw new RuntimeException("El médico ya tiene una cita registrada en ese horario");
                });

        cita.setPaciente(paciente);
        cita.setMedico(medico);
        cita.setEstado("SOLICITADA");
        cita.setActivo(true);
        cita.setFechaRegistro(LocalDateTime.now());

        return citaRepository.save(cita);
    }

    @Override
    public Cita actualizarCita(Long id, Cita cita) {
        Cita existente = buscarPorId(id);

        if (cita.getFecha().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("No se puede reprogramar una cita a una fecha pasada");
        }

        Paciente paciente = pacienteRepository.findById(cita.getPaciente().getId())
                .filter(p -> Boolean.TRUE.equals(p.getEstado()))
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado o inactivo"));

        Medico medico = medicoRepository.findById(cita.getMedico().getId())
                .filter(m -> Boolean.TRUE.equals(m.getEstado()))
                .orElseThrow(() -> new RuntimeException("Médico no encontrado o inactivo"));

        existente.setPaciente(paciente);
        existente.setMedico(medico);
        existente.setFecha(cita.getFecha());
        existente.setMotivo(cita.getMotivo());
        existente.setDiagnostico(cita.getDiagnostico());
        existente.setObservaciones(cita.getObservaciones());

        return citaRepository.save(existente);
    }

    @Override
    public void cancelarCita(Long id) {
        Cita cita = buscarPorId(id);

        if ("ATENDIDA".equalsIgnoreCase(cita.getEstado())) {
            throw new RuntimeException("No se puede cancelar una cita ya atendida");
        }

        cita.setEstado("CANCELADA");
        cita.setActivo(false);
        citaRepository.save(cita);
    }

    @Override
    public List<Cita> listarCitasPorPaciente(Long pacienteId) {

        return citaRepository.findByPacienteIdAndActivoTrue(pacienteId);
    }

    @Override
    public Cita confirmarCita(Long id) {

        Cita cita = buscarPorId(id);

        if (!"SOLICITADA".equalsIgnoreCase(cita.getEstado())) {
            throw new RuntimeException("Solo se pueden confirmar citas solicitadas");
        }

        cita.setEstado("CONFIRMADA");

        return citaRepository.save(cita);
    }

    @Override
    public Cita marcarEnCurso(Long id) {

        Cita cita = buscarPorId(id);

        if (!"CONFIRMADA".equalsIgnoreCase(cita.getEstado())) {
            throw new RuntimeException("Solo citas confirmadas pueden pasar a EN_CURSO");
        }

        cita.setEstado("EN_CURSO");

        return citaRepository.save(cita);
    }

    @Override
    public Cita marcarAtendida(Long id, String diagnostico, String observaciones) {

        Cita cita = buscarPorId(id);

        if (!"EN_CURSO".equalsIgnoreCase(cita.getEstado())) {
            throw new RuntimeException("Solo citas en curso pueden marcarse como atendidas");
        }

        cita.setDiagnostico(diagnostico);
        cita.setObservaciones(observaciones);
        cita.setEstado("ATENDIDA");

        return citaRepository.save(cita);
    }

    @Override
    public Cita rechazarCita(Long id) {

        Cita cita = buscarPorId(id);

        if (!"SOLICITADA".equalsIgnoreCase(cita.getEstado())) {
            throw new RuntimeException("Solo se pueden rechazar citas solicitadas");
        }

        cita.setEstado("RECHAZADA");

        return citaRepository.save(cita);
    }
}