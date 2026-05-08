package com.medicontrol.service;

import com.medicontrol.dto.usuario.UsuarioInternoRequest;
import com.medicontrol.model.Usuario;

import java.util.List;

public interface UsuarioService {

    List<Usuario> listarTodos();

    Usuario registrarInterno(UsuarioInternoRequest request);

    Usuario activarUsuario(Long id);

    void desactivarUsuario(Long id);
}