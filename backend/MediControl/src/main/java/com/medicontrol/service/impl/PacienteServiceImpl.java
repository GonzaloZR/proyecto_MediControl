package com.medicontrol.service.impl;

import com.medicontrol.model.Paciente;
import com.medicontrol.repository.PacienteRepository;
import com.medicontrol.service.PacienteService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PacienteServiceImpl implements PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteServiceImpl(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    @Override
    public List<Paciente> listarPacientes() {
        return pacienteRepository.findAll()
                .stream()
                .filter(paciente -> Boolean.TRUE.equals(paciente.getEstado()))
                .toList();
    }

    @Override
    public Paciente buscarPorId(Long id) {
        return pacienteRepository.findById(id)
                .filter(paciente -> Boolean.TRUE.equals(paciente.getEstado()))
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
    }

    @Override
    public Paciente registrarPaciente(Paciente paciente) {
        pacienteRepository.findByDni(paciente.getDni()).ifPresent(p -> {
            throw new RuntimeException("Ya existe un paciente con ese DNI");
        });

        paciente.setFechaRegistro(LocalDateTime.now());
        paciente.setEstado(true);

        return pacienteRepository.save(paciente);
    }

    @Override
    public Paciente actualizarPaciente(Long id, Paciente paciente) {
        Paciente pacienteExistente = buscarPorId(id);

        pacienteExistente.setNombre(paciente.getNombre());
        pacienteExistente.setApellido(paciente.getApellido());
        pacienteExistente.setTelefono(paciente.getTelefono());
        pacienteExistente.setDireccion(paciente.getDireccion());

        return pacienteRepository.save(pacienteExistente);
    }

    @Override
    public void eliminarPaciente(Long id) {
        Paciente paciente = buscarPorId(id);
        paciente.setEstado(false);
        pacienteRepository.save(paciente);
    }
}