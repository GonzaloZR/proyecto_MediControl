package com.medicontrol.service;

import com.medicontrol.dto.auth.AuthResponse;
import com.medicontrol.dto.auth.LoginRequest;
import com.medicontrol.dto.auth.RegisterRequest;
import com.medicontrol.dto.paciente.PacienteRegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    AuthResponse registerPaciente(PacienteRegisterRequest request);
}