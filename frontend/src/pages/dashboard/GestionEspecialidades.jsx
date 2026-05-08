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

.ge-page * { box-sizing:border-box; }

.ge-page {
  min-height:100vh;
  background:var(--mc-cream);
  font-family:'DM Sans', sans-serif;
  color:var(--mc-text);
  padding:42px;
}

.ge-header {
  background:linear-gradient(135deg,var(--mc-navy),var(--mc-navy-2),#1a3870);
  color:white;
  border-radius:26px;
  padding:38px 42px;
  box-shadow:var(--mc-shadow);
  margin-bottom:28px;
  position:relative;
  overflow:hidden;
}

.ge-header::after {
  content:"";
  position:absolute;
  right:-80px;
  top:-90px;
  width:330px;
  height:330px;
  background:radial-gradient(circle,rgba(26,191,161,.28),transparent 70%);
}

.ge-header-top {
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:20px;
  position:relative;
  z-index:2;
}

.ge-tag {
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

.ge-title {
  font-family:'Playfair Display', serif;
  font-size:40px;
  margin:0 0 8px;
}

.ge-subtitle {
  font-size:16px;
  color:rgba(255,255,255,.68);
  margin:0;
}

.ge-back-btn {
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

.ge-back-btn:hover {
  background:rgba(26,191,161,.18);
  border-color:rgba(26,191,161,.38);
  color:var(--mc-teal);
}

.ge-alert {
  border-radius:15px;
  padding:15px 18px;
  font-size:15px;
  font-weight:700;
  margin-bottom:20px;
}

.ge-alert.success {
  background:rgba(26,191,161,.10);
  color:var(--mc-teal);
  border:1px solid rgba(26,191,161,.25);
}

.ge-alert.error {
  background:rgba(229,90,90,.09);
  color:var(--mc-danger);
  border:1px solid rgba(229,90,90,.22);
}

.ge-stats {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:18px;
  margin-bottom:26px;
}

.ge-stat-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:22px;
  padding:22px;
  box-shadow:var(--mc-shadow);
}

.ge-stat-card span {
  color:var(--mc-muted);
  font-size:13px;
  font-weight:800;
}

.ge-stat-card h3 {
  font-family:'Playfair Display', serif;
  font-size:34px;
  color:var(--mc-navy);
  margin:8px 0 0;
}

.ge-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:24px;
  box-shadow:var(--mc-shadow);
  padding:28px;
  margin-bottom:28px;
}

.ge-card-header {
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:18px;
  margin-bottom:24px;
}

.ge-card-title {
  font-family:'Playfair Display', serif;
  font-size:30px;
  color:var(--mc-navy);
  margin:0 0 4px;
}

.ge-card-subtitle {
  color:var(--mc-muted);
  font-size:15px;
  margin:0;
}

.ge-form-grid {
  display:grid;
  grid-template-columns:1fr;
  gap:18px;
}

.ge-label {
  display:block;
  color:var(--mc-navy);
  font-size:12px;
  font-weight:900;
  text-transform:uppercase;
  letter-spacing:.07em;
  margin-bottom:8px;
}

.ge-input,
.ge-textarea {
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

.ge-textarea {
  min-height:120px;
  resize:vertical;
}

.ge-input:focus,
.ge-textarea:focus {
  background:white;
  border-color:var(--mc-teal);
  box-shadow:0 0 0 4px rgba(26,191,161,.10);
}

.ge-help {
  display:block;
  margin-top:6px;
  color:var(--mc-muted);
  font-size:12px;
}

.ge-actions {
  display:flex;
  gap:12px;
  margin-top:22px;
  flex-wrap:wrap;
}

.ge-btn {
  border:none;
  border-radius:14px;
  padding:13px 18px;
  font-size:14px;
  font-weight:900;
  cursor:pointer;
  transition:.2s;
  font-family:'DM Sans', sans-serif;
}

.ge-btn.primary {
  background:var(--mc-navy);
  color:white;
}

.ge-btn.primary:hover { background:var(--mc-teal); }

.ge-btn.secondary {
  background:white;
  color:var(--mc-navy);
  border:1.5px solid var(--mc-border);
}

.ge-btn.secondary:hover {
  color:var(--mc-teal);
  border-color:rgba(26,191,161,.35);
}

.ge-btn.warning {
  background:rgba(244,169,40,.13);
  color:#a67200;
  border:1px solid rgba(244,169,40,.25);
}

.ge-btn.danger {
  background:rgba(229,90,90,.10);
  color:var(--mc-danger);
  border:1px solid rgba(229,90,90,.25);
}

.ge-btn.success {
  background:rgba(26,191,161,.12);
  color:var(--mc-teal);
  border:1px solid rgba(26,191,161,.25);
}

.ge-btn:hover { transform:translateY(-1px); }

.ge-toolbar {
  display:grid;
  grid-template-columns:1fr auto;
  gap:16px;
  margin-bottom:20px;
  align-items:center;
}

.ge-switch {
  display:flex;
  align-items:center;
  gap:10px;
  color:var(--mc-muted);
  font-size:14px;
  font-weight:800;
  white-space:nowrap;
}

.ge-switch input {
  width:18px;
  height:18px;
  accent-color:var(--mc-teal);
}

.ge-table-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:24px;
  box-shadow:var(--mc-shadow);
  overflow:hidden;
}

.ge-table-wrap { overflow-x:auto; }

.ge-table {
  width:100%;
  border-collapse:collapse;
}

.ge-table thead tr { background:var(--mc-navy); }

.ge-table th {
  padding:18px 20px;
  color:rgba(255,255,255,.72);
  font-size:13px;
  text-transform:uppercase;
  letter-spacing:.08em;
  text-align:left;
  white-space:nowrap;
}

.ge-table td {
  padding:20px;
  border-bottom:1px solid var(--mc-border);
  font-size:15px;
  vertical-align:middle;
}

.ge-table tbody tr:hover { background:rgba(26,191,161,.035); }
.ge-table tbody tr:last-child td { border-bottom:none; }
.ge-row-inactive { background:rgba(11,30,61,.025); }

.ge-main-text {
  display:flex;
  flex-direction:column;
  gap:3px;
}

.ge-main-text strong {
  color:var(--mc-navy);
  font-size:16px;
}

.ge-main-text span {
  color:var(--mc-muted);
  font-size:13px;
}

.ge-description {
  max-width:480px;
  color:var(--mc-muted);
  line-height:1.5;
}

.ge-status {
  display:inline-flex;
  align-items:center;
  gap:7px;
  border-radius:999px;
  padding:7px 13px;
  font-size:13px;
  font-weight:900;
}

.ge-status::before {
  content:"";
  width:8px;
  height:8px;
  border-radius:50%;
}

.ge-status.active {
  background:rgba(26,191,161,.13);
  color:var(--mc-teal);
}

.ge-status.active::before { background:var(--mc-teal); }

.ge-status.inactive {
  background:rgba(11,30,61,.08);
  color:var(--mc-muted);
}

.ge-status.inactive::before { background:var(--mc-muted); }

.ge-table-actions {
  display:flex;
  gap:10px;
  flex-wrap:wrap;
}

.ge-empty {
  padding:48px 24px;
  text-align:center;
  color:var(--mc-muted);
}

.ge-empty h3 {
  font-family:'Playfair Display', serif;
  color:var(--mc-navy);
  font-size:28px;
  margin-bottom:6px;
}

@media(max-width:1000px) {
  .ge-stats { grid-template-columns:repeat(2,1fr); }
  .ge-toolbar { grid-template-columns:1fr; }
}

@media(max-width:760px) {
  .ge-page { padding:24px; }
  .ge-header { padding:30px 26px; }
  .ge-header-top { flex-direction:column; }
  .ge-back-btn { width:100%; }
  .ge-title { font-size:32px; }
  .ge-stats { grid-template-columns:1fr; }
}
`;

function GestionEspecialidades() {
  const navigate = useNavigate();

  const rol = localStorage.getItem("rol");
  const esAdmin = rol === "ADMIN";

  const [especialidades, setEspecialidades] = useState([]);
  const [mostrarInactivos, setMostrarInactivos] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    estado: true,
  });

  const [editandoId, setEditandoId] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const tag = document.createElement("style");
    tag.id = "gestion-especialidades-pro-styles";
    tag.textContent = styles;

    if (!document.getElementById("gestion-especialidades-pro-styles")) {
      document.head.appendChild(tag);
    }

    obtenerEspecialidades();

    return () => tag.remove();
  }, []);

  const obtenerEspecialidades = async () => {
    try {
      setError("");
      const response = await API.get("/especialidades/todas");
      setEspecialidades(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err);
      setError("Error al cargar especialidades.");
    }
  };

  const especialidadesFiltradas = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();

    return especialidades
      .filter((e) => (mostrarInactivos ? true : e.estado))
      .filter((e) => {
        const data = `${e.nombre || ""} ${e.descripcion || ""}`.toLowerCase();
        return data.includes(texto);
      });
  }, [especialidades, mostrarInactivos, busqueda]);

  const limpiarFormulario = () => {
    setForm({
      nombre: "",
      descripcion: "",
      estado: true,
    });

    setEditandoId(null);
    setMensaje("");
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setMensaje("");
    setError("");
  };

  const guardarEspecialidad = async (e) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    if (!esAdmin) {
      setError("No tienes permisos para registrar o editar especialidades.");
      return;
    }

    if (!form.nombre.trim()) {
      setError("El nombre de la especialidad es obligatorio.");
      return;
    }

    if (!form.descripcion.trim()) {
      setError("La descripción de la especialidad es obligatoria.");
      return;
    }

    try {
      const body = {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        estado: form.estado,
      };

      if (editandoId) {
        await API.put(`/especialidades/${editandoId}`, body);
        setMensaje("Especialidad actualizada correctamente.");
      } else {
        await API.post("/especialidades", body);
        setMensaje("Especialidad registrada correctamente.");
      }

      limpiarFormulario();
      obtenerEspecialidades();
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (typeof err.response?.data === "string") {
        setError(err.response.data);
      } else {
        setError("Error al guardar especialidad.");
      }
    }
  };

  const editarEspecialidad = (especialidad) => {
    if (!esAdmin) return;

    setEditandoId(especialidad.id);

    setForm({
      nombre: especialidad.nombre || "",
      descripcion: especialidad.descripcion || "",
      estado: especialidad.estado ?? true,
    });

    setMensaje("");
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const desactivarEspecialidad = async (id) => {
    if (!esAdmin) return;

    const confirmar = window.confirm("¿Deseas desactivar esta especialidad?");
    if (!confirmar) return;

    try {
      await API.delete(`/especialidades/${id}`);
      setMensaje("Especialidad desactivada correctamente.");
      obtenerEspecialidades();
    } catch (err) {
      console.error(err);
      setError("Error al desactivar especialidad.");
    }
  };

  const activarEspecialidad = async (id) => {
    if (!esAdmin) return;

    try {
      await API.put(`/especialidades/${id}/activar`);
      setMensaje("Especialidad activada correctamente.");
      obtenerEspecialidades();
    } catch (err) {
      console.error(err);
      setError("Error al activar especialidad.");
    }
  };

  const totalActivas = especialidades.filter((e) => e.estado).length;
  const totalInactivas = especialidades.filter((e) => !e.estado).length;

  return (
    <div className="ge-page">
      <div className="ge-header">
        <div className="ge-header-top">
          <div>
            <span className="ge-tag">Administración clínica</span>

            <h1 className="ge-title">Gestión de Especialidades</h1>

            <p className="ge-subtitle">
              {esAdmin
                ? "Registra, actualiza, activa o desactiva las especialidades médicas disponibles en MediControl."
                : "Consulta las especialidades médicas disponibles en MediControl."}
            </p>
          </div>

          <button
            className="ge-back-btn"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            ← Volver al Dashboard
          </button>
        </div>
      </div>

      {mensaje && <div className="ge-alert success">{mensaje}</div>}
      {error && <div className="ge-alert error">{error}</div>}

      <div className="ge-stats">
        <div className="ge-stat-card">
          <span>Total especialidades</span>
          <h3>{especialidades.length}</h3>
        </div>

        <div className="ge-stat-card">
          <span>Activas</span>
          <h3>{totalActivas}</h3>
        </div>

        <div className="ge-stat-card">
          <span>Inactivas</span>
          <h3>{totalInactivas}</h3>
        </div>

        <div className="ge-stat-card">
          <span>Mostrando</span>
          <h3>{especialidadesFiltradas.length}</h3>
        </div>
      </div>

      {esAdmin && (
        <div className="ge-card">
          <div className="ge-card-header">
            <div>
              <h2 className="ge-card-title">
                {editandoId ? "Editar especialidad" : "Nueva especialidad"}
              </h2>
              <p className="ge-card-subtitle">
                {editandoId
                  ? "Actualiza los datos de la especialidad seleccionada."
                  : "Crea una nueva especialidad médica para la clínica."}
              </p>
            </div>
          </div>

          <form onSubmit={guardarEspecialidad}>
            <div className="ge-form-grid">
              <div>
                <label className="ge-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="ge-input"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ejemplo: Cardiología"
                />
                <small className="ge-help">
                  Ingresa el nombre oficial de la especialidad.
                </small>
              </div>

              <div>
                <label className="ge-label">Descripción</label>
                <textarea
                  name="descripcion"
                  className="ge-textarea"
                  value={form.descripcion}
                  onChange={handleChange}
                  required
                  placeholder="Describe brevemente el enfoque de la especialidad."
                />
              </div>
            </div>

            <div className="ge-actions">
              <button className="ge-btn primary" type="submit">
                {editandoId
                  ? "Actualizar especialidad"
                  : "Registrar especialidad"}
              </button>

              {editandoId && (
                <button
                  type="button"
                  className="ge-btn secondary"
                  onClick={limpiarFormulario}
                >
                  Cancelar edición
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      <div className="ge-card">
        <div className="ge-card-header">
          <div>
            <h2 className="ge-card-title">Lista de especialidades</h2>
            <p className="ge-card-subtitle">
              Busca por nombre o descripción.
              {esAdmin && " También puedes controlar el estado de cada registro."}
            </p>
          </div>
        </div>

        <div className="ge-toolbar">
          <input
            type="text"
            className="ge-input"
            placeholder="Buscar por nombre o descripción..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <label className="ge-switch">
            <input
              type="checkbox"
              checked={mostrarInactivos}
              onChange={() => setMostrarInactivos(!mostrarInactivos)}
            />
            Visualizar inactivas
          </label>
        </div>

        <div className="ge-table-card">
          {especialidadesFiltradas.length === 0 ? (
            <div className="ge-empty">
              <h3>No hay especialidades para mostrar</h3>
              <p>No se encontraron registros con los filtros aplicados.</p>
            </div>
          ) : (
            <div className="ge-table-wrap">
              <table className="ge-table">
                <thead>
                  <tr>
                    <th>Especialidad</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    {esAdmin && <th>Acciones</th>}
                  </tr>
                </thead>

                <tbody>
                  {especialidadesFiltradas.map((especialidad) => (
                    <tr
                      key={especialidad.id}
                      className={!especialidad.estado ? "ge-row-inactive" : ""}
                    >
                      <td>
                        <div className="ge-main-text">
                          <strong>{especialidad.nombre}</strong>
                          <span>ID #{especialidad.id}</span>
                        </div>
                      </td>

                      <td>
                        <div className="ge-description">
                          {especialidad.descripcion || "Sin descripción"}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`ge-status ${especialidad.estado ? "active" : "inactive"
                            }`}
                        >
                          {especialidad.estado ? "Activa" : "Inactiva"}
                        </span>
                      </td>

                      {esAdmin && (
                        <td>
                          <div className="ge-table-actions">
                            <button
                              className="ge-btn warning"
                              type="button"
                              onClick={() => editarEspecialidad(especialidad)}
                            >
                              Editar
                            </button>

                            {especialidad.estado ? (
                              <button
                                className="ge-btn danger"
                                type="button"
                                onClick={() =>
                                  desactivarEspecialidad(especialidad.id)
                                }
                              >
                                Desactivar
                              </button>
                            ) : (
                              <button
                                className="ge-btn success"
                                type="button"
                                onClick={() =>
                                  activarEspecialidad(especialidad.id)
                                }
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

export default GestionEspecialidades;