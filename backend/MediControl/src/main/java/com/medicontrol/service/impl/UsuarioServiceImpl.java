package com.medicontrol.service.impl;

import com.medicontrol.dto.usuario.UsuarioInternoRequest;
import com.medicontrol.model.Rol;
import com.medicontrol.model.Usuario;
import com.medicontrol.repository.RolRepository;
import com.medicontrol.repository.UsuarioRepository;
import com.medicontrol.service.UsuarioService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioServiceImpl(
            UsuarioRepository usuarioRepository,
            RolRepository rolRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario registrarInterno(UsuarioInternoRequest request) {

        usuarioRepository.findByUsername(request.getUsername()).ifPresent(u -> {
            throw new RuntimeException("El username ya está registrado");
        });

        usuarioRepository.findByCorreo(request.getCorreo()).ifPresent(u -> {
            throw new RuntimeException("El correo ya está registrado");
        });

        if (!"ADMIN".equalsIgnoreCase(request.getRol())
                && !"RECEPCIONISTA".equalsIgnoreCase(request.getRol())) {
            throw new RuntimeException("Solo se pueden crear usuarios ADMIN o RECEPCIONISTA desde este módulo");
        }

        Rol rol = rolRepository.findByNombre(request.getRol().toUpperCase())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setCorreo(request.getCorreo());
        usuario.setRol(rol);
        usuario.setFechaRegistro(LocalDateTime.now());
        usuario.setEstado(true);

        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario activarUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuario.setEstado(true);

        return usuarioRepository.save(usuario);
    }

    @Override
    public void desactivarUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuario.setEstado(false);

        usuarioRepository.save(usuario);
    }
}