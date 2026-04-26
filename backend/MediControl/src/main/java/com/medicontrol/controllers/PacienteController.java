package com.medicontrol.controllers;

import com.medicontrol.dto.paciente.PacienteDTO;
import com.medicontrol.dto.paciente.PacienteRequest;
import com.medicontrol.service.PacienteService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

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
    public List<PacienteDTO> listarPacientes() {
        return pacienteService.listarPacientes();
    }

    @GetMapping("/{id}")
    public PacienteDTO buscarPorId(@PathVariable Long id) {
        return pacienteService.buscarPorId(id);
    }

    @PostMapping
    public PacienteDTO registrarPaciente(@Valid @RequestBody PacienteRequest request) {
        return pacienteService.registrarPaciente(request);
    }

    @PutMapping("/{id}")
    public PacienteDTO actualizarPaciente(
            @PathVariable Long id,
            @Valid @RequestBody PacienteRequest request
    ) {
        return pacienteService.actualizarPaciente(id, request);
    }

    @DeleteMapping("/{id}")
    public void eliminarPaciente(@PathVariable Long id) {
        pacienteService.eliminarPaciente(id);
    }
}