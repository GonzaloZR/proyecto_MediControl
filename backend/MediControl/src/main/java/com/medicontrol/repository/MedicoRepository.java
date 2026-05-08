package com.medicontrol.repository;

import com.medicontrol.model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MedicoRepository extends JpaRepository<Medico, Long> {

    Optional<Medico> findByUsuarioUsername(String username);
}