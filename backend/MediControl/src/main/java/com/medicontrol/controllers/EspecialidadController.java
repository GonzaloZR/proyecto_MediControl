package com.medicontrol.controllers;

import com.medicontrol.model.Especialidad;
import com.medicontrol.service.EspecialidadService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/especialidades")
@CrossOrigin(origins = "http://localhost:5173")
public class EspecialidadController {

    private final EspecialidadService especialidadService;

    public EspecialidadController(EspecialidadService especialidadService) {
        this.especialidadService = especialidadService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA', 'MEDICO', 'PACIENTE')")
    public List<Especialidad> listarEspecialidades() {
        return especialidadService.listarEspecialidades();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA', 'MEDICO', 'PACIENTE')")
    public Especialidad buscarPorId(@PathVariable Long id) {
        return especialidadService.buscarPorId(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Especialidad registrarEspecialidad(@RequestBody Especialidad especialidad) {
        return especialidadService.registrarEspecialidad(especialidad);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Especialidad actualizarEspecialidad(@PathVariable Long id, @RequestBody Especialidad especialidad) {
        return especialidadService.actualizarEspecialidad(id, especialidad);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void eliminarEspecialidad(@PathVariable Long id) {
        especialidadService.eliminarEspecialidad(id);
    }
}