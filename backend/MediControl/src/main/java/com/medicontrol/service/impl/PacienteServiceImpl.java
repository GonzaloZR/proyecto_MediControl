package com.medicontrol.service.impl;

import com.medicontrol.model.Paciente;
import com.medicontrol.repository.PacienteRepository;
import com.medicontrol.service.PacienteService;
import org.springframework.stereotype.Service;
import com.medicontrol.dto.paciente.PacienteDTO;
import com.medicontrol.dto.paciente.PacienteRequest;
import com.medicontrol.mapper.PacienteMapper;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PacienteServiceImpl implements PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteServiceImpl(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    @Override
    public List<PacienteDTO> listarPacientes() {
        return pacienteRepository.findAll()
                .stream()
                .filter(p -> Boolean.TRUE.equals(p.getEstado()))
                .map(PacienteMapper::toDTO)
                .toList();
    }

    @Override
    public PacienteDTO buscarPorId(Long id) {
        Paciente paciente = pacienteRepository.findById(id)
                .filter(p -> Boolean.TRUE.equals(p.getEstado()))
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        return PacienteMapper.toDTO(paciente);
    }

    @Override
    public PacienteDTO registrarPaciente(PacienteRequest request) {

        pacienteRepository.findByDni(request.getDni()).ifPresent(p -> {
            throw new RuntimeException("Ya existe un paciente con ese DNI");
        });

        Paciente paciente = PacienteMapper.toEntity(request);

        paciente.setFechaRegistro(java.time.LocalDateTime.now());
        paciente.setEstado(true);

        Paciente guardado = pacienteRepository.save(paciente);

        return PacienteMapper.toDTO(guardado);
    }

    @Override
    public PacienteDTO actualizarPaciente(Long id, PacienteRequest request) {

        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        PacienteMapper.updateEntity(paciente, request);

        Paciente actualizado = pacienteRepository.save(paciente);

        return PacienteMapper.toDTO(actualizado);
    }

    @Override
    public void eliminarPaciente(Long id) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        paciente.setEstado(false);
        pacienteRepository.save(paciente);
    }
}