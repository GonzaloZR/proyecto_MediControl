package com.medicontrol.service;

import com.medicontrol.dto.AuthResponse;
import com.medicontrol.dto.LoginRequest;
import com.medicontrol.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}