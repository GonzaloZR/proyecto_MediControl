package com.medicontrol.service.impl;

import com.medicontrol.model.Especialidad;
import com.medicontrol.repository.EspecialidadRepository;
import com.medicontrol.service.EspecialidadService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EspecialidadServiceImpl implements EspecialidadService {

    private final EspecialidadRepository especialidadRepository;

    public EspecialidadServiceImpl(EspecialidadRepository especialidadRepository) {
        this.especialidadRepository = especialidadRepository;
    }

    @Override
    public List<Especialidad> listarEspecialidades() {
        return especialidadRepository.findAll()
                .stream()
                .filter(e -> Boolean.TRUE.equals(e.getEstado()))
                .toList();
    }

    @Override
    public Especialidad buscarPorId(Long id) {
        return especialidadRepository.findById(id)
                .filter(e -> Boolean.TRUE.equals(e.getEstado()))
                .orElseThrow(() -> new RuntimeException("Especialidad no encontrada"));
    }

    @Override
    public Especialidad registrarEspecialidad(Especialidad especialidad) {
        especialidad.setEstado(true);
        return especialidadRepository.save(especialidad);
    }

    @Override
    public Especialidad actualizarEspecialidad(Long id, Especialidad especialidad) {
        Especialidad existente = buscarPorId(id);

        existente.setNombre(especialidad.getNombre());
        existente.setDescripcion(especialidad.getDescripcion());

        return especialidadRepository.save(existente);
    }

    @Override
    public void eliminarEspecialidad(Long id) {
        Especialidad especialidad = buscarPorId(id);
        especialidad.setEstado(false);
        especialidadRepository.save(especialidad);
    }
}