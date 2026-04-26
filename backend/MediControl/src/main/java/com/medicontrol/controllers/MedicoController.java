package com.medicontrol.controllers;

import com.medicontrol.model.Medico;
import com.medicontrol.service.MedicoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicos")
@CrossOrigin(origins = "http://localhost:5173")
public class MedicoController {

    private final MedicoService medicoService;

    public MedicoController(MedicoService medicoService) {
        this.medicoService = medicoService;
    }

    @GetMapping
    public List<Medico> listarMedicos() {
        return medicoService.listarMedicos();
    }

    @GetMapping("/{id}")
    public Medico buscarPorId(@PathVariable Long id) {
        return medicoService.buscarPorId(id);
    }

    @PostMapping
    public Medico registrarMedico(@RequestBody Medico medico) {
        return medicoService.registrarMedico(medico);
    }

    @PutMapping("/{id}")
    public Medico actualizarMedico(@PathVariable Long id, @RequestBody Medico medico) {
        return medicoService.actualizarMedico(id, medico);
    }

    @DeleteMapping("/{id}")
    public void eliminarMedico(@PathVariable Long id) {
        medicoService.eliminarMedico(id);
    }
}