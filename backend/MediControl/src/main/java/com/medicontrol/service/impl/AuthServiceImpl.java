package com.medicontrol.service.impl;

import com.medicontrol.dto.AuthResponse;
import com.medicontrol.dto.LoginRequest;
import com.medicontrol.dto.RegisterRequest;
import com.medicontrol.model.Rol;
import com.medicontrol.model.Usuario;
import com.medicontrol.repository.RolRepository;
import com.medicontrol.repository.UsuarioRepository;
import com.medicontrol.security.JwtService;
import com.medicontrol.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthServiceImpl(
            UsuarioRepository usuarioRepository,
            RolRepository rolRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        usuarioRepository.findByUsername(request.getUsername()).ifPresent(u -> {
            throw new RuntimeException("El usuario ya existe");
        });

        Rol rol = rolRepository.findById(request.getRolId())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));

        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setCorreo(request.getCorreo());
        usuario.setRol(rol);
        usuario.setFechaRegistro(LocalDateTime.now());
        usuario.setEstado(true);

        usuarioRepository.save(usuario);

        String token = jwtService.generarToken(usuario.getUsername(), rol.getNombre());

        return new AuthResponse(token);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByUsername(request.getUsername())
                .filter(u -> Boolean.TRUE.equals(u.getEstado()))
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            throw new RuntimeException("Credenciales incorrectas");
        }

        String token = jwtService.generarToken(
                usuario.getUsername(),
                usuario.getRol().getNombre()
        );

        return new AuthResponse(token);
    }
}