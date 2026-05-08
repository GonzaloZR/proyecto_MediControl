import { useEffect, useState } from "react";
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

.pp-page * {
  box-sizing:border-box;
}

.pp-page {
  min-height:100vh;
  background:var(--mc-cream);
  font-family:'DM Sans', sans-serif;
  color:var(--mc-text);
  padding:42px;
}

.pp-header {
  background:linear-gradient(135deg,var(--mc-navy),var(--mc-navy-2),#1a3870);
  color:white;
  border-radius:26px;
  padding:38px 42px;
  box-shadow:var(--mc-shadow);
  margin-bottom:28px;
  position:relative;
  overflow:hidden;
}

.pp-header::after {
  content:"";
  position:absolute;
  right:-80px;
  top:-90px;
  width:330px;
  height:330px;
  background:radial-gradient(circle,rgba(26,191,161,.28),transparent 70%);
}

.pp-header-top {
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:20px;
  position:relative;
  z-index:2;
}

.pp-tag {
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

.pp-title {
  font-family:'Playfair Display', serif;
  font-size:40px;
  margin:0 0 8px;
}

.pp-subtitle {
  font-size:16px;
  color:rgba(255,255,255,.68);
  margin:0;
}

.pp-back-btn {
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

.pp-back-btn:hover {
  background:rgba(26,191,161,.18);
  border-color:rgba(26,191,161,.38);
  color:var(--mc-teal);
}

.pp-alert {
  border-radius:15px;
  padding:15px 18px;
  font-size:15px;
  font-weight:700;
  margin-bottom:20px;
}

.pp-alert.success {
  background:rgba(26,191,161,.10);
  color:var(--mc-teal);
  border:1px solid rgba(26,191,161,.25);
}

.pp-alert.error {
  background:rgba(229,90,90,.09);
  color:var(--mc-danger);
  border:1px solid rgba(229,90,90,.22);
}

.pp-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:24px;
  box-shadow:var(--mc-shadow);
  padding:28px;
}

.pp-profile-head {
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:20px;
  margin-bottom:28px;
}

.pp-user {
  display:flex;
  align-items:center;
  gap:16px;
}

.pp-avatar {
  width:68px;
  height:68px;
  border-radius:20px;
  background:linear-gradient(135deg,var(--mc-teal),#0e9a82);
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:24px;
  font-weight:900;
}

.pp-user h2 {
  font-family:'Playfair Display', serif;
  font-size:30px;
  color:var(--mc-navy);
  margin:0 0 5px;
}

.pp-badge {
  display:inline-flex;
  background:rgba(26,191,161,.13);
  color:var(--mc-teal);
  border:1px solid rgba(26,191,161,.25);
  border-radius:999px;
  padding:6px 12px;
  font-size:12px;
  font-weight:900;
}

.pp-section-title {
  font-family:'Playfair Display', serif;
  font-size:26px;
  color:var(--mc-navy);
  margin:30px 0 18px;
  padding-bottom:10px;
  border-bottom:1px solid var(--mc-border);
}

.pp-grid {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:18px;
}

.pp-field.half {
  grid-column:span 2;
}

.pp-field.full {
  grid-column:1 / -1;
}

.pp-label {
  display:block;
  color:var(--mc-navy);
  font-size:12px;
  font-weight:900;
  text-transform:uppercase;
  letter-spacing:.07em;
  margin-bottom:8px;
}

.pp-input,
.pp-select,
.pp-textarea {
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

.pp-textarea {
  min-height:105px;
  resize:vertical;
}

.pp-input:focus,
.pp-select:focus,
.pp-textarea:focus {
  background:white;
  border-color:var(--mc-teal);
  box-shadow:0 0 0 4px rgba(26,191,161,.10);
}

.pp-input:disabled,
.pp-select:disabled,
.pp-textarea:disabled {
  opacity:.75;
  cursor:not-allowed;
}

.pp-help {
  display:block;
  margin-top:6px;
  color:var(--mc-muted);
  font-size:12px;
}

.pp-actions {
  display:flex;
  gap:12px;
  margin-top:28px;
  flex-wrap:wrap;
}

.pp-btn {
  border:none;
  border-radius:14px;
  padding:13px 18px;
  font-size:14px;
  font-weight:900;
  cursor:pointer;
  transition:.2s;
  font-family:'DM Sans', sans-serif;
}

.pp-btn.primary {
  background:var(--mc-navy);
  color:white;
}

.pp-btn.primary:hover {
  background:var(--mc-teal);
}

.pp-btn.secondary {
  background:white;
  color:var(--mc-navy);
  border:1.5px solid var(--mc-border);
}

.pp-btn.secondary:hover {
  color:var(--mc-teal);
  border-color:rgba(26,191,161,.35);
}

.pp-btn.warning {
  background:rgba(244,169,40,.13);
  color:#a67200;
  border:1px solid rgba(244,169,40,.25);
}

.pp-btn.warning:hover {
  transform:translateY(-1px);
}

.pp-loading {
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background:var(--mc-cream);
  font-family:'DM Sans', sans-serif;
  color:var(--mc-muted);
  font-size:16px;
}

@media(max-width:1000px) {
  .pp-grid {
    grid-template-columns:repeat(2,1fr);
  }
}

@media(max-width:760px) {
  .pp-page {
    padding:24px;
  }

  .pp-header {
    padding:30px 26px;
  }

  .pp-header-top,
  .pp-profile-head {
    flex-direction:column;
    align-items:flex-start;
  }

  .pp-title {
    font-size:32px;
  }

  .pp-back-btn {
    width:100%;
  }

  .pp-grid {
    grid-template-columns:1fr;
  }

  .pp-field.half,
  .pp-field.full {
    grid-column:1 / -1;
  }
}
`;

function PerfilPaciente() {
    const navigate = useNavigate();

    const tiposSangre = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    const [paciente, setPaciente] = useState(null);
    const [editando, setEditando] = useState(false);

    const [form, setForm] = useState({
        telefono: "",
        correo: "",
        direccion: "",
        tipoSangre: "",
        alergias: "",
        contactoEmergencia: "",
        telefonoEmergencia: "",
    });

    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const tag = document.createElement("style");
        tag.id = "perfil-paciente-pro-styles";
        tag.textContent = styles;

        if (!document.getElementById("perfil-paciente-pro-styles")) {
            document.head.appendChild(tag);
        }

        obtenerPerfil();

        return () => tag.remove();
    }, []);

    const obtenerPerfil = async () => {
        try {
            setError("");

            const response = await API.get("/pacientes/mi-perfil");
            const data = response.data;

            setPaciente(data);

            setForm({
                telefono: data.telefono || "",
                correo: data.correo || "",
                direccion: data.direccion || "",
                tipoSangre: data.tipoSangre || "",
                alergias: data.alergias || "",
                contactoEmergencia: data.contactoEmergencia || "",
                telefonoEmergencia: data.telefonoEmergencia || "",
            });
        } catch (err) {
            console.error(err);
            setError("No se pudo cargar el perfil del paciente.");
        }
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

        if (name === "telefono" || name === "telefonoEmergencia") {
            nuevoValor = limpiarTelefono(value);
        }

        if (name === "contactoEmergencia") {
            nuevoValor = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
        }

        setForm({
            ...form,
            [name]: nuevoValor,
        });

        setMensaje("");
        setError("");
    };

    const validarFormulario = () => {
        if (!/^\+51[0-9]{9}$/.test(form.telefono)) {
            setError("El teléfono debe iniciar con +51 y tener 9 dígitos.");
            return false;
        }

        if (!form.correo.trim()) {
            setError("El correo es obligatorio.");
            return false;
        }

        if (form.tipoSangre && !tiposSangre.includes(form.tipoSangre)) {
            setError("Seleccione un tipo de sangre válido.");
            return false;
        }

        if (
            form.telefonoEmergencia &&
            !/^\+51[0-9]{9}$/.test(form.telefonoEmergencia)
        ) {
            setError("El teléfono de emergencia debe iniciar con +51 y tener 9 dígitos.");
            return false;
        }

        return true;
    };

    const guardarCambios = async (e) => {
        e.preventDefault();

        setMensaje("");
        setError("");

        if (!validarFormulario()) return;

        try {
            const body = {
                telefono: form.telefono.trim(),
                correo: form.correo.trim(),
                direccion: form.direccion.trim(),
                tipoSangre: form.tipoSangre,
                alergias: form.alergias.trim(),
                contactoEmergencia: form.contactoEmergencia.trim(),
                telefonoEmergencia: form.telefonoEmergencia.trim(),
            };

            await API.put("/pacientes/mi-perfil", body);

            setMensaje("Perfil actualizado correctamente.");
            setEditando(false);
            obtenerPerfil();
        } catch (err) {
            console.error(err);

            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (typeof err.response?.data === "string") {
                setError(err.response.data);
            } else {
                setError("No se pudo actualizar el perfil.");
            }
        }
    };

    const cancelarEdicion = () => {
        setEditando(false);
        setMensaje("");
        setError("");
        obtenerPerfil();
    };

    if (error && !paciente) {
        return (
            <div className="pp-page">
                <div className="pp-alert error">{error}</div>

                <button
                    className="pp-btn secondary"
                    type="button"
                    onClick={() => navigate("/paciente")}
                >
                    ← Volver al panel
                </button>
            </div>
        );
    }

    if (!paciente) {
        return <div className="pp-loading">Cargando perfil...</div>;
    }

    const iniciales = `${paciente.nombre?.charAt(0) || ""}${paciente.apellido?.charAt(0) || ""
        }`.toUpperCase();

    return (
        <div className="pp-page">
            <div className="pp-header">
                <div className="pp-header-top">
                    <div>
                        <span className="pp-tag">Portal del paciente</span>

                        <h1 className="pp-title">Mi Perfil</h1>

                        <p className="pp-subtitle">
                            Consulta tus datos personales y actualiza tu información de
                            contacto, datos médicos y emergencia.
                        </p>
                    </div>

                    <button
                        className="pp-back-btn"
                        type="button"
                        onClick={() => navigate("/paciente")}
                    >
                        ← Volver al panel
                    </button>
                </div>
            </div>

            {mensaje && <div className="pp-alert success">{mensaje}</div>}
            {error && <div className="pp-alert error">{error}</div>}

            <div className="pp-card">
                <div className="pp-profile-head">
                    <div className="pp-user">
                        <div className="pp-avatar">{iniciales || "P"}</div>

                        <div>
                            <h2>
                                {paciente.nombre} {paciente.apellido}
                            </h2>

                            <span className="pp-badge">Paciente</span>
                        </div>
                    </div>

                    {!editando && (
                        <button
                            className="pp-btn warning"
                            type="button"
                            onClick={() => setEditando(true)}
                        >
                            Editar perfil
                        </button>
                    )}
                </div>

                <form onSubmit={guardarCambios}>
                    <h3 className="pp-section-title">Datos personales</h3>

                    <div className="pp-grid">
                        <div className="pp-field half">
                            <label className="pp-label">Nombre</label>
                            <input
                                type="text"
                                className="pp-input"
                                value={paciente.nombre || ""}
                                disabled
                            />
                        </div>

                        <div className="pp-field half">
                            <label className="pp-label">Apellido</label>
                            <input
                                type="text"
                                className="pp-input"
                                value={paciente.apellido || ""}
                                disabled
                            />
                        </div>

                        <div>
                            <label className="pp-label">DNI</label>
                            <input
                                type="text"
                                className="pp-input"
                                value={paciente.dni || ""}
                                disabled
                            />
                        </div>

                        <div>
                            <label className="pp-label">Fecha nacimiento</label>
                            <input
                                type="text"
                                className="pp-input"
                                value={paciente.fechaNacimiento || "No registrado"}
                                disabled
                            />
                        </div>
                    </div>

                    <h3 className="pp-section-title">Contacto</h3>

                    <div className="pp-grid">
                        <div>
                            <label className="pp-label">Teléfono</label>
                            <input
                                type="text"
                                name="telefono"
                                className="pp-input"
                                value={form.telefono}
                                onChange={handleChange}
                                disabled={!editando}
                                maxLength="12"
                                placeholder="+51987654321"
                            />
                            <small className="pp-help">Formato: +51 + 9 dígitos.</small>
                        </div>

                        <div>
                            <label className="pp-label">Correo</label>
                            <input
                                type="email"
                                name="correo"
                                className="pp-input"
                                value={form.correo}
                                onChange={handleChange}
                                disabled={!editando}
                                placeholder="correo@ejemplo.com"
                            />
                        </div>

                        <div className="pp-field half">
                            <label className="pp-label">Dirección</label>
                            <input
                                type="text"
                                name="direccion"
                                className="pp-input"
                                value={form.direccion}
                                onChange={handleChange}
                                disabled={!editando}
                                placeholder="Av. Lima 123"
                            />
                        </div>
                    </div>

                    <h3 className="pp-section-title">Información médica</h3>

                    <div className="pp-grid">
                        <div>
                            <label className="pp-label">Tipo de sangre</label>
                            <select
                                name="tipoSangre"
                                className="pp-select"
                                value={form.tipoSangre}
                                onChange={handleChange}
                                disabled={!editando}
                            >
                                <option value="">Seleccione</option>
                                {tiposSangre.map((tipo) => (
                                    <option key={tipo} value={tipo}>
                                        {tipo}
                                    </option>
                                ))}
                            </select>
                            <small className="pp-help">
                                Tipos disponibles: A+, A-, B+, B-, AB+, AB-, O+, O-.
                            </small>
                        </div>

                        <div className="pp-field full">
                            <label className="pp-label">Alergias</label>
                            <textarea
                                name="alergias"
                                className="pp-textarea"
                                value={form.alergias}
                                onChange={handleChange}
                                disabled={!editando}
                                placeholder="Ejemplo: Penicilina, polvo, mariscos. Si no tiene, escriba: Ninguna"
                            />
                        </div>
                    </div>

                    <h3 className="pp-section-title">Contacto de emergencia</h3>

                    <div className="pp-grid">
                        <div className="pp-field half">
                            <label className="pp-label">Contacto emergencia</label>
                            <input
                                type="text"
                                name="contactoEmergencia"
                                className="pp-input"
                                value={form.contactoEmergencia}
                                onChange={handleChange}
                                disabled={!editando}
                                placeholder="Nombre del contacto"
                            />
                        </div>

                        <div className="pp-field half">
                            <label className="pp-label">Teléfono emergencia</label>
                            <input
                                type="text"
                                name="telefonoEmergencia"
                                className="pp-input"
                                value={form.telefonoEmergencia}
                                onChange={handleChange}
                                disabled={!editando}
                                maxLength="12"
                                placeholder="+51987654321"
                            />
                            <small className="pp-help">Opcional. Formato: +51 + 9 dígitos.</small>
                        </div>
                    </div>

                    {editando && (
                        <div className="pp-actions">
                            <button type="submit" className="pp-btn primary">
                                Guardar cambios
                            </button>

                            <button
                                type="button"
                                className="pp-btn secondary"
                                onClick={cancelarEdicion}
                            >
                                Cancelar
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default PerfilPaciente;