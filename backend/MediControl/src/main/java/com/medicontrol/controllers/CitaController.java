package com.medicontrol.controllers;

import com.medicontrol.model.Cita;
import com.medicontrol.model.Paciente;
import com.medicontrol.model.Usuario;
import com.medicontrol.repository.PacienteRepository;
import com.medicontrol.repository.UsuarioRepository;
import com.medicontrol.security.JwtService;
import com.medicontrol.service.CitaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import com.medicontrol.dto.cita.AtencionRequest;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
@CrossOrigin(origins = "http://localhost:5173")
public class CitaController {

    private final CitaService citaService;
    private final UsuarioRepository usuarioRepository;
    private final PacienteRepository pacienteRepository;
    private final JwtService jwtService;

    public CitaController(CitaService citaService, UsuarioRepository usuarioRepository, PacienteRepository pacienteRepository, JwtService jwtService) {

        this.citaService = citaService;
        this.usuarioRepository = usuarioRepository;
        this.pacienteRepository = pacienteRepository;
        this.jwtService = jwtService;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA', 'MEDICO')")
    public List<Cita> listarCitas() {

        return citaService.listarCitas();
    }

    @GetMapping("/mis-citas")
    @PreAuthorize("hasRole('PACIENTE')")
    public List<Cita> listarMisCitas(@RequestHeader("Authorization") String token) {

        String username = jwtService.extraerUsername(token.replace("Bearer ", ""));

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Paciente paciente = pacienteRepository.findByUsuarioId(usuario.getId())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        return citaService.listarCitasPorPaciente(paciente.getId());
    }

    @PostMapping("/mis-citas")
    @PreAuthorize("hasRole('PACIENTE')")
    public Cita registrarMiCita(
            @RequestHeader("Authorization") String token,
            @RequestBody Cita cita
    ) {
        String username = jwtService.extraerUsername(token.replace("Bearer ", ""));

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Paciente paciente = pacienteRepository.findByUsuarioId(usuario.getId())
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));

        cita.setPaciente(paciente);

        return citaService.registrarCita(cita);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA', 'MEDICO')")
    public Cita buscarPorId(@PathVariable Long id) {

        return citaService.buscarPorId(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA')")
    public Cita registrarCita(@RequestBody Cita cita) {
        return citaService.registrarCita(cita);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA', 'MEDICO')")
    public Cita actualizarCita(@PathVariable Long id, @RequestBody Cita cita) {
        return citaService.actualizarCita(id, cita);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA')")
    public void cancelarCita(@PathVariable Long id) {
        citaService.cancelarCita(id);
    }

    @PutMapping("/{id}/confirmar")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA')")
    public Cita confirmarCita(@PathVariable Long id) {
        return citaService.confirmarCita(id);
    }

    @PutMapping("/{id}/en-curso")
    @PreAuthorize("hasAnyRole('ADMIN', 'MEDICO')")
    public Cita marcarEnCurso(@PathVariable Long id) {
        return citaService.marcarEnCurso(id);
    }

    @PutMapping("/{id}/atendida")
    @PreAuthorize("hasAnyRole('ADMIN', 'MEDICO')")
    public Cita marcarAtendida(
            @PathVariable Long id,
            @Valid @RequestBody AtencionRequest request
    ) {
        return citaService.marcarAtendida(
                id,
                request.getDiagnostico(),
                request.getObservaciones()
        );
    }

    @PutMapping("/{id}/rechazar")
    @PreAuthorize("hasAnyRole('ADMIN', 'RECEPCIONISTA')")
    public Cita rechazarCita(@PathVariable Long id) {
        return citaService.rechazarCita(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MEDICO')")
    @GetMapping("/mis-citas-medico")
    public ResponseEntity<List<Cita>> listarMisCitasMedico(
            Authentication authentication
    ) {

        String username = authentication.getName();

        return ResponseEntity.ok(
                citaService.listarCitasPorMedico(username)
        );
    }
}