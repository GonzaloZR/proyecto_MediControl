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
-- TABLA PACIENTES (ACTUALIZADA)
-- =========================
CREATE TABLE pacientes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(15) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    correo VARCHAR(120) UNIQUE,
    direccion VARCHAR(255),
    fecha_nacimiento DATE,
    sexo VARCHAR(20),
    tipo_sangre VARCHAR(10),
    alergias VARCHAR(255),
    contacto_emergencia VARCHAR(120),
    telefono_emergencia VARCHAR(20),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- =========================
-- TABLA MEDICOS (ACTUALIZADA)
-- =========================
CREATE TABLE medicos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(15) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    correo VARCHAR(120) UNIQUE,
    numero_colegiatura VARCHAR(50) UNIQUE,
    especialidad_id BIGINT NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN DEFAULT TRUE,

    FOREIGN KEY (especialidad_id) REFERENCES especialidades(id)
);

-- =========================
-- TABLA CITAS (ACTUALIZADA)
-- =========================
CREATE TABLE citas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    paciente_id BIGINT NOT NULL,
    medico_id BIGINT NOT NULL,
    fecha DATETIME NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    estado VARCHAR(50) DEFAULT 'PENDIENTE',
    diagnostico VARCHAR(255),
    observaciones VARCHAR(255),
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

-- Usuario inicial (luego se encriptará desde backend)
INSERT INTO usuarios (username, password, correo, rol_id) VALUES
('admin', 'admin123', 'admin@medicontrol.com', 1);


INSERT INTO roles (nombre, descripcion) VALUES
('PACIENTE', 'Usuario final que agenda citas');

ALTER TABLE pacientes
ADD usuario_id BIGINT UNIQUE;

ALTER TABLE pacientes
ADD CONSTRAINT fk_paciente_usuario
FOREIGN KEY (usuario_id) REFERENCES usuarios(id);