CREATE DATABASE IF NOT EXISTS medicontrol_db;
USE medicontrol_db;

-- =========================
-- TABLA ROLES
-- =========================
CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255),
    estado BOOLEAN DEFAULT TRUE
);

-- =========================
-- TABLA USUARIOS
-- =========================
CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    correo VARCHAR(120) NOT NULL UNIQUE,
    rol_id BIGINT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

-- =========================
-- TABLA ESPECIALIDADES
-- =========================
CREATE TABLE especialidades (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255),
    estado BOOLEAN DEFAULT TRUE
);

-- =========================
-- TABLA PACIENTES
-- =========================
CREATE TABLE pacientes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(15) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN DEFAULT TRUE
);

-- =========================
-- TABLA MEDICOS
-- =========================
CREATE TABLE medicos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(15) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    correo VARCHAR(120) UNIQUE,
    especialidad_id BIGINT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (especialidad_id) REFERENCES especialidades(id)
);

-- =========================
-- TABLA CITAS
-- =========================
CREATE TABLE citas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    paciente_id BIGINT NOT NULL,
    medico_id BIGINT NOT NULL,
    fecha DATETIME NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    estado VARCHAR(50) DEFAULT 'PENDIENTE',
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    FOREIGN KEY (medico_id) REFERENCES medicos(id),

    CONSTRAINT uk_medico_fecha UNIQUE (medico_id, fecha)
);

-- =========================
-- DATOS INICIALES
-- =========================
INSERT INTO roles (nombre, descripcion) VALUES
('ADMIN', 'Administrador del sistema'),
('RECEPCIONISTA', 'Usuario encargado de registrar pacientes y citas'),
('MEDICO', 'Usuario médico que atiende citas');

INSERT INTO especialidades (nombre, descripcion) VALUES
('Medicina General', 'Atención médica general'),
('Pediatría', 'Atención médica para niños'),
('Cardiología', 'Atención de enfermedades del corazón');

-- Contraseña temporal: admin123
-- Luego en Spring Boot la guardaremos encriptada con BCrypt
INSERT INTO usuarios (username, password, correo, rol_id) VALUES
('admin', 'admin123', 'admin@medicontrol.com', 1);