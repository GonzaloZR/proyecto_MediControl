package com.medicontrol.service.impl;

import com.medicontrol.dto.medico.MedicoRegistroDTO;
import com.medicontrol.model.Especialidad;
import com.medicontrol.model.Medico;
import com.medicontrol.model.Rol;
import com.medicontrol.model.Usuario;
import com.medicontrol.repository.EspecialidadRepository;
import com.medicontrol.repository.MedicoRepository;
import com.medicontrol.repository.RolRepository;
import com.medicontrol.repository.UsuarioRepository;
import com.medicontrol.service.MedicoService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class MedicoServiceImpl implements MedicoService {

    private final MedicoRepository medicoRepository;
    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final EspecialidadRepository especialidadRepository;
    private final PasswordEncoder passwordEncoder;

    public MedicoServiceImpl(
            MedicoRepository medicoRepository,
            UsuarioRepository usuarioRepository,
            RolRepository rolRepository,
            EspecialidadRepository especialidadRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.medicoRepository = medicoRepository;
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.especialidadRepository = especialidadRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<Medico> listarMedicos() {
        return medicoRepository.findAll()
                .stream()
                .filter(m -> Boolean.TRUE.equals(m.getEstado()))
                .toList();
    }

    @Override
    public Medico buscarPorId(Long id) {
        return medicoRepository.findById(id)
                .filter(m -> Boolean.TRUE.equals(m.getEstado()))
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));
    }

    @Override
    public Medico registrarMedico(Medico medico) {
        medico.setFechaRegistro(LocalDateTime.now());
        medico.setEstado(true);
        return medicoRepository.save(medico);
    }

    @Override
    @Transactional
    public Medico registrarMedicoConUsuario(MedicoRegistroDTO dto) {

        Rol rolMedico = rolRepository.findByNombre("MEDICO")
                .orElseThrow(() -> new RuntimeException("Rol MEDICO no encontrado"));

        Especialidad especialidad = especialidadRepository.findById(dto.getEspecialidadId())
                .orElseThrow(() -> new RuntimeException("Especialidad no encontrada"));

        Usuario usuario = new Usuario();
        usuario.setUsername(dto.getUsername());
        usuario.setPassword(passwordEncoder.encode(dto.getPassword()));
        usuario.setCorreo(dto.getCorreo());
        usuario.setRol(rolMedico);
        usuario.setEstado(true);
        usuario.setFechaRegistro(LocalDateTime.now());

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        Medico medico = new Medico();
        medico.setNombre(dto.getNombre());
        medico.setApellido(dto.getApellido());
        medico.setDni(dto.getDni());
        medico.setTelefono(dto.getTelefono());
        medico.setCorreo(dto.getCorreo());
        medico.setNumeroColegiatura(dto.getNumeroColegiatura());
        medico.setEspecialidad(especialidad);
        medico.setUsuario(usuarioGuardado);
        medico.setEstado(true);
        medico.setFechaRegistro(LocalDateTime.now());

        return medicoRepository.save(medico);
    }

    @Override
    public Medico actualizarMedico(Long id, Medico medico) {
        Medico existente = buscarPorId(id);

        existente.setNombre(medico.getNombre());
        existente.setApellido(medico.getApellido());
        existente.setTelefono(medico.getTelefono());
        existente.setCorreo(medico.getCorreo());
        existente.setEspecialidad(medico.getEspecialidad());
        existente.setNumeroColegiatura(medico.getNumeroColegiatura());

        return medicoRepository.save(existente);
    }

    @Override
    public void eliminarMedico(Long id) {
        Medico medico = buscarPorId(id);
        medico.setEstado(false);
        medicoRepository.save(medico);
    }

    @Override
    public List<Medico> listarTodos() {
        return medicoRepository.findAll();
    }

    @Override
    public Medico activarMedico(Long id) {
        Medico medico = medicoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Médico no encontrado"));

        medico.setEstado(true);

        return medicoRepository.save(medico);
    }


}