package com.medicontrol.repository;

import com.medicontrol.model.Cita;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface CitaRepository extends JpaRepository<Cita, Long> {

    Optional<Cita> findByMedicoIdAndFecha(Long medicoId, LocalDateTime fecha);

    List<Cita> findByPacienteIdAndActivoTrue(Long pacienteId);
}