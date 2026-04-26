package com.medicontrol.controllers;

import com.medicontrol.dto.paciente.PacienteDTO;
import com.medicontrol.dto.paciente.PacienteRequest;
import com.medicontrol.service.PacienteService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

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
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA')")
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
}