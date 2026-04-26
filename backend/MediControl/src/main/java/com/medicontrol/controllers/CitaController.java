package com.medicontrol.controllers;

import com.medicontrol.model.Cita;
import com.medicontrol.service.CitaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "http://localhost:5173")
public class CitaController {

    private final CitaService citaService;

    public CitaController(CitaService citaService) {
        this.citaService = citaService;
    }

    @GetMapping
    public List<Cita> listarCitas() {
        return citaService.listarCitas();
    }

    @GetMapping("/{id}")
    public Cita buscarPorId(@PathVariable Long id) {
        return citaService.buscarPorId(id);
    }

    @PostMapping
    public Cita registrarCita(@RequestBody Cita cita) {
        return citaService.registrarCita(cita);
    }

    @PutMapping("/{id}")
    public Cita actualizarCita(@PathVariable Long id, @RequestBody Cita cita) {
        return citaService.actualizarCita(id, cita);
    }

    @DeleteMapping("/{id}")
    public void cancelarCita(@PathVariable Long id) {
        citaService.cancelarCita(id);
    }
}