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
  --mc-info:#3A8DFF;
  --mc-shadow:0 10px 34px rgba(11,30,61,.11);
}

.mc-page * { box-sizing:border-box; }

.mc-page {
  min-height:100vh;
  background:var(--mc-cream);
  font-family:'DM Sans', sans-serif;
  color:var(--mc-text);
  padding:42px;
}

.mc-header {
  background:linear-gradient(135deg,var(--mc-navy),var(--mc-navy-2),#1a3870);
  color:white;
  border-radius:26px;
  padding:38px 42px;
  box-shadow:var(--mc-shadow);
  margin-bottom:28px;
  position:relative;
  overflow:hidden;
}

.mc-header::after {
  content:"";
  position:absolute;
  right:-80px;
  top:-90px;
  width:330px;
  height:330px;
  background:radial-gradient(circle,rgba(26,191,161,.28),transparent 70%);
}

.mc-header-top {
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:20px;
  position:relative;
  z-index:2;
}

.mc-tag {
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

.mc-title {
  font-family:'Playfair Display', serif;
  font-size:40px;
  margin:0 0 8px;
}

.mc-subtitle {
  font-size:16px;
  color:rgba(255,255,255,.68);
  margin:0;
}

.mc-back-btn {
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

.mc-back-btn:hover {
  background:rgba(26,191,161,.18);
  border-color:rgba(26,191,161,.38);
  color:var(--mc-teal);
}

.mc-alert {
  border-radius:15px;
  padding:15px 18px;
  font-size:15px;
  font-weight:700;
  margin-bottom:20px;
}

.mc-alert.success {
  background:rgba(26,191,161,.10);
  color:var(--mc-teal);
  border:1px solid rgba(26,191,161,.25);
}

.mc-alert.error {
  background:rgba(229,90,90,.09);
  color:var(--mc-danger);
  border:1px solid rgba(229,90,90,.22);
}

.mc-stats {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:18px;
  margin-bottom:26px;
}

.mc-stat-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:22px;
  padding:22px;
  box-shadow:var(--mc-shadow);
}

.mc-stat-card span {
  color:var(--mc-muted);
  font-size:13px;
  font-weight:800;
}

.mc-stat-card h3 {
  font-family:'Playfair Display', serif;
  font-size:34px;
  color:var(--mc-navy);
  margin:8px 0 0;
}

.mc-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:24px;
  box-shadow:var(--mc-shadow);
  padding:28px;
  margin-bottom:28px;
}

.mc-card-header {
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:18px;
  margin-bottom:22px;
}

.mc-card-title {
  font-family:'Playfair Display', serif;
  font-size:30px;
  color:var(--mc-navy);
  margin:0 0 4px;
}

.mc-card-subtitle {
  color:var(--mc-muted);
  font-size:15px;
  margin:0;
}

.mc-toolbar {
  display:grid;
  grid-template-columns:1fr 260px;
  gap:16px;
  margin-bottom:20px;
}

.mc-input,
.mc-select,
.mc-textarea {
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

.mc-textarea {
  min-height:120px;
  resize:vertical;
}

.mc-input:focus,
.mc-select:focus,
.mc-textarea:focus {
  background:white;
  border-color:var(--mc-teal);
  box-shadow:0 0 0 4px rgba(26,191,161,.10);
}

.mc-table-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:24px;
  box-shadow:var(--mc-shadow);
  overflow:hidden;
}

.mc-table-wrap { overflow-x:auto; }

.mc-table {
  width:100%;
  border-collapse:collapse;
}

.mc-table thead tr { background:var(--mc-navy); }

.mc-table th {
  padding:18px 20px;
  color:rgba(255,255,255,.72);
  font-size:13px;
  text-transform:uppercase;
  letter-spacing:.08em;
  text-align:left;
  white-space:nowrap;
}

.mc-table td {
  padding:20px;
  border-bottom:1px solid var(--mc-border);
  font-size:15px;
  vertical-align:middle;
}

.mc-table tbody tr:hover { background:rgba(26,191,161,.035); }
.mc-table tbody tr:last-child td { border-bottom:none; }

.mc-person {
  display:flex;
  flex-direction:column;
  gap:3px;
}

.mc-person strong {
  color:var(--mc-navy);
  font-size:15px;
}

.mc-person span {
  color:var(--mc-muted);
  font-size:13px;
}

.mc-date strong {
  display:block;
  color:var(--mc-navy);
  font-size:15px;
}

.mc-date span {
  color:var(--mc-muted);
  font-size:13px;
}

.mc-motivo {
  max-width:300px;
  color:var(--mc-muted);
  line-height:1.5;
}

.mc-status {
  display:inline-flex;
  align-items:center;
  gap:7px;
  border-radius:999px;
  padding:7px 13px;
  font-size:13px;
  font-weight:900;
  white-space:nowrap;
}

.mc-status::before {
  content:"";
  width:8px;
  height:8px;
  border-radius:50%;
}

.mc-status.confirmada {
  background:rgba(58,141,255,.12);
  color:#2367bd;
}

.mc-status.confirmada::before { background:var(--mc-info); }

.mc-status.en_curso {
  background:rgba(244,169,40,.13);
  color:#a67200;
}

.mc-status.en_curso::before { background:var(--mc-warning); }

.mc-status.atendida {
  background:rgba(26,191,161,.13);
  color:var(--mc-teal);
}

.mc-status.atendida::before { background:var(--mc-teal); }

.mc-status.default {
  background:rgba(11,30,61,.08);
  color:var(--mc-navy);
}

.mc-status.default::before { background:var(--mc-navy); }

.mc-actions {
  display:flex;
  gap:10px;
  flex-wrap:wrap;
}

.mc-btn {
  border:none;
  border-radius:14px;
  padding:12px 16px;
  font-size:14px;
  font-weight:900;
  cursor:pointer;
  transition:.2s;
  font-family:'DM Sans', sans-serif;
}

.mc-btn.primary {
  background:var(--mc-navy);
  color:white;
}

.mc-btn.primary:hover { background:var(--mc-teal); }

.mc-btn.info {
  background:rgba(58,141,255,.12);
  color:#2367bd;
  border:1px solid rgba(58,141,255,.25);
}

.mc-btn.success {
  background:rgba(26,191,161,.12);
  color:var(--mc-teal);
  border:1px solid rgba(26,191,161,.25);
}

.mc-btn.secondary {
  background:white;
  color:var(--mc-navy);
  border:1.5px solid var(--mc-border);
}

.mc-btn:hover { transform:translateY(-1px); }

.mc-muted {
  color:var(--mc-muted);
  font-size:13px;
  font-weight:700;
}

.mc-empty {
  padding:48px 24px;
  text-align:center;
  color:var(--mc-muted);
}

.mc-empty h3 {
  font-family:'Playfair Display', serif;
  color:var(--mc-navy);
  font-size:28px;
  margin-bottom:6px;
}

.mc-form-grid {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:18px;
}

.mc-field.full { grid-column:1 / -1; }

.mc-label {
  display:block;
  color:var(--mc-navy);
  font-size:12px;
  font-weight:900;
  text-transform:uppercase;
  letter-spacing:.07em;
  margin-bottom:8px;
}

@media(max-width:1000px) {
  .mc-stats { grid-template-columns:repeat(2,1fr); }
  .mc-toolbar { grid-template-columns:1fr; }
  .mc-form-grid { grid-template-columns:1fr; }
}

@media(max-width:760px) {
  .mc-page { padding:24px; }
  .mc-header { padding:30px 26px; }
  .mc-header-top { flex-direction:column; }
  .mc-back-btn { width:100%; }
  .mc-title { font-size:32px; }
  .mc-stats { grid-template-columns:1fr; }
}
`;

function MisCitasMedico() {
  const navigate = useNavigate();

  const [citas, setCitas] = useState([]);
  const [diagnostico, setDiagnostico] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");

  useEffect(() => {
    const tag = document.createElement("style");
    tag.id = "mis-citas-medico-pro-styles";
    tag.textContent = styles;

    if (!document.getElementById("mis-citas-medico-pro-styles")) {
      document.head.appendChild(tag);
    }

    obtenerCitas();

    return () => tag.remove();
  }, []);

  const obtenerCitas = async () => {
    try {
      setError("");
      const response = await API.get("/citas/mis-citas-medico");
      setCitas(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err);
      setError("Error al cargar citas del médico.");
    }
  };

  const marcarEnCurso = async (id) => {
    try {
      setMensaje("");
      setError("");

      await API.put(`/citas/${id}/en-curso`);

      setMensaje("Cita marcada como EN CURSO.");
      obtenerCitas();
    } catch (err) {
      console.error(err);
      setError("No se pudo marcar la cita como en curso.");
    }
  };

  const abrirAtencion = (cita) => {
    setCitaSeleccionada(cita);
    setDiagnostico("");
    setObservaciones("");
    setMensaje("");
    setError("");

    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const marcarAtendida = async (e) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    if (!diagnostico.trim()) {
      setError("El diagnóstico es obligatorio para finalizar la atención.");
      return;
    }

    try {
      await API.put(`/citas/${citaSeleccionada.id}/atendida`, {
        diagnostico: diagnostico.trim(),
        observaciones: observaciones.trim(),
      });

      setMensaje("Cita marcada como ATENDIDA.");
      setCitaSeleccionada(null);
      setDiagnostico("");
      setObservaciones("");
      obtenerCitas();
    } catch (err) {
      console.error(err);
      setError("No se pudo marcar la cita como atendida.");
    }
  };

  const formatearFecha = (fecha = "") => {
    if (!fecha) return { dia: "—", hora: "" };

    const [dia, horaCompleta = ""] = fecha.split("T");

    return {
      dia,
      hora: horaCompleta.slice(0, 5),
    };
  };

  const claseEstado = (estado = "") => {
    const key = estado.toLowerCase();

    if (key === "confirmada") return "confirmada";
    if (key === "en_curso") return "en_curso";
    if (key === "atendida") return "atendida";

    return "default";
  };

  const citasMedico = useMemo(() => {
    return citas.filter(
      (cita) =>
        cita.estado === "CONFIRMADA" ||
        cita.estado === "EN_CURSO" ||
        cita.estado === "ATENDIDA"
    );
  }, [citas]);

  const citasFiltradas = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();

    return citasMedico.filter((cita) => {
      const paciente = `${cita.paciente?.nombre || ""} ${cita.paciente?.apellido || ""
        }`.toLowerCase();

      const motivo = (cita.motivo || "").toLowerCase();

      const coincideBusqueda =
        paciente.includes(texto) ||
        motivo.includes(texto) ||
        String(cita.id).includes(texto);

      const coincideEstado =
        filtroEstado === "TODOS" || cita.estado === filtroEstado;

      return coincideBusqueda && coincideEstado;
    });
  }, [citasMedico, busqueda, filtroEstado]);

  const contarPorEstado = (estado) =>
    citasMedico.filter((cita) => cita.estado === estado).length;

  return (
    <div className="mc-page">
      <div className="mc-header">
        <div className="mc-header-top">
          <div>
            <span className="mc-tag">Panel médico</span>

            <h1 className="mc-title">Mis Citas Médicas</h1>

            <p className="mc-subtitle">
              Revisa tus citas asignadas, inicia la atención y registra el
              diagnóstico correspondiente.
            </p>
          </div>

          <button
            className="mc-back-btn"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            ← Volver al Dashboard
          </button>
        </div>
      </div>

      {mensaje && <div className="mc-alert success">{mensaje}</div>}
      {error && <div className="mc-alert error">{error}</div>}

      <div className="mc-stats">
        <div className="mc-stat-card">
          <span>Total citas</span>
          <h3>{citasMedico.length}</h3>
        </div>

        <div className="mc-stat-card">
          <span>Confirmadas</span>
          <h3>{contarPorEstado("CONFIRMADA")}</h3>
        </div>

        <div className="mc-stat-card">
          <span>En curso</span>
          <h3>{contarPorEstado("EN_CURSO")}</h3>
        </div>

        <div className="mc-stat-card">
          <span>Atendidas</span>
          <h3>{contarPorEstado("ATENDIDA")}</h3>
        </div>
      </div>

      <div className="mc-card">
        <div className="mc-card-header">
          <div>
            <h2 className="mc-card-title">Citas asignadas</h2>
            <p className="mc-card-subtitle">
              Busca por paciente, motivo o ID, y filtra por estado.
            </p>
          </div>
        </div>

        <div className="mc-toolbar">
          <input
            className="mc-input"
            type="text"
            placeholder="Buscar por paciente, motivo o ID..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <select
            className="mc-select"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="TODOS">Todos los estados</option>
            <option value="CONFIRMADA">Confirmadas</option>
            <option value="EN_CURSO">En curso</option>
            <option value="ATENDIDA">Atendidas</option>
          </select>
        </div>

        <div className="mc-table-card">
          {citasFiltradas.length === 0 ? (
            <div className="mc-empty">
              <h3>No tienes citas para mostrar</h3>
              <p>No se encontraron citas con los filtros aplicados.</p>
            </div>
          ) : (
            <div className="mc-table-wrap">
              <table className="mc-table">
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>Fecha</th>
                    <th>Motivo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {citasFiltradas.map((cita) => {
                    const fecha = formatearFecha(cita.fecha);

                    return (
                      <tr key={cita.id}>
                        <td>
                          <div className="mc-person">
                            <strong>
                              {cita.paciente?.nombre || "Sin nombre"}{" "}
                              {cita.paciente?.apellido || ""}
                            </strong>
                            <span>ID cita #{cita.id}</span>
                          </div>
                        </td>

                        <td>
                          <div className="mc-date">
                            <strong>{fecha.dia}</strong>
                            <span>{fecha.hora || "Sin hora"}</span>
                          </div>
                        </td>

                        <td>
                          <div className="mc-motivo">
                            {cita.motivo || "Sin motivo registrado"}
                          </div>
                        </td>

                        <td>
                          <span
                            className={`mc-status ${claseEstado(cita.estado)}`}
                          >
                            {cita.estado || "SIN ESTADO"}
                          </span>
                        </td>

                        <td>
                          <div className="mc-actions">
                            {cita.estado === "CONFIRMADA" && (
                              <button
                                className="mc-btn info"
                                type="button"
                                onClick={() => marcarEnCurso(cita.id)}
                              >
                                Marcar en curso
                              </button>
                            )}

                            {cita.estado === "EN_CURSO" && (
                              <button
                                className="mc-btn success"
                                type="button"
                                onClick={() => abrirAtencion(cita)}
                              >
                                Registrar atención
                              </button>
                            )}

                            {cita.estado === "ATENDIDA" && (
                              <span className="mc-muted">Finalizada</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {citaSeleccionada && (
        <div className="mc-card">
          <div className="mc-card-header">
            <div>
              <h2 className="mc-card-title">Registrar diagnóstico</h2>
              <p className="mc-card-subtitle">
                Paciente: {citaSeleccionada.paciente?.nombre}{" "}
                {citaSeleccionada.paciente?.apellido}
              </p>
            </div>
          </div>

          <form onSubmit={marcarAtendida}>
            <div className="mc-form-grid">
              <div className="mc-field full">
                <label className="mc-label">Diagnóstico</label>
                <textarea
                  className="mc-textarea"
                  value={diagnostico}
                  onChange={(e) => setDiagnostico(e.target.value)}
                  required
                  placeholder="Ingrese el diagnóstico del paciente..."
                />
              </div>

              <div className="mc-field full">
                <label className="mc-label">Observaciones</label>
                <textarea
                  className="mc-textarea"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Ingrese observaciones adicionales..."
                />
              </div>
            </div>

            <div className="mc-actions" style={{ marginTop: "22px" }}>
              <button className="mc-btn primary" type="submit">
                Guardar atención
              </button>

              <button
                type="button"
                className="mc-btn secondary"
                onClick={() => setCitaSeleccionada(null)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default MisCitasMedico;