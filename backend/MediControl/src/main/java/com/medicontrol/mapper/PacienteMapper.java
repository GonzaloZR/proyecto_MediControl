package com.medicontrol.mapper;

import com.medicontrol.dto.paciente.PacienteDTO;
import com.medicontrol.dto.paciente.PacienteRequest;
import com.medicontrol.model.Paciente;

public class PacienteMapper {

    public static PacienteDTO toDTO(Paciente paciente) {
        PacienteDTO dto = new PacienteDTO();

        dto.setId(paciente.getId());
        dto.setNombre(paciente.getNombre());
        dto.setApellido(paciente.getApellido());
        dto.setDni(paciente.getDni());
        dto.setTelefono(paciente.getTelefono());
        dto.setCorreo(paciente.getCorreo());
        dto.setDireccion(paciente.getDireccion());
        dto.setFechaNacimiento(paciente.getFechaNacimiento());
        dto.setSexo(paciente.getSexo());
        dto.setTipoSangre(paciente.getTipoSangre());
        dto.setAlergias(paciente.getAlergias());
        dto.setContactoEmergencia(paciente.getContactoEmergencia());
        dto.setTelefonoEmergencia(paciente.getTelefonoEmergencia());
        dto.setFechaRegistro(paciente.getFechaRegistro());

        return dto;
    }

    public static Paciente toEntity(PacienteRequest request) {
        Paciente paciente = new Paciente();

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

        return paciente;
    }

    public static void updateEntity(Paciente paciente, PacienteRequest request) {
        paciente.setNombre(request.getNombre());
        paciente.setApellido(request.getApellido());
        paciente.setTelefono(request.getTelefono());
        paciente.setCorreo(request.getCorreo());
        paciente.setDireccion(request.getDireccion());
        paciente.setFechaNacimiento(request.getFechaNacimiento());
        paciente.setSexo(request.getSexo());
        paciente.setTipoSangre(request.getTipoSangre());
        paciente.setAlergias(request.getAlergias());
        paciente.setContactoEmergencia(request.getContactoEmergencia());
        paciente.setTelefonoEmergencia(request.getTelefonoEmergencia());
    }
}