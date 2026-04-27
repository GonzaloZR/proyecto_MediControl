package com.medicontrol.service.impl;

import com.medicontrol.dto.auth.AuthResponse;
import com.medicontrol.dto.auth.LoginRequest;
import com.medicontrol.dto.auth.RegisterRequest;
import com.medicontrol.model.Rol;
import com.medicontrol.model.Usuario;
import com.medicontrol.repository.RolRepository;
import com.medicontrol.repository.UsuarioRepository;
import com.medicontrol.security.JwtService;
import com.medicontrol.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.medicontrol.dto.paciente.PacienteRegisterRequest;
import com.medicontrol.model.Paciente;
import com.medicontrol.repository.PacienteRepository;


import java.time.LocalDateTime;

@Service
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final PacienteRepository pacienteRepository;


    public AuthServiceImpl(
            UsuarioRepository usuarioRepository,
            RolRepository rolRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            PacienteRepository pacienteRepository
    ) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.pacienteRepository = pacienteRepository;
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

        return new AuthResponse(
                token,
                usuario.getUsername(),
                rol.getNombre(),
                null
        );
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

        Long pacienteId = null;

        if ("PACIENTE".equalsIgnoreCase(usuario.getRol().getNombre())) {
            pacienteId = pacienteRepository.findByUsuarioId(usuario.getId())
                    .map(Paciente::getId)
                    .orElse(null);
        }

        return new AuthResponse(
                token,
                usuario.getUsername(),
                usuario.getRol().getNombre(),
                pacienteId
        );
    }

    @Override
    public AuthResponse registerPaciente(PacienteRegisterRequest request) {

        usuarioRepository.findByUsername(request.getUsername()).ifPresent(u -> {
            throw new RuntimeException("El usuario ya existe");
        });

        pacienteRepository.findByDni(request.getDni()).ifPresent(p -> {
            throw new RuntimeException("Ya existe un paciente con ese DNI");
        });

        Rol rolPaciente = rolRepository.findById(4L)
                .orElseThrow(() -> new RuntimeException("Rol PACIENTE no encontrado"));

        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));
        usuario.setCorreo(request.getCorreo());
        usuario.setRol(rolPaciente);
        usuario.setFechaRegistro(LocalDateTime.now());
        usuario.setEstado(true);

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        Paciente paciente = new Paciente();
        paciente.setUsuario(usuarioGuardado);
        paciente.setNombre(request.getNombre());
        paciente.setApellido(request.getApellido());
        paciente.setDni(request.getDni());
        paciente.setTelefono(request.getTelefono());
        paciente.setCorreo(request.getCorreo());
        paciente.setDireccion(request.getDireccion());
        paciente.setFechaNacimiento(request.getFechaNacimiento());
        paciente.setSexo(request.getSexo());
        paciente.setTipoSangre(request.getTipoSangre());
        paciente.setAlergias(request.getAlergias());
        paciente.setContactoEmergencia(request.getContactoEmergencia());
        paciente.setTelefonoEmergencia(request.getTelefonoEmergencia());
        paciente.setFechaRegistro(LocalDateTime.now());
        paciente.setEstado(true);

        Paciente pacienteGuardado = pacienteRepository.save(paciente);

        String token = jwtService.generarToken(
                usuarioGuardado.getUsername(),
                rolPaciente.getNombre()
        );

        return new AuthResponse(
                token,
                usuarioGuardado.getUsername(),
                rolPaciente.getNombre(),
                pacienteGuardado.getId()
        );
    }


}