package com.medicontrol.controllers;

import com.medicontrol.dto.paciente.PacienteDTO;
import com.medicontrol.dto.paciente.PacienteRequest;
import com.medicontrol.model.Paciente;
import com.medicontrol.service.PacienteService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;


import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
@CrossOrigin(origins = "http://localhost:5173")
public class PacienteController {

    private final PacienteService pacienteService;

    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA')")
    public List<PacienteDTO> listarPacientes() {
        return pacienteService.listarPacientes();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA', 'MEDICO', 'PACIENTE')")
    public PacienteDTO buscarPorId(@PathVariable Long id) {
        return pacienteService.buscarPorId(id);
    }   

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA')")
    public PacienteDTO registrarPaciente(@Valid @RequestBody PacienteRequest request) {
        return pacienteService.registrarPaciente(request);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA')")
    public PacienteDTO actualizarPaciente(
            @PathVariable Long id,
            @Valid @RequestBody PacienteRequest request
    ) {
        return pacienteService.actualizarPaciente(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void eliminarPaciente(@PathVariable Long id) {

        pacienteService.eliminarPaciente(id);
    }

    @GetMapping("/todos")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA')")
    public List<Paciente> listarTodos() {
        return pacienteService.listarTodos();
    }

    @PutMapping("/{id}/activar")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA')")
    public Paciente activarPaciente(@PathVariable Long id) {
        return pacienteService.activarPaciente(id);
    }

    @GetMapping("/mi-perfil")
    @PreAuthorize("hasRole('PACIENTE')")
    public Paciente obtenerMiPerfil(Authentication authentication) {
        String username = authentication.getName();
        return pacienteService.obtenerMiPerfil(username);
    }

    @PutMapping("/mi-perfil")
    @PreAuthorize("hasRole('PACIENTE')")
    public Paciente actualizarMiPerfil(
            Authentication authentication,
            @RequestBody Paciente paciente
    ) {
        String username = authentication.getName();
        return pacienteService.actualizarMiPerfil(username, paciente);
    }
}