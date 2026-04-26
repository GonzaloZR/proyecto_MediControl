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

        paciente.setCorreo(paciente.getCorreo());
        paciente.setFechaNacimiento(paciente.getFechaNacimiento());
        paciente.setSexo(paciente.getSexo());
        paciente.setTipoSangre(paciente.getTipoSangre());
        paciente.setAlergias(paciente.getAlergias());
        paciente.setContactoEmergencia(paciente.getContactoEmergencia());
        paciente.setTelefonoEmergencia(paciente.getTelefonoEmergencia());

        return pacienteRepository.save(paciente);
    }

    @Override
    public Paciente actualizarPaciente(Long id, Paciente paciente) {
        Paciente existente = buscarPorId(id);

        existente.setNombre(paciente.getNombre());
        existente.setApellido(paciente.getApellido());
        existente.setTelefono(paciente.getTelefono());
        existente.setDireccion(paciente.getDireccion());

        // NUEVOS CAMPOS
        existente.setCorreo(paciente.getCorreo());
        existente.setFechaNacimiento(paciente.getFechaNacimiento());
        existente.setSexo(paciente.getSexo());
        existente.setTipoSangre(paciente.getTipoSangre());
        existente.setAlergias(paciente.getAlergias());
        existente.setContactoEmergencia(paciente.getContactoEmergencia());
        existente.setTelefonoEmergencia(paciente.getTelefonoEmergencia());

        return pacienteRepository.save(existente);
    }

    @Override
    public void eliminarPaciente(Long id) {
        Paciente paciente = buscarPorId(id);
        paciente.setEstado(false);
        pacienteRepository.save(paciente);
    }
}