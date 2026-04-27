package com.medicontrol.controllers;

import com.medicontrol.dto.auth.AuthResponse;
import com.medicontrol.dto.auth.LoginRequest;
import com.medicontrol.dto.auth.RegisterRequest;
import com.medicontrol.service.AuthService;
import org.springframework.web.bind.annotation.*;
import com.medicontrol.dto.paciente.PacienteRegisterRequest;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {

        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {

        return authService.login(request);
    }

    @PostMapping("/register-paciente")
    public AuthResponse registerPaciente(@RequestBody PacienteRegisterRequest request) {
        return authService.registerPaciente(request);
    }
}