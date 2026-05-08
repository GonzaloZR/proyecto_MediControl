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

.gc-page * { box-sizing:border-box; }

.gc-page {
  min-height:100vh;
  background:var(--mc-cream);
  font-family:'DM Sans', sans-serif;
  color:var(--mc-text);
  padding:42px;
}

.gc-header {
  background:linear-gradient(135deg,var(--mc-navy),var(--mc-navy-2),#1a3870);
  color:white;
  border-radius:26px;
  padding:38px 42px;
  box-shadow:var(--mc-shadow);
  margin-bottom:28px;
  position:relative;
  overflow:hidden;
}

.gc-header::after {
  content:"";
  position:absolute;
  right:-80px;
  top:-90px;
  width:330px;
  height:330px;
  background:radial-gradient(circle,rgba(26,191,161,.28),transparent 70%);
}

.gc-header-top {
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  gap:20px;
  position:relative;
  z-index:2;
}

.gc-tag {
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

.gc-title {
  font-family:'Playfair Display', serif;
  font-size:40px;
  margin:0 0 8px;
}

.gc-subtitle {
  font-size:16px;
  color:rgba(255,255,255,.68);
  margin:0;
}

.gc-back-btn {
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

.gc-back-btn:hover {
  background:rgba(26,191,161,.18);
  border-color:rgba(26,191,161,.38);
  color:var(--mc-teal);
}

.gc-alert {
  border-radius:15px;
  padding:15px 18px;
  font-size:15px;
  font-weight:700;
  margin-bottom:20px;
}

.gc-alert.success {
  background:rgba(26,191,161,.10);
  color:var(--mc-teal);
  border:1px solid rgba(26,191,161,.25);
}

.gc-alert.error {
  background:rgba(229,90,90,.09);
  color:var(--mc-danger);
  border:1px solid rgba(229,90,90,.22);
}

.gc-stats {
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:18px;
  margin-bottom:26px;
}

.gc-stat-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:22px;
  padding:22px;
  box-shadow:var(--mc-shadow);
}

.gc-stat-card span {
  color:var(--mc-muted);
  font-size:13px;
  font-weight:800;
}

.gc-stat-card h3 {
  font-family:'Playfair Display', serif;
  font-size:34px;
  color:var(--mc-navy);
  margin:8px 0 0;
}

.gc-toolbar {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:22px;
  padding:22px;
  box-shadow:var(--mc-shadow);
  margin-bottom:24px;
  display:grid;
  grid-template-columns:1.3fr .7fr;
  gap:16px;
}

.gc-search,
.gc-select {
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

.gc-search:focus,
.gc-select:focus {
  background:white;
  border-color:var(--mc-teal);
  box-shadow:0 0 0 4px rgba(26,191,161,.10);
}

.gc-table-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:24px;
  box-shadow:var(--mc-shadow);
  overflow:hidden;
}

.gc-table-wrap { overflow-x:auto; }

.gc-table {
  width:100%;
  border-collapse:collapse;
}

.gc-table thead tr { background:var(--mc-navy); }

.gc-table th {
  padding:18px 20px;
  color:rgba(255,255,255,.72);
  font-size:13px;
  text-transform:uppercase;
  letter-spacing:.08em;
  text-align:left;
  white-space:nowrap;
}

.gc-table td {
  padding:20px;
  border-bottom:1px solid var(--mc-border);
  font-size:15px;
  vertical-align:middle;
}

.gc-table tbody tr:hover { background:rgba(26,191,161,.035); }
.gc-table tbody tr:last-child td { border-bottom:none; }

.gc-person {
  display:flex;
  flex-direction:column;
  gap:3px;
}

.gc-person strong {
  color:var(--mc-navy);
  font-size:15px;
}

.gc-person span {
  color:var(--mc-muted);
  font-size:13px;
}

.gc-date strong {
  display:block;
  color:var(--mc-navy);
  font-size:15px;
}

.gc-date span {
  color:var(--mc-muted);
  font-size:13px;
}

.gc-motivo {
  max-width:260px;
  color:var(--mc-muted);
  line-height:1.5;
}

.gc-status {
  display:inline-flex;
  align-items:center;
  gap:7px;
  border-radius:999px;
  padding:7px 13px;
  font-size:13px;
  font-weight:900;
  white-space:nowrap;
}

.gc-status::before {
  content:"";
  width:8px;
  height:8px;
  border-radius:50%;
}

.gc-status.solicitada {
  background:rgba(244,169,40,.13);
  color:#a67200;
}

.gc-status.solicitada::before { background:var(--mc-warning); }

.gc-status.confirmada {
  background:rgba(58,141,255,.12);
  color:#2367bd;
}

.gc-status.confirmada::before { background:var(--mc-info); }

.gc-status.en_curso,
.gc-status.atendida {
  background:rgba(26,191,161,.13);
  color:var(--mc-teal);
}

.gc-status.en_curso::before,
.gc-status.atendida::before { background:var(--mc-teal); }

.gc-status.rechazada {
  background:rgba(229,90,90,.11);
  color:var(--mc-danger);
}

.gc-status.rechazada::before { background:var(--mc-danger); }

.gc-status.default {
  background:rgba(11,30,61,.08);
  color:var(--mc-navy);
}

.gc-status.default::before { background:var(--mc-navy); }

.gc-actions {
  display:flex;
  gap:10px;
  flex-wrap:wrap;
}

.gc-btn {
  border:none;
  border-radius:12px;
  padding:10px 14px;
  font-size:13px;
  font-weight:900;
  cursor:pointer;
  transition:.2s;
  font-family:'DM Sans', sans-serif;
}

.gc-btn.confirm {
  background:rgba(26,191,161,.12);
  color:var(--mc-teal);
  border:1px solid rgba(26,191,161,.25);
}

.gc-btn.confirm:hover {
  background:var(--mc-teal);
  color:white;
}

.gc-btn.reject {
  background:rgba(229,90,90,.10);
  color:var(--mc-danger);
  border:1px solid rgba(229,90,90,.25);
}

.gc-btn.reject:hover {
  background:var(--mc-danger);
  color:white;
}

.gc-no-actions {
  color:var(--mc-muted);
  font-size:13px;
}

.gc-empty {
  padding:54px 24px;
  text-align:center;
  color:var(--mc-muted);
}

.gc-empty h3 {
  font-family:'Playfair Display', serif;
  color:var(--mc-navy);
  font-size:28px;
  margin-bottom:6px;
}

@media(max-width:1200px) {
  .gc-stats { grid-template-columns:repeat(2,1fr); }
  .gc-toolbar { grid-template-columns:1fr; }
}

@media(max-width:760px) {
  .gc-page { padding:24px; }
  .gc-header { padding:30px 26px; }
  .gc-header-top { flex-direction:column; }
  .gc-back-btn { width:100%; }
  .gc-title { font-size:32px; }
  .gc-stats { grid-template-columns:1fr; }
}
`;

function GestionCitas() {
  const navigate = useNavigate();

  const [citas, setCitas] = useState([]);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");

  useEffect(() => {
    const tag = document.createElement("style");
    tag.id = "gestion-citas-pro-styles";
    tag.textContent = styles;

    if (!document.getElementById("gestion-citas-pro-styles")) {
      document.head.appendChild(tag);
    }

    obtenerCitas();

    return () => tag.remove();
  }, []);

  const obtenerCitas = async () => {
    try {
      setError("");
      const response = await API.get("/citas");
      setCitas(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error(err);
      setError("Error al cargar citas.");
    }
  };

  const confirmarCita = async (id) => {
    try {
      setError("");
      setMensaje("");

      await API.put(`/citas/${id}/confirmar`);

      setMensaje("Cita confirmada correctamente.");
      obtenerCitas();
    } catch (err) {
      console.error(err);
      setError("No se pudo confirmar la cita.");
    }
  };

  const rechazarCita = async (id) => {
    try {
      setError("");
      setMensaje("");

      await API.put(`/citas/${id}/rechazar`);

      setMensaje("Cita rechazada correctamente.");
      obtenerCitas();
    } catch (err) {
      console.error(err);
      setError("No se pudo rechazar la cita.");
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

    if (key === "solicitada") return "solicitada";
    if (key === "confirmada") return "confirmada";
    if (key === "en_curso") return "en_curso";
    if (key === "atendida") return "atendida";
    if (key === "rechazada") return "rechazada";

    return "default";
  };

  const contarPorEstado = (estado) =>
    citas.filter((cita) => cita.estado === estado).length;

  const citasFiltradas = useMemo(() => {
    const texto = busqueda.toLowerCase().trim();

    return citas.filter((cita) => {
      const paciente = `${cita.paciente?.nombre || ""} ${cita.paciente?.apellido || ""
        }`.toLowerCase();

      const medico = `${cita.medico?.nombre || ""} ${cita.medico?.apellido || ""
        }`.toLowerCase();

      const motivo = (cita.motivo || "").toLowerCase();

      const coincideBusqueda =
        paciente.includes(texto) ||
        medico.includes(texto) ||
        motivo.includes(texto) ||
        String(cita.id).includes(texto);

      const coincideEstado =
        filtroEstado === "TODOS" || cita.estado === filtroEstado;

      return coincideBusqueda && coincideEstado;
    });
  }, [citas, busqueda, filtroEstado]);

  return (
    <div className="gc-page">
      <div className="gc-header">
        <div className="gc-header-top">
          <div>
            <span className="gc-tag">Administración de citas</span>

            <h1 className="gc-title">Gestión de Citas</h1>

            <p className="gc-subtitle">
              Revisa las solicitudes registradas, confirma o rechaza citas y
              filtra la información según el estado actual.
            </p>
          </div>

          <button
            className="gc-back-btn"
            type="button"
            onClick={() => navigate("/dashboard")}
          >
            ← Volver al Dashboard
          </button>
        </div>
      </div>

      {mensaje && <div className="gc-alert success">{mensaje}</div>}
      {error && <div className="gc-alert error">{error}</div>}

      <div className="gc-stats">
        <div className="gc-stat-card">
          <span>Total citas</span>
          <h3>{citas.length}</h3>
        </div>

        <div className="gc-stat-card">
          <span>Solicitadas</span>
          <h3>{contarPorEstado("SOLICITADA")}</h3>
        </div>

        <div className="gc-stat-card">
          <span>Confirmadas</span>
          <h3>{contarPorEstado("CONFIRMADA")}</h3>
        </div>

        <div className="gc-stat-card">
          <span>Atendidas</span>
          <h3>{contarPorEstado("ATENDIDA")}</h3>
        </div>

        <div className="gc-stat-card">
          <span>Rechazadas</span>
          <h3>{contarPorEstado("RECHAZADA")}</h3>
        </div>
      </div>

      <div className="gc-toolbar">
        <input
          className="gc-search"
          type="text"
          placeholder="Buscar por paciente, médico, motivo o ID..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <select
          className="gc-select"
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="TODOS">Todos los estados</option>
          <option value="SOLICITADA">Solicitadas</option>
          <option value="CONFIRMADA">Confirmadas</option>
          <option value="EN_CURSO">En curso</option>
          <option value="ATENDIDA">Atendidas</option>
          <option value="RECHAZADA">Rechazadas</option>
        </select>
      </div>

      <div className="gc-table-card">
        {citasFiltradas.length === 0 ? (
          <div className="gc-empty">
            <h3>No hay citas para mostrar</h3>
            <p>No se encontraron registros con los filtros aplicados.</p>
          </div>
        ) : (
          <div className="gc-table-wrap">
            <table className="gc-table">
              <thead>
                <tr>
                  <th>Paciente</th>
                  <th>Médico</th>
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
                        <div className="gc-person">
                          <strong>
                            {cita.paciente?.nombre || "Sin nombre"}{" "}
                            {cita.paciente?.apellido || ""}
                          </strong>
                          <span>Paciente</span>
                        </div>
                      </td>

                      <td>
                        <div className="gc-person">
                          <strong>
                            Dr. {cita.medico?.nombre || "No asignado"}{" "}
                            {cita.medico?.apellido || ""}
                          </strong>
                          <span>Médico asignado</span>
                        </div>
                      </td>

                      <td>
                        <div className="gc-date">
                          <strong>{fecha.dia}</strong>
                          <span>{fecha.hora || "Sin hora"}</span>
                        </div>
                      </td>

                      <td>
                        <div className="gc-motivo">
                          {cita.motivo || "Sin motivo registrado"}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`gc-status ${claseEstado(cita.estado)}`}
                        >
                          {cita.estado || "SIN ESTADO"}
                        </span>
                      </td>

                      <td>
                        {cita.estado === "SOLICITADA" ? (
                          <div className="gc-actions">
                            <button
                              className="gc-btn confirm"
                              onClick={() => confirmarCita(cita.id)}
                            >
                              Confirmar
                            </button>

                            <button
                              className="gc-btn reject"
                              onClick={() => rechazarCita(cita.id)}
                            >
                              Rechazar
                            </button>
                          </div>
                        ) : (
                          <span className="gc-no-actions">Sin acciones</span>
                        )}
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
  );
}

export default GestionCitas;