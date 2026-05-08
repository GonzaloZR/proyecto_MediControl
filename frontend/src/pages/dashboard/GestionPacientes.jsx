import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosConfig";

const styles = `
:root {
  --mc-navy:#0B1E3D;
  --mc-navy-2:#132952;
  --mc-teal:#1ABFA1;
  --mc-cream:#F7F9FC;
  --mc-muted:#7A8BA8;
  --mc-text:#1C2B45;
  --mc-border:rgba(11,30,61,.10);
  --mc-danger:#E55A5A;
  --mc-warning:#F4A928;
  --mc-shadow:0 10px 34px rgba(11,30,61,.11);
}

.gp-page * { box-sizing:border-box; }

.gp-page {
  min-height:100vh;
  background:var(--mc-cream);
  font-family:'DM Sans', sans-serif;
  color:var(--mc-text);
  padding:42px;
}

.gp-header {
  background:linear-gradient(135deg,var(--mc-navy),var(--mc-navy-2),#1a3870);
  color:white;
  border-radius:26px;
  padding:38px 42px;
  box-shadow:var(--mc-shadow);
  margin-bottom:28px;
  position:relative;
  overflow:hidden;
}

.gp-header::after {
  content:"";
  position:absolute;
  right:-80px;
  top:-90px;
  width:330px;
  height:330px;
  background:radial-gradient(circle,rgba(26,191,161,.28),transparent 70%);
}

.gp-header-top {
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:20px;
  position:relative;
  z-index:2;
}

.gp-tag {
  display:inline-block;
  background:rgba(26,191,161,.14);
  border:1px solid rgba(26,191,161,.28);
  color:var(--mc-teal);
  padding:7px 15px;
  border-radius:999px;
  font-size:12px;
  font-weight:900;
  letter-spacing:.1em;
  text-transform:uppercase;
  margin-bottom:16px;
}

.gp-title {
  font-family:'Playfair Display', serif;
  font-size:40px;
  margin:0 0 8px;
}

.gp-subtitle {
  font-size:16px;
  color:rgba(255,255,255,.68);
  margin:0;
}

.gp-back-btn {
  border:1px solid rgba(255,255,255,.16);
  background:rgba(255,255,255,.10);
  color:white;
  border-radius:14px;
  padding:12px 18px;
  font-size:14px;
  font-weight:800;
  cursor:pointer;
  transition:.2s;
  white-space:nowrap;
}

.gp-back-btn:hover {
  background:rgba(26,191,161,.18);
  border-color:rgba(26,191,161,.38);
  color:var(--mc-teal);
}

.gp-alert {
  border-radius:15px;
  padding:15px 18px;
  font-size:15px;
  font-weight:700;
  margin-bottom:20px;
}

.gp-alert.success {
  background:rgba(26,191,161,.10);
  color:var(--mc-teal);
  border:1px solid rgba(26,191,161,.25);
}

.gp-alert.error {
  background:rgba(229,90,90,.09);
  color:var(--mc-danger);
  border:1px solid rgba(229,90,90,.22);
}

.gp-stats {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:18px;
  margin-bottom:26px;
}

.gp-stat-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:22px;
  padding:22px;
  box-shadow:var(--mc-shadow);
}

.gp-stat-card span {
  color:var(--mc-muted);
  font-size:13px;
  font-weight:800;
}

.gp-stat-card h3 {
  font-family:'Playfair Display', serif;
  font-size:34px;
  color:var(--mc-navy);
  margin:8px 0 0;
}

.gp-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:24px;
  box-shadow:var(--mc-shadow);
  padding:28px;
  margin-bottom:28px;
}

.gp-card-header {
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:18px;
  margin-bottom:24px;
}

.gp-card-title {
  font-family:'Playfair Display', serif;
  font-size:30px;
  color:var(--mc-navy);
  margin:0 0 4px;
}

.gp-card-subtitle {
  color:var(--mc-muted);
  font-size:15px;
  margin:0;
}

.gp-form-grid {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:18px;
}

.gp-field.full { grid-column:1 / -1; }
.gp-field.half { grid-column:span 2; }
.gp-field.three { grid-column:span 3; }

.gp-label {
  display:block;
  color:var(--mc-navy);
  font-size:12px;
  font-weight:900;
  text-transform:uppercase;
  letter-spacing:.07em;
  margin-bottom:8px;
}

.gp-input,
.gp-select {
  width:100%;
  border:1.5px solid var(--mc-border);
  background:var(--mc-cream);
  border-radius:14px;
  padding:14px 16px;
  font-size:15px;
  color:var(--mc-text);
  outline:none;
  font-family:'DM Sans', sans-serif;
}

.gp-input:focus,
.gp-select:focus {
  background:white;
  border-color:var(--mc-teal);
  box-shadow:0 0 0 4px rgba(26,191,161,.10);
}

.gp-help {
  display:block;
  margin-top:6px;
  color:var(--mc-muted);
  font-size:12px;
}

.gp-actions {
  display:flex;
  gap:12px;
  margin-top:24px;
  flex-wrap:wrap;
}

.gp-btn {
  border:none;
  border-radius:14px;
  padding:13px 18px;
  font-size:14px;
  font-weight:900;
  cursor:pointer;
  transition:.2s;
  font-family:'DM Sans', sans-serif;
}

.gp-btn.primary {
  background:var(--mc-navy);
  color:white;
}

.gp-btn.primary:hover { background:var(--mc-teal); }

.gp-btn.secondary {
  background:white;
  color:var(--mc-navy);
  border:1.5px solid var(--mc-border);
}

.gp-btn.secondary:hover {
  color:var(--mc-teal);
  border-color:rgba(26,191,161,.35);
}

.gp-btn.warning {
  background:rgba(244,169,40,.13);
  color:#a67200;
  border:1px solid rgba(244,169,40,.25);
}

.gp-btn.danger {
  background:rgba(229,90,90,.10);
  color:var(--mc-danger);
  border:1px solid rgba(229,90,90,.25);
}

.gp-btn.success {
  background:rgba(26,191,161,.12);
  color:var(--mc-teal);
  border:1px solid rgba(26,191,161,.25);
}

.gp-btn.warning:hover,
.gp-btn.danger:hover,
.gp-btn.success:hover {
  filter:brightness(.96);
  transform:translateY(-1px);
}

.gp-toolbar {
  display:grid;
  grid-template-columns:1fr auto;
  gap:16px;
  margin-bottom:20px;
  align-items:center;
}

.gp-switch {
  display:flex;
  align-items:center;
  gap:10px;
  color:var(--mc-muted);
  font-size:14px;
  font-weight:800;
  white-space:nowrap;
}

.gp-switch input {
  width:18px;
  height:18px;
  accent-color:var(--mc-teal);
}

.gp-table-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:24px;
  box-shadow:var(--mc-shadow);
  overflow:hidden;
}

.gp-table-wrap { overflow-x:auto; }

.gp-table {
  width:100%;
  border-collapse:collapse;
}

.gp-table thead tr { background:var(--mc-navy); }

.gp-table th {
  padding:18px 20px;
  color:rgba(255,255,255,.72);
  font-size:13px;
  text-transform:uppercase;
  letter-spacing:.08em;
  text-align:left;
  white-space:nowrap;
}

.gp-table td {
  padding:20px;
  border-bottom:1px solid var(--mc-border);
  font-size:15px;
  vertical-align:middle;
}

.gp-table tbody tr:hover { background:rgba(26,191,161,.035); }
.gp-table tbody tr:last-child td { border-bottom:none; }
.gp-row-inactive { background:rgba(11,30,61,.025); }

.gp-person {
  display:flex;
  flex-direction:column;
  gap:3px;
}

.gp-person strong {
  color:var(--mc-navy);
  font-size:15px;
}

.gp-person span {
  color:var(--mc-muted);
  font-size:13px;
}

.gp-status {
  display:inline-flex;
  align-items:center;
  gap:7px;
  border-radius:999px;
  padding:7px 13px;
  font-size:13px;
  font-weight:900;
}

.gp-status::before {
  content:"";
  width:8px;
  height:8px;
  border-radius:50%;
}

.gp-status.active {
  background:rgba(26,191,161,.13);
  color:var(--mc-teal);
}

.gp-status.active::before { background:var(--mc-teal); }

.gp-status.inactive {
  background:rgba(11,30,61,.08);
  color:var(--mc-muted);
}

.gp-status.inactive::before { background:var(--mc-muted); }

.gp-table-actions {
  display:flex;
  gap:10px;
  flex-wrap:wrap;
}

.gp-empty {
  padding:48px 24px;
  text-align:center;
  color:var(--mc-muted);
}

.gp-empty h3 {
  font-family:'Playfair Display', serif;
  color:var(--mc-navy);
  font-size:28px;
  margin-bottom:6px;
}

@media(max-width:1200px) {
  .gp-stats { grid-template-columns:repeat(2,1fr); }
  .gp-form-grid { grid-template-columns:repeat(2,1fr); }
  .gp-field.three { grid-column:1 / -1; }
}

@media(max-width:760px) {
  .gp-page { padding:24px; }
  .gp-header { padding:30px 26px; }
  .gp-header-top { flex-direction:column; }
  .gp-back-btn { width:100%; }
  .gp-title { font-size:32px; }
  .gp-stats,
  .gp-form-grid { grid-template-columns:1fr; }
  .gp-field.half,
  .gp-field.three { grid-column:1 / -1; }
  .gp-toolbar { grid-template-columns:1fr; }
}
`;

function GestionPacientes() {
    const navigate = useNavigate();

    const [pacientes, setPacientes] = useState([]);
    const [mostrarInactivos, setMostrarInactivos] = useState(false);
    const [busqueda, setBusqueda] = useState("");

    const [form, setForm] = useState({
        username: "",
        password: "",
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        correo: "",
        direccion: "",
        fechaNacimiento: "",
        sexo: "",
        tipoSangre: "",
        alergias: "",
        contactoEmergencia: "",
        telefonoEmergencia: "",
    });

    const [editandoId, setEditandoId] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const tag = document.createElement("style");
        tag.id = "gestion-pacientes-pro-styles";
        tag.textContent = styles;

        if (!document.getElementById("gestion-pacientes-pro-styles")) {
            document.head.appendChild(tag);
        }

        obtenerPacientes();

        return () => tag.remove();
    }, []);

    const obtenerPacientes = async () => {
        try {
            setError("");
            const response = await API.get("/pacientes/todos");
            setPacientes(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error(err);
            setError("Error al cargar pacientes.");
        }
    };

    const pacientesFiltrados = useMemo(() => {
        const texto = busqueda.toLowerCase().trim();

        return pacientes
            .filter((p) => (mostrarInactivos ? true : p.estado))
            .filter((p) => {
                const data = `${p.nombre || ""} ${p.apellido || ""} ${p.dni || ""} ${p.correo || ""
                    } ${p.telefono || ""}`.toLowerCase();

                return data.includes(texto);
            });
    }, [pacientes, mostrarInactivos, busqueda]);

    const limpiarFormulario = () => {
        setForm({
            username: "",
            password: "",
            nombre: "",
            apellido: "",
            dni: "",
            telefono: "",
            correo: "",
            direccion: "",
            fechaNacimiento: "",
            sexo: "",
            tipoSangre: "",
            alergias: "",
            contactoEmergencia: "",
            telefonoEmergencia: "",
        });

        setEditandoId(null);
        setError("");
        setMensaje("");
    };

    const validarFormulario = () => {
        if (!editandoId) {
            if (form.username.trim().length < 4) {
                setError("El username debe tener mínimo 4 caracteres.");
                return false;
            }

            if (form.password.trim().length < 6) {
                setError("La contraseña debe tener mínimo 6 caracteres.");
                return false;
            }
        }

        if (!form.nombre.trim()) {
            setError("El nombre es obligatorio.");
            return false;
        }

        if (!form.apellido.trim()) {
            setError("El apellido es obligatorio.");
            return false;
        }

        if (!/^[0-9]{8}$/.test(form.dni)) {
            setError("El DNI debe tener exactamente 8 dígitos.");
            return false;
        }

        if (!/^\+51[0-9]{9}$/.test(form.telefono)) {
            setError("El teléfono debe iniciar con +51 y tener 9 dígitos.");
            return false;
        }

        if (form.telefonoEmergencia && !/^\+51[0-9]{9}$/.test(form.telefonoEmergencia)) {
            setError("El teléfono de emergencia debe iniciar con +51 y tener 9 dígitos.");
            return false;
        }

        return true;
    };

    const limpiarTelefono = (value) => {
        let soloNumeros = value.replace(/\D/g, "");

        if (soloNumeros.startsWith("51")) {
            soloNumeros = soloNumeros.slice(2);
        }

        soloNumeros = soloNumeros.slice(0, 9);

        return soloNumeros ? `+51${soloNumeros}` : "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        let nuevoValor = value;

        if (name === "dni") {
            nuevoValor = value.replace(/\D/g, "").slice(0, 8);
        }

        if (name === "telefono" || name === "telefonoEmergencia") {
            nuevoValor = limpiarTelefono(value);
        }

        if (name === "nombre" || name === "apellido" || name === "contactoEmergencia") {
            nuevoValor = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
        }

        setForm({
            ...form,
            [name]: nuevoValor,
        });

        setError("");
        setMensaje("");
    };

    const guardarPaciente = async (e) => {
        e.preventDefault();

        setMensaje("");
        setError("");

        if (!validarFormulario()) return;

        try {
            if (editandoId) {
                const bodyActualizar = {
                    nombre: form.nombre.trim(),
                    apellido: form.apellido.trim(),
                    dni: form.dni.trim(),
                    telefono: form.telefono.trim(),
                    correo: form.correo.trim(),
                    direccion: form.direccion.trim(),
                    fechaNacimiento: form.fechaNacimiento,
                    sexo: form.sexo,
                    tipoSangre: form.tipoSangre,
                    alergias: form.alergias,
                    contactoEmergencia: form.contactoEmergencia,
                    telefonoEmergencia: form.telefonoEmergencia,
                };

                await API.put(`/pacientes/${editandoId}`, bodyActualizar);
                setMensaje("Paciente actualizado correctamente.");
            } else {
                const bodyRegistro = {
                    username: form.username.trim(),
                    password: form.password.trim(),
                    nombre: form.nombre.trim(),
                    apellido: form.apellido.trim(),
                    dni: form.dni.trim(),
                    telefono: form.telefono.trim(),
                    correo: form.correo.trim(),
                    direccion: form.direccion.trim(),
                    fechaNacimiento: form.fechaNacimiento,
                    sexo: form.sexo,
                    tipoSangre: form.tipoSangre,
                    alergias: form.alergias,
                    contactoEmergencia: form.contactoEmergencia,
                    telefonoEmergencia: form.telefonoEmergencia,
                };

                await API.post("/auth/register-paciente", bodyRegistro);
                setMensaje("Paciente registrado correctamente.");
            }

            limpiarFormulario();
            obtenerPacientes();
        } catch (err) {
            console.error(err);

            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (typeof err.response?.data === "string") {
                setError(err.response.data);
            } else {
                setError("Error al guardar paciente.");
            }
        }
    };

    const editarPaciente = (paciente) => {
        setEditandoId(paciente.id);

        setForm({
            username: "",
            password: "",
            nombre: paciente.nombre || "",
            apellido: paciente.apellido || "",
            dni: paciente.dni || "",
            telefono: paciente.telefono || "",
            correo: paciente.correo || "",
            direccion: paciente.direccion || "",
            fechaNacimiento: paciente.fechaNacimiento || "",
            sexo: paciente.sexo || "",
            tipoSangre: paciente.tipoSangre || "",
            alergias: paciente.alergias || "",
            contactoEmergencia: paciente.contactoEmergencia || "",
            telefonoEmergencia: paciente.telefonoEmergencia || "",
        });

        setMensaje("");
        setError("");

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const desactivarPaciente = async (id) => {
        const confirmar = window.confirm("¿Deseas desactivar este paciente?");
        if (!confirmar) return;

        try {
            await API.delete(`/pacientes/${id}`);
            setMensaje("Paciente desactivado correctamente.");
            obtenerPacientes();
        } catch (err) {
            console.error(err);
            setError("Error al desactivar paciente.");
        }
    };

    const activarPaciente = async (id) => {
        try {
            await API.put(`/pacientes/${id}/activar`);
            setMensaje("Paciente activado correctamente.");
            obtenerPacientes();
        } catch (err) {
            console.error(err);
            setError("Error al activar paciente.");
        }
    };

    const totalActivos = pacientes.filter((p) => p.estado).length;
    const totalInactivos = pacientes.filter((p) => !p.estado).length;

    return (
        <div className="gp-page">
            <div className="gp-header">
                <div className="gp-header-top">
                    <div>
                        <span className="gp-tag">Administración de pacientes</span>

                        <h1 className="gp-title">Gestión de Pacientes</h1>

                        <p className="gp-subtitle">
                            Registra, actualiza, busca, activa o desactiva pacientes dentro
                            del sistema MediControl.
                        </p>
                    </div>

                    <button
                        className="gp-back-btn"
                        type="button"
                        onClick={() => navigate("/dashboard")}
                    >
                        ← Volver al Dashboard
                    </button>
                </div>
            </div>

            {mensaje && <div className="gp-alert success">{mensaje}</div>}
            {error && <div className="gp-alert error">{error}</div>}

            <div className="gp-stats">
                <div className="gp-stat-card">
                    <span>Total pacientes</span>
                    <h3>{pacientes.length}</h3>
                </div>

                <div className="gp-stat-card">
                    <span>Activos</span>
                    <h3>{totalActivos}</h3>
                </div>

                <div className="gp-stat-card">
                    <span>Inactivos</span>
                    <h3>{totalInactivos}</h3>
                </div>

                <div className="gp-stat-card">
                    <span>Mostrando</span>
                    <h3>{pacientesFiltrados.length}</h3>
                </div>
            </div>

            <div className="gp-card">
                <div className="gp-card-header">
                    <div>
                        <h2 className="gp-card-title">
                            {editandoId ? "Editar paciente" : "Nuevo paciente"}
                        </h2>
                        <p className="gp-card-subtitle">
                            {editandoId
                                ? "Actualiza la información del paciente seleccionado."
                                : "Registra un nuevo paciente con su usuario de acceso."}
                        </p>
                    </div>
                </div>

                <form onSubmit={guardarPaciente}>
                    <div className="gp-form-grid">
                        {!editandoId && (
                            <>
                                <div className="gp-field half">
                                    <label className="gp-label">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="gp-input"
                                        value={form.username}
                                        onChange={handleChange}
                                        required
                                        placeholder="paciente1"
                                    />
                                    <small className="gp-help">Mínimo 4 caracteres.</small>
                                </div>

                                <div className="gp-field half">
                                    <label className="gp-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="gp-input"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Mínimo 6 caracteres"
                                    />
                                    <small className="gp-help">Ejemplo: Paciente123</small>
                                </div>
                            </>
                        )}

                        <div className="gp-field half">
                            <label className="gp-label">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                className="gp-input"
                                value={form.nombre}
                                onChange={handleChange}
                                required
                                placeholder="Ejemplo: Juan"
                            />
                        </div>

                        <div className="gp-field half">
                            <label className="gp-label">Apellido</label>
                            <input
                                type="text"
                                name="apellido"
                                className="gp-input"
                                value={form.apellido}
                                onChange={handleChange}
                                required
                                placeholder="Ejemplo: Pérez"
                            />
                        </div>

                        <div className="gp-field">
                            <label className="gp-label">DNI</label>
                            <input
                                type="text"
                                name="dni"
                                className="gp-input"
                                value={form.dni}
                                onChange={handleChange}
                                maxLength="8"
                                required
                                placeholder="74581236"
                            />
                            <small className="gp-help">Exactamente 8 dígitos.</small>
                        </div>

                        <div className="gp-field">
                            <label className="gp-label">Teléfono</label>
                            <input
                                type="text"
                                name="telefono"
                                className="gp-input"
                                value={form.telefono}
                                onChange={handleChange}
                                maxLength="12"
                                required
                                placeholder="+51987654321"
                            />
                            <small className="gp-help">Formato: +51 + 9 dígitos.</small>
                        </div>

                        <div className="gp-field half">
                            <label className="gp-label">Correo</label>
                            <input
                                type="email"
                                name="correo"
                                className="gp-input"
                                value={form.correo}
                                onChange={handleChange}
                                required
                                placeholder="correo@ejemplo.com"
                            />
                        </div>

                        <div className="gp-field half">
                            <label className="gp-label">Dirección</label>
                            <input
                                type="text"
                                name="direccion"
                                className="gp-input"
                                value={form.direccion}
                                onChange={handleChange}
                                placeholder="Av. Lima 123"
                            />
                        </div>

                        <div className="gp-field">
                            <label className="gp-label">Fecha nacimiento</label>
                            <input
                                type="date"
                                name="fechaNacimiento"
                                className="gp-input"
                                value={form.fechaNacimiento}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="gp-field">
                            <label className="gp-label">Sexo</label>
                            <select
                                name="sexo"
                                className="gp-select"
                                value={form.sexo}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                        </div>

                        <div className="gp-field">
                            <label className="gp-label">Tipo sangre</label>
                            <select
                                name="tipoSangre"
                                className="gp-select"
                                value={form.tipoSangre}
                                onChange={handleChange}
                            >
                                <option value="">Seleccione</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>

                        <div className="gp-field three">
                            <label className="gp-label">Alergias</label>
                            <input
                                type="text"
                                name="alergias"
                                className="gp-input"
                                value={form.alergias}
                                onChange={handleChange}
                                placeholder="Ejemplo: Penicilina, polvo, mariscos"
                            />
                        </div>

                        <div className="gp-field half">
                            <label className="gp-label">Contacto emergencia</label>
                            <input
                                type="text"
                                name="contactoEmergencia"
                                className="gp-input"
                                value={form.contactoEmergencia}
                                onChange={handleChange}
                                placeholder="Nombre del contacto"
                            />
                        </div>

                        <div className="gp-field half">
                            <label className="gp-label">Teléfono emergencia</label>
                            <input
                                type="text"
                                name="telefonoEmergencia"
                                className="gp-input"
                                value={form.telefonoEmergencia}
                                onChange={handleChange}
                                maxLength="12"
                                placeholder="+51987654321"
                            />
                        </div>
                    </div>

                    <div className="gp-actions">
                        <button className="gp-btn primary" type="submit">
                            {editandoId ? "Actualizar paciente" : "Registrar paciente"}
                        </button>

                        {editandoId && (
                            <button
                                type="button"
                                className="gp-btn secondary"
                                onClick={limpiarFormulario}
                            >
                                Cancelar edición
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="gp-card">
                <div className="gp-card-header">
                    <div>
                        <h2 className="gp-card-title">Lista de pacientes</h2>
                        <p className="gp-card-subtitle">
                            Busca pacientes por nombre, apellido, DNI, teléfono o correo.
                        </p>
                    </div>
                </div>

                <div className="gp-toolbar">
                    <input
                        type="text"
                        className="gp-input"
                        placeholder="Buscar por nombre, apellido, DNI, teléfono o correo..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />

                    <label className="gp-switch">
                        <input
                            type="checkbox"
                            checked={mostrarInactivos}
                            onChange={() => setMostrarInactivos(!mostrarInactivos)}
                        />
                        Visualizar inactivos
                    </label>
                </div>

                <div className="gp-table-card">
                    {pacientesFiltrados.length === 0 ? (
                        <div className="gp-empty">
                            <h3>No hay pacientes para mostrar</h3>
                            <p>No se encontraron registros con los filtros aplicados.</p>
                        </div>
                    ) : (
                        <div className="gp-table-wrap">
                            <table className="gp-table">
                                <thead>
                                    <tr>
                                        <th>Paciente</th>
                                        <th>DNI</th>
                                        <th>Teléfono</th>
                                        <th>Correo</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {pacientesFiltrados.map((paciente) => (
                                        <tr
                                            key={paciente.id}
                                            className={!paciente.estado ? "gp-row-inactive" : ""}
                                        >
                                            <td>
                                                <div className="gp-person">
                                                    <strong>
                                                        {paciente.nombre} {paciente.apellido}
                                                    </strong>
                                                    <span>ID #{paciente.id}</span>
                                                </div>
                                            </td>

                                            <td>{paciente.dni}</td>
                                            <td>{paciente.telefono}</td>
                                            <td>{paciente.correo}</td>

                                            <td>
                                                <span
                                                    className={`gp-status ${paciente.estado ? "active" : "inactive"
                                                        }`}
                                                >
                                                    {paciente.estado ? "Activo" : "Inactivo"}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="gp-table-actions">
                                                    <button
                                                        className="gp-btn warning"
                                                        type="button"
                                                        onClick={() => editarPaciente(paciente)}
                                                    >
                                                        Editar
                                                    </button>

                                                    {paciente.estado ? (
                                                        <button
                                                            className="gp-btn danger"
                                                            type="button"
                                                            onClick={() => desactivarPaciente(paciente.id)}
                                                        >
                                                            Desactivar
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="gp-btn success"
                                                            type="button"
                                                            onClick={() => activarPaciente(paciente.id)}
                                                        >
                                                            Activar
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GestionPacientes;