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

.gm-page * { box-sizing:border-box; }

.gm-page {
  min-height:100vh;
  background:var(--mc-cream);
  font-family:'DM Sans', sans-serif;
  color:var(--mc-text);
  padding:42px;
}

.gm-header {
  background:linear-gradient(135deg,var(--mc-navy),var(--mc-navy-2),#1a3870);
  color:white;
  border-radius:26px;
  padding:38px 42px;
  box-shadow:var(--mc-shadow);
  margin-bottom:28px;
  position:relative;
  overflow:hidden;
}

.gm-header::after {
  content:"";
  position:absolute;
  right:-80px;
  top:-90px;
  width:330px;
  height:330px;
  background:radial-gradient(circle,rgba(26,191,161,.28),transparent 70%);
}

.gm-header-top {
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:20px;
  position:relative;
  z-index:2;
}

.gm-tag {
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

.gm-title {
  font-family:'Playfair Display', serif;
  font-size:40px;
  margin:0 0 8px;
}

.gm-subtitle {
  font-size:16px;
  color:rgba(255,255,255,.68);
  margin:0;
}

.gm-back-btn {
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

.gm-back-btn:hover {
  background:rgba(26,191,161,.18);
  border-color:rgba(26,191,161,.38);
  color:var(--mc-teal);
}

.gm-alert {
  border-radius:15px;
  padding:15px 18px;
  font-size:15px;
  font-weight:700;
  margin-bottom:20px;
}

.gm-alert.success {
  background:rgba(26,191,161,.10);
  color:var(--mc-teal);
  border:1px solid rgba(26,191,161,.25);
}

.gm-alert.error {
  background:rgba(229,90,90,.09);
  color:var(--mc-danger);
  border:1px solid rgba(229,90,90,.22);
}

.gm-stats {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:18px;
  margin-bottom:26px;
}

.gm-stat-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:22px;
  padding:22px;
  box-shadow:var(--mc-shadow);
}

.gm-stat-card span {
  color:var(--mc-muted);
  font-size:13px;
  font-weight:800;
}

.gm-stat-card h3 {
  font-family:'Playfair Display', serif;
  font-size:34px;
  color:var(--mc-navy);
  margin:8px 0 0;
}

.gm-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:24px;
  box-shadow:var(--mc-shadow);
  padding:28px;
  margin-bottom:28px;
}

.gm-card-header {
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:18px;
  margin-bottom:24px;
}

.gm-card-title {
  font-family:'Playfair Display', serif;
  font-size:30px;
  color:var(--mc-navy);
  margin:0 0 4px;
}

.gm-card-subtitle {
  color:var(--mc-muted);
  font-size:15px;
  margin:0;
}

.gm-form-grid {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:18px;
}

.gm-field.full { grid-column:1 / -1; }
.gm-field.half { grid-column:span 2; }

.gm-label {
  display:block;
  color:var(--mc-navy);
  font-size:12px;
  font-weight:900;
  text-transform:uppercase;
  letter-spacing:.07em;
  margin-bottom:8px;
}

.gm-input,
.gm-select {
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

.gm-input:focus,
.gm-select:focus {
  background:white;
  border-color:var(--mc-teal);
  box-shadow:0 0 0 4px rgba(26,191,161,.10);
}

.gm-help {
  display:block;
  margin-top:6px;
  color:var(--mc-muted);
  font-size:12px;
}

.gm-actions {
  display:flex;
  gap:12px;
  margin-top:24px;
  flex-wrap:wrap;
}

.gm-btn {
  border:none;
  border-radius:14px;
  padding:13px 18px;
  font-size:14px;
  font-weight:900;
  cursor:pointer;
  transition:.2s;
  font-family:'DM Sans', sans-serif;
}

.gm-btn.primary {
  background:var(--mc-navy);
  color:white;
}

.gm-btn.primary:hover { background:var(--mc-teal); }

.gm-btn.secondary {
  background:white;
  color:var(--mc-navy);
  border:1.5px solid var(--mc-border);
}

.gm-btn.secondary:hover {
  color:var(--mc-teal);
  border-color:rgba(26,191,161,.35);
}

.gm-btn.warning {
  background:rgba(244,169,40,.13);
  color:#a67200;
  border:1px solid rgba(244,169,40,.25);
}

.gm-btn.danger {
  background:rgba(229,90,90,.10);
  color:var(--mc-danger);
  border:1px solid rgba(229,90,90,.25);
}

.gm-btn.success {
  background:rgba(26,191,161,.12);
  color:var(--mc-teal);
  border:1px solid rgba(26,191,161,.25);
}

.gm-btn:hover { transform:translateY(-1px); }

.gm-toolbar {
  display:grid;
  grid-template-columns:1fr auto;
  gap:16px;
  margin-bottom:20px;
  align-items:center;
}

.gm-switch {
  display:flex;
  align-items:center;
  gap:10px;
  color:var(--mc-muted);
  font-size:14px;
  font-weight:800;
  white-space:nowrap;
}

.gm-switch input {
  width:18px;
  height:18px;
  accent-color:var(--mc-teal);
}

.gm-table-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:24px;
  box-shadow:var(--mc-shadow);
  overflow:hidden;
}

.gm-table-wrap { overflow-x:auto; }

.gm-table {
  width:100%;
  border-collapse:collapse;
}

.gm-table thead tr { background:var(--mc-navy); }

.gm-table th {
  padding:18px 20px;
  color:rgba(255,255,255,.72);
  font-size:13px;
  text-transform:uppercase;
  letter-spacing:.08em;
  text-align:left;
  white-space:nowrap;
}

.gm-table td {
  padding:20px;
  border-bottom:1px solid var(--mc-border);
  font-size:15px;
  vertical-align:middle;
}

.gm-table tbody tr:hover { background:rgba(26,191,161,.035); }
.gm-table tbody tr:last-child td { border-bottom:none; }
.gm-row-inactive { background:rgba(11,30,61,.025); }

.gm-person {
  display:flex;
  flex-direction:column;
  gap:3px;
}

.gm-person strong {
  color:var(--mc-navy);
  font-size:15px;
}

.gm-person span {
  color:var(--mc-muted);
  font-size:13px;
}

.gm-status {
  display:inline-flex;
  align-items:center;
  gap:7px;
  border-radius:999px;
  padding:7px 13px;
  font-size:13px;
  font-weight:900;
}

.gm-status::before {
  content:"";
  width:8px;
  height:8px;
  border-radius:50%;
}

.gm-status.active {
  background:rgba(26,191,161,.13);
  color:var(--mc-teal);
}

.gm-status.active::before { background:var(--mc-teal); }

.gm-status.inactive {
  background:rgba(11,30,61,.08);
  color:var(--mc-muted);
}

.gm-status.inactive::before { background:var(--mc-muted); }

.gm-table-actions {
  display:flex;
  gap:10px;
  flex-wrap:wrap;
}

.gm-empty {
  padding:48px 24px;
  text-align:center;
  color:var(--mc-muted);
}

.gm-empty h3 {
  font-family:'Playfair Display', serif;
  color:var(--mc-navy);
  font-size:28px;
  margin-bottom:6px;
}

@media(max-width:1200px) {
  .gm-stats { grid-template-columns:repeat(2,1fr); }
  .gm-form-grid { grid-template-columns:repeat(2,1fr); }
}

@media(max-width:760px) {
  .gm-page { padding:24px; }
  .gm-header { padding:30px 26px; }
  .gm-header-top { flex-direction:column; }
  .gm-back-btn { width:100%; }
  .gm-title { font-size:32px; }
  .gm-stats,
  .gm-form-grid { grid-template-columns:1fr; }
  .gm-field.half { grid-column:1 / -1; }
  .gm-toolbar { grid-template-columns:1fr; }
}
`;

function GestionMedicos() {
  const navigate = useNavigate();
  const rol = localStorage.getItem("rol");
  const esAdmin = rol === "ADMIN";

  const [medicos, setMedicos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
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
    numeroColegiatura: "",
    especialidadId: "",
  });

  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const tag = document.createElement("style");
    tag.id = "gestion-medicos-pro-styles";
    tag.textContent = styles;

    if (!document.getElementById("gestion-medicos-pro-styles")) {
      document.head.appendChild(tag);
    }

    obtenerMedicos();
    obtenerEspecialidades();

    return () => tag.remove();
  }, []);

  const obtenerMedicos = async () => {
    try {
      setError("");
      const response = await API.get("/medicos/todos");
      setMedicos(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err);
      setError("Error al cargar médicos.");
    }
  };

  const obtenerEspecialidades = async () => {
    try {
      const response = await API.get("/especialidades");
      setEspecialidades(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err);
    }
  };

  const medicosFiltrados = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();

    return medicos
      .filter((m) => (mostrarInactivos ? true : m.estado))
      .filter((m) => {
        const data = `${m.nombre || ""} ${m.apellido || ""} ${m.dni || ""} ${m.telefono || ""
          } ${m.correo || ""} ${m.numeroColegiatura || ""} ${m.especialidad?.nombre || ""
          } ${m.usuario?.username || ""}`.toLowerCase();

        return data.includes(texto);
      });
  }, [medicos, mostrarInactivos, busqueda]);

  const limpiarFormulario = () => {
    setForm({
      username: "",
      password: "",
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",
      correo: "",
      numeroColegiatura: "",
      especialidadId: "",
    });

    setEditandoId(null);
    setMensaje("");
    setError("");
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
      setError("El DNI debe tener exactamente 8 dígitos. Ejemplo: 74581236");
      return false;
    }

    if (!/^\+51[0-9]{9}$/.test(form.telefono)) {
      setError("El teléfono debe iniciar con +51 y tener 9 dígitos. Ejemplo: +51987654321");
      return false;
    }

    if (!/^CMP[0-9]{5}$/.test(form.numeroColegiatura)) {
      setError("La colegiatura debe tener el formato CMP seguido de 5 números. Ejemplo: CMP54321");
      return false;
    }

    if (!form.especialidadId) {
      setError("Debe seleccionar una especialidad.");
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

  const limpiarColegiatura = (value) => {
    let valor = value.toUpperCase();

    if (!valor.startsWith("CMP")) {
      valor = valor.replace(/[^0-9]/g, "");
      valor = `CMP${valor}`;
    } else {
      valor = `CMP${valor.replace("CMP", "").replace(/[^0-9]/g, "")}`;
    }

    return valor.slice(0, 8);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let nuevoValor = value;

    if (name === "dni") {
      nuevoValor = value.replace(/\D/g, "").slice(0, 8);
    }

    if (name === "telefono") {
      nuevoValor = limpiarTelefono(value);
    }

    if (name === "numeroColegiatura") {
      nuevoValor = limpiarColegiatura(value);
    }

    if (name === "nombre" || name === "apellido") {
      nuevoValor = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    }

    setForm({
      ...form,
      [name]: nuevoValor,
    });

    setError("");
    setMensaje("");
  };

  const guardarMedico = async (e) => {
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
          numeroColegiatura: form.numeroColegiatura.trim(),
          especialidad: {
            id: parseInt(form.especialidadId),
          },
        };

        await API.put(`/medicos/${editandoId}`, bodyActualizar);
        setMensaje("Médico actualizado correctamente.");
      } else {
        const bodyRegistro = {
          username: form.username.trim(),
          password: form.password.trim(),
          nombre: form.nombre.trim(),
          apellido: form.apellido.trim(),
          dni: form.dni.trim(),
          telefono: form.telefono.trim(),
          correo: form.correo.trim(),
          numeroColegiatura: form.numeroColegiatura.trim(),
          especialidadId: parseInt(form.especialidadId),
        };

        await API.post("/medicos/registrar-con-usuario", bodyRegistro);
        setMensaje("Médico registrado correctamente.");
      }

      limpiarFormulario();
      obtenerMedicos();
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (typeof err.response?.data === "string") {
        setError(err.response.data);
      } else {
        setError("Error al guardar médico.");
      }
    }
  };

  const editarMedico = (medico) => {
    setEditandoId(medico.id);

    setForm({
      username: medico.usuario?.username || "",
      password: "",
      nombre: medico.nombre || "",
      apellido: medico.apellido || "",
      dni: medico.dni || "",
      telefono: medico.telefono || "",
      correo: medico.correo || "",
      numeroColegiatura: medico.numeroColegiatura || "",
      especialidadId: medico.especialidad?.id || "",
    });

    setMensaje("");
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const desactivarMedico = async (id) => {
    const confirmar = window.confirm("¿Deseas desactivar este médico?");
    if (!confirmar) return;

    try {
      await API.delete(`/medicos/${id}`);
      setMensaje("Médico desactivado correctamente.");
      obtenerMedicos();
    } catch (err) {
      console.error(err);
      setError("Error al desactivar médico.");
    }
  };

  const activarMedico = async (id) => {
    try {
      await API.put(`/medicos/${id}/activar`);
      setMensaje("Médico activado correctamente.");
      obtenerMedicos();
    } catch (err) {
      console.error(err);
      setError("Error al activar médico.");
    }
  };

  const totalActivos = medicos.filter((m) => m.estado).length;
  const totalInactivos = medicos.filter((m) => !m.estado).length;

  return (
    <div className="gm-page">
      <div className="gm-header">
        <div className="gm-header-top">
          <div>
            <span className="gm-tag">Administración médica</span>

            <h1 className="gm-title">Gestión de Médicos</h1>

            <p className="gm-subtitle">
              Registra médicos, administra su especialidad, colegiatura, estado
              y usuario de acceso.
            </p>
          </div>

          <button
            className="gm-back-btn"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            ← Volver al Dashboard
          </button>
        </div>
      </div>

      {mensaje && <div className="gm-alert success">{mensaje}</div>}
      {error && <div className="gm-alert error">{error}</div>}

      <div className="gm-stats">
        <div className="gm-stat-card">
          <span>Total médicos</span>
          <h3>{medicos.length}</h3>
        </div>

        <div className="gm-stat-card">
          <span>Activos</span>
          <h3>{totalActivos}</h3>
        </div>

        <div className="gm-stat-card">
          <span>Inactivos</span>
          <h3>{totalInactivos}</h3>
        </div>

        <div className="gm-stat-card">
          <span>Mostrando</span>
          <h3>{medicosFiltrados.length}</h3>
        </div>
      </div>

      {esAdmin && (

        <div className="gm-card">

          <div className="gm-card-header">

            <div>

              <h2 className="gm-card-title">
                {editandoId ? "Editar médico" : "Nuevo médico"}
              </h2>

              <p className="gm-card-subtitle">
                {editandoId
                  ? "Actualiza la información profesional del médico seleccionado."
                  : "Registra un nuevo médico y crea su usuario de acceso."}
              </p>

            </div>

          </div>

          <form onSubmit={guardarMedico}>

            <div className="gm-form-grid">

              {!editandoId && (
                <>

                  <div className="gm-field half">

                    <label className="gm-label">
                      Username
                    </label>

                    <input
                      type="text"
                      name="username"
                      className="gm-input"
                      value={form.username}
                      onChange={handleChange}
                      required
                      placeholder="medico4"
                    />

                    <small className="gm-help">
                      Mínimo 4 caracteres.
                    </small>

                  </div>

                  <div className="gm-field half">

                    <label className="gm-label">
                      Password
                    </label>

                    <input
                      type="password"
                      name="password"
                      className="gm-input"
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="Mínimo 6 caracteres"
                    />

                    <small className="gm-help">
                      Ejemplo: Medico123
                    </small>

                  </div>

                </>
              )}

              <div className="gm-field half">

                <label className="gm-label">
                  Nombre
                </label>

                <input
                  type="text"
                  name="nombre"
                  className="gm-input"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Andrea"
                />

              </div>

              <div className="gm-field half">

                <label className="gm-label">
                  Apellido
                </label>

                <input
                  type="text"
                  name="apellido"
                  className="gm-input"
                  value={form.apellido}
                  onChange={handleChange}
                  required
                  placeholder="Ramírez"
                />

              </div>

              <div className="gm-field">

                <label className="gm-label">
                  DNI
                </label>

                <input
                  type="text"
                  name="dni"
                  className="gm-input"
                  value={form.dni}
                  onChange={handleChange}
                  maxLength="8"
                  required
                  placeholder="74581236"
                />

                <small className="gm-help">
                  Exactamente 8 dígitos.
                </small>

              </div>

              <div className="gm-field">

                <label className="gm-label">
                  Teléfono
                </label>

                <input
                  type="text"
                  name="telefono"
                  className="gm-input"
                  value={form.telefono}
                  onChange={handleChange}
                  maxLength="12"
                  required
                  placeholder="+51987654321"
                />

                <small className="gm-help">
                  Formato: +51 + 9 dígitos.
                </small>

              </div>

              <div className="gm-field">

                <label className="gm-label">
                  Colegiatura
                </label>

                <input
                  type="text"
                  name="numeroColegiatura"
                  className="gm-input"
                  value={form.numeroColegiatura}
                  onChange={handleChange}
                  maxLength="8"
                  required
                  placeholder="CMP54321"
                />

                <small className="gm-help">
                  Formato: CMP + 5 números.
                </small>

              </div>

              <div className="gm-field">

                <label className="gm-label">
                  Correo
                </label>

                <input
                  type="email"
                  name="correo"
                  className="gm-input"
                  value={form.correo}
                  onChange={handleChange}
                  required
                  placeholder="andrea.ramirez@clinic.com"
                />

              </div>

              <div className="gm-field half">

                <label className="gm-label">
                  Especialidad
                </label>

                <select
                  name="especialidadId"
                  className="gm-select"
                  value={form.especialidadId}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Seleccione una especialidad
                  </option>

                  {especialidades.map((especialidad) => (
                    <option
                      key={especialidad.id}
                      value={especialidad.id}
                    >
                      {especialidad.nombre}
                    </option>
                  ))}

                </select>

                <small className="gm-help">
                  Seleccione una especialidad activa.
                </small>

              </div>

            </div>

            <div className="gm-actions">

              <button
                className="gm-btn primary"
                type="submit"
              >
                {editandoId
                  ? "Actualizar médico"
                  : "Registrar médico"}
              </button>

              {editandoId && (

                <button
                  type="button"
                  className="gm-btn secondary"
                  onClick={limpiarFormulario}
                >
                  Cancelar edición
                </button>

              )}

            </div>

          </form>

        </div>

      )}

      <div className="gm-card">
        <div className="gm-card-header">
          <div>
            <h2 className="gm-card-title">Lista de médicos</h2>
            <p className="gm-card-subtitle">
              Busca por nombre, DNI, correo, colegiatura, usuario o especialidad.
            </p>
          </div>
        </div>

        <div className="gm-toolbar">
          <input
            type="text"
            className="gm-input"
            placeholder="Buscar médico..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {esAdmin && (

            <label className="gm-switch">

              <input
                type="checkbox"
                checked={mostrarInactivos}
                onChange={() =>
                  setMostrarInactivos(!mostrarInactivos)
                }
              />

              Visualizar inactivos

            </label>

          )}
        </div>

        <div className="gm-table-card">
          {medicosFiltrados.length === 0 ? (
            <div className="gm-empty">
              <h3>No hay médicos para mostrar</h3>
              <p>No se encontraron registros con los filtros aplicados.</p>
            </div>
          ) : (
            <div className="gm-table-wrap">
              <table className="gm-table">
                <thead>
                  <tr>
                    <th>Médico</th>
                    <th>Usuario</th>
                    <th>Especialidad</th>
                    <th>Colegiatura</th>
                    <th>Estado</th>
                    {esAdmin && <th>Acciones</th>}
                  </tr>
                </thead>

                <tbody>
                  {medicosFiltrados.map((medico) => (
                    <tr
                      key={medico.id}
                      className={!medico.estado ? "gm-row-inactive" : ""}
                    >
                      <td>
                        <div className="gm-person">
                          <strong>
                            Dr. {medico.nombre} {medico.apellido}
                          </strong>
                          <span>DNI: {medico.dni || "No registrado"}</span>
                        </div>
                      </td>

                      <td>{medico.usuario?.username || "Sin usuario"}</td>

                      <td>
                        {medico.especialidad?.nombre || "Sin especialidad"}
                      </td>

                      <td>{medico.numeroColegiatura || "No registrado"}</td>

                      <td>
                        <span
                          className={`gm-status ${medico.estado ? "active" : "inactive"
                            }`}
                        >
                          {medico.estado ? "Activo" : "Inactivo"}
                        </span>
                      </td>

                      {esAdmin && (

                        <td>

                          <div className="gm-table-actions">

                            <button
                              className="gm-btn warning"
                              type="button"
                              onClick={() => editarMedico(medico)}
                            >
                              Editar
                            </button>

                            {medico.estado ? (

                              <button
                                className="gm-btn danger"
                                type="button"
                                onClick={() => desactivarMedico(medico.id)}
                              >
                                Desactivar
                              </button>

                            ) : (

                              <button
                                className="gm-btn success"
                                type="button"
                                onClick={() => activarMedico(medico.id)}
                              >
                                Activar
                              </button>

                            )}

                          </div>

                        </td>

                      )}
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

export default GestionMedicos;