package com.medicontrol.controllers;

import com.medicontrol.dto.usuario.UsuarioInternoRequest;
import com.medicontrol.model.Usuario;
import com.medicontrol.service.UsuarioService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/todos")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Usuario> listarTodos() {
        return usuarioService.listarTodos();
    }

    @PostMapping("/registrar-interno")
    @PreAuthorize("hasRole('ADMIN')")
    public Usuario registrarInterno(@RequestBody UsuarioInternoRequest request) {
        return usuarioService.registrarInterno(request);
    }

    @PutMapping("/{id}/activar")
    @PreAuthorize("hasRole('ADMIN')")
    public Usuario activarUsuario(@PathVariable Long id) {
        return usuarioService.activarUsuario(id);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void desactivarUsuario(@PathVariable Long id) {
        usuarioService.desactivarUsuario(id);
    }
}