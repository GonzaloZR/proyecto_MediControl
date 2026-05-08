# 🏥 MediControl — Sistema Integral de Gestión Clínica

MediControl es una plataforma web desarrollada para optimizar la administración y gestión operativa de una clínica médica.  
El sistema permite gestionar pacientes, médicos, especialidades, citas médicas y usuarios administrativos mediante un esquema seguro basado en roles y autenticación JWT.

El proyecto fue desarrollado utilizando arquitectura cliente-servidor con un backend RESTful en Spring Boot y un frontend moderno en React.

---

# ✨ Características principales

## 🔐 Autenticación y seguridad
- Login seguro con JWT
- Control de acceso basado en roles
- Protección de rutas frontend y backend
- Gestión de sesiones

## 👨‍⚕️ Gestión médica
- Registro y administración de médicos
- Especialidades médicas
- Validación de colegiatura
- Activación y desactivación lógica

## 🧑‍🤝‍🧑 Gestión de pacientes
- Registro completo de pacientes
- Perfil editable del paciente
- Historial de citas
- Validaciones de DNI y teléfono

## 📅 Gestión de citas médicas
- Solicitud de citas
- Confirmación y rechazo de citas
- Atención médica
- Registro de diagnósticos y observaciones
- Horarios médicos dinámicos

## 👥 Gestión de usuarios
- Administración de usuarios internos
- Roles:
  - ADMIN
  - RECEPCIONISTA
  - MEDICO
  - PACIENTE

## 📊 Dashboard inteligente
- Panel administrativo
- Métricas del sistema
- Visualización de estados de citas
- Dashboard personalizado según el rol

---

# 🚀 Tecnologías utilizadas

## 🔧 Backend
- Java 17
- Spring Boot 3.2.5
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- Lombok
- Validation API

## 🎨 Frontend
- React
- Vite
- Bootstrap 5
- Axios
- React Router DOM

## 🗄️ Base de datos
- MySQL Server

## 🛠️ Herramientas de desarrollo
- IntelliJ IDEA
- Visual Studio Code
- Postman
- Git & GitHub

---

# 🧱 Arquitectura del sistema

El proyecto sigue una arquitectura multicapa basada en:

- Controllers
- Services
- Repositories
- DTOs
- Entities
- Security Layer (JWT)

---

# 👨‍💻 Roles del sistema

| Rol | Funcionalidades |
|------|----------------|
| ADMIN | Control total del sistema |
| RECEPCIONISTA | Gestión operativa de citas y pacientes |
| MEDICO | Atención médica y diagnósticos |
| PACIENTE | Solicitud y seguimiento de citas |

---

# 📁 Estructura del proyecto

```text
proyecto_MediControl/
│
├── backend/
│   └── MediControl/
│       ├── src/
│       ├── pom.xml
│       └── ...
│
├── frontend/
│   └── mediControl/
│       ├── src/
│       ├── public/
│       ├── package.json
│       └── ...
│
├── docs/
│   ├── database/
│   ├── evidencias/
│   ├── uml/
│   └── reportes/
│
└── README.md

## ⚙️ Configuración del Backend

### 1️⃣ Clonar repositorio
```bash
git clone https://github.com/GonzaloZR/proyecto_MediControl.git
```

### 2️⃣ Configurar base de datos
```sql
CREATE DATABASE medicontrol;
```

### 3️⃣ Configurar `application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/medicontrol
spring.datasource.username=root
spring.datasource.password=TU_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 4️⃣ Ejecutar backend
```bash
cd backend/MediControl
mvn spring-boot:run
```

**Servidor backend:** `http://localhost:8080`

---

## 💻 Configuración del Frontend

### 1️⃣ Instalar dependencias
```bash
cd frontend/mediControl
npm install
```

### 2️⃣ Ejecutar aplicación
```bash
npm run dev
```

**Servidor frontend:** `http://localhost:5173`

---

## 🔑 Roles de prueba

| Rol | Usuario | Password |
|------|----------|-----------|
| 👑 ADMIN | admin | 123456 |
| 🩺 MÉDICO | medico1 | 123456 |
| 🧾 RECEPCIONISTA | recepcionista1 | 123456 |

---

## 📌 Funcionalidades implementadas

- ✅ Login con JWT
- ✅ Registro de pacientes
- ✅ CRUD de médicos
- ✅ CRUD de especialidades
- ✅ CRUD de pacientes
- ✅ Gestión de usuarios internos
- ✅ Solicitud de citas
- ✅ Confirmación y rechazo de citas
- ✅ Atención médica
- ✅ Diagnósticos
- ✅ Dashboards por rol
- ✅ Eliminación lógica
- ✅ Activación/desactivación
- ✅ Validaciones frontend/backend
- ✅ Protección de rutas
- ✅ Seguridad basada en roles

---

## 📷 Evidencias del sistema

Las capturas, diagramas UML y documentación adicional se encuentran en:

```text
/docs
```

---

## 📖 Autor

**Gonzalo Sebastian Zavala Rosas**  
💼 Desarrollador Backend & Frontend  
🎓 Computación e Informática — Cibertec  
🌎 Lima, Perú  

### 🔗 GitHub
[GonzaloZR - GitHub](https://github.com/GonzaloZR?utm_source=chatgpt.com)

### 🔗 LinkedIn
[Gonzalo Sebastian Zavala Rosas - LinkedIn](https://www.linkedin.com/in/gonzalo-sebastian-zavala-rosas-8510a51b8/?utm_source=chatgpt.com)

---

## 📄 Licencia

Proyecto desarrollado con fines académicos y educativos.