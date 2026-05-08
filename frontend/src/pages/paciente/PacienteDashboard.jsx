import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosConfig";

/* ─── Google Fonts ───────────────────────────────────────────────── */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500;600&display=swap";
document.head.appendChild(fontLink);

/* ─── Styles ─────────────────────────────────────────────────────── */
const styles = `
  :root {
    --mc-navy:       #0B1E3D;
    --mc-navy-light: #132952;
    --mc-teal:       #1ABFA1;
    --mc-teal-dim:   #12997f;
    --mc-teal-glow:  rgba(26,191,161,0.15);
    --mc-cream:      #F7F9FC;
    --mc-muted:      #7A8BA8;
    --mc-text:       #1C2B45;
    --mc-border:     rgba(11,30,61,0.08);
    --mc-danger:     #E55A5A;
    --mc-warning:    #F4A928;
    --mc-shadow:     0 4px 24px rgba(11,30,61,0.08), 0 1px 4px rgba(11,30,61,0.04);
  }

  .mc-layout {
    font-family: 'DM Sans', sans-serif;
    background: var(--mc-cream);
    color: var(--mc-text);
    min-height: 100vh;
    display: flex;
  }

  /* ── SIDEBAR ── */
  .mc-sidebar {
    width: 270px;
    background: var(--mc-navy);
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
  }

  .mc-sidebar::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 240px; height: 240px;
    background: radial-gradient(circle, rgba(26,191,161,0.18) 0%, transparent 70%);
    pointer-events: none;
  }

  .mc-sidebar-logo {
    padding: 28px 24px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .mc-logo-icon {
    width: 38px; height: 38px;
    background: var(--mc-teal);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 10px;
  }

  .mc-logo-name {
    font-family: 'Playfair Display', serif;
    font-size: 33px; font-weight: 600;
    color: white; letter-spacing: 0.01em;
  }

  .mc-logo-sub {
    font-size: 12px;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .mc-sidebar-nav { padding: 20px 14px; flex: 1; }

  .mc-nav-label {
    font-size: 9px; letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    padding: 0 10px; margin-bottom: 8px; margin-top: 20px;
  }

  .mc-nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 12px 14px; border-radius: 9px;
    color: rgba(255,255,255,0.55);
    font-size: 15px; font-weight: 400;
    cursor: pointer;
    transition: all 0.18s;
    margin-bottom: 2px;
    text-decoration: none;
    border: 1px solid transparent;
  }

  .mc-nav-item:hover { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.85); }
  .mc-nav-item.active {
    background: var(--mc-teal-glow);
    color: var(--mc-teal);
    font-weight: 500;
    border-color: rgba(26,191,161,0.2);
  }

  .mc-sidebar-footer {
    padding: 16px 14px;
    border-top: 1px solid rgba(255,255,255,0.07);
  }

  .mc-user-chip {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px;
    border-radius: 9px;
    background: rgba(255,255,255,0.05);
  }

  .mc-avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: linear-gradient(135deg, var(--mc-teal) 0%, #0e9a82 100%);
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: white; flex-shrink: 0;
  }

  .mc-user-name { font-size: 16px; color: rgba(255,255,255,0.8); font-weight: 500; }
  .mc-user-role { font-size: 14px; color: rgba(255,255,255,0.3); }

  /* ── MAIN ── */
  .mc-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

  .mc-topbar {
    background: white;
    border-bottom: 1px solid var(--mc-border);
    padding: 0 36px; height: 80px;
    display: flex; align-items: center; justify-content: space-between;
    flex-shrink: 0;
  }

  .mc-topbar h1 {
    font-family: 'Playfair Display', serif;
    font-size: 30px; font-weight: 600;
    color: var(--mc-navy); letter-spacing: -0.01em;
  }

  .mc-topbar p { font-size: 14px; color: var(--mc-muted); margin-top: 1px; }

  .mc-btn-logout {
    display: flex; align-items: center; gap: 6px;
    padding: 10px 18px; border-radius: 8px;
    border: 1px solid rgba(229,90,90,0.3);
    background: rgba(229,90,90,0.06);
    color: var(--mc-danger);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 500;
    cursor: pointer; transition: all 0.18s;
  }

  .mc-btn-logout:hover {
    background: rgba(229,90,90,0.12);
    border-color: rgba(229,90,90,0.5);
  }

  /* ── CONTENT ── */
  .mc-content { padding: 40px 42px; overflow-y: auto; flex: 1; }

  /* ── CTA ── */
  .mc-cta-card {
    background: linear-gradient(135deg, var(--mc-navy) 0%, var(--mc-navy-light) 60%, #1a3870 100%);
    border-radius: 16px; padding: 34px 38px;
    margin-bottom: 28px; position: relative;
    overflow: hidden;
    display: flex; align-items: center; justify-content: space-between;
    animation: mcFadeUp 0.45s ease both;
  }

  .mc-cta-card::before {
    content: '';
    position: absolute;
    top: -60px; right: -40px;
    width: 260px; height: 260px;
    background: radial-gradient(circle, rgba(26,191,161,0.2) 0%, transparent 65%);
    pointer-events: none;
  }

  .mc-cta-text h3 {
    font-family: 'Playfair Display', serif;
    font-size: 30px; color: white; font-weight: 500; margin-bottom: 6px;
  }

  .mc-cta-text p { font-size: 17px; color: rgba(255,255,255,0.5); }

  .mc-btn-cta {
    display: flex; align-items: center; gap: 8px;
    padding: 14px 28px;
    background: var(--mc-teal);
    color: white; border: none; border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
    white-space: nowrap; position: relative; z-index: 1;
    box-shadow: 0 4px 16px rgba(26,191,161,0.35);
  }

  .mc-btn-cta:hover {
    background: var(--mc-teal-dim);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(26,191,161,0.45);
  }

  /* ── SECTION HEADER ── */
  .mc-section-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 18px;
  }

  .mc-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 30px; color: var(--mc-navy); font-weight: 600;
  }

  .mc-badge-count {
    font-size: 12px;
    background: var(--mc-teal-glow);
    color: var(--mc-teal);
    border: 1px solid rgba(26,191,161,0.25);
    padding: 5px 12px; border-radius: 20px; font-weight: 600;
  }

  /* ── TABLE ── */
  .mc-table-card {
    background: white; border-radius: 16px;
    box-shadow: var(--mc-shadow); overflow: hidden;
    border: 1px solid var(--mc-border);
    animation: mcFadeUp 0.55s 0.1s ease both;
  }

  .mc-table-wrap { overflow-x: auto; }

  .mc-table { width: 100%; border-collapse: collapse; }

  .mc-table thead tr { background: var(--mc-navy); }

  .mc-table thead th {
    padding: 18px 22px;
    font-size: 13px; font-weight: 600;
    color: rgba(255,255,255,0.55);
    text-transform: uppercase; letter-spacing: 0.1em;
    text-align: left; white-space: nowrap;
  }

  .mc-table thead th:first-child { padding-left: 24px; }

  .mc-table tbody tr {
    border-bottom: 1px solid var(--mc-border);
    transition: background 0.15s;
  }

  .mc-table tbody tr:last-child { border-bottom: none; }
  .mc-table tbody tr:hover { background: rgba(26,191,161,0.03); }

  .mc-table tbody td {
    padding: 20px 22px;
    font-size: 15px; color: var(--mc-text);
    vertical-align: middle;
  }

  .mc-table tbody td:first-child {
    padding-left: 24px;
    color: var(--mc-muted);
    font-size: 12px; font-weight: 500;
  }

  .mc-doc-name { display: flex; align-items: center; gap: 9px; }

  .mc-doc-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: linear-gradient(135deg, #e8f4ff 0%, #c8dff8 100%);
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700; color: var(--mc-navy); flex-shrink: 0;
  }

  .mc-date-main { font-weight: 500; font-size: 15px; }
  .mc-date-time { font-size: 13px; color: var(--mc-muted); margin-top: 1px; }

  .mc-motivo-cell {
    max-width: 400px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    color: var(--mc-muted); font-size: 14px;
  }

  /* ── STATUS ── */
  .mc-status {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 6px 13px; border-radius: 20px;
    font-size: 13px; font-weight: 600; letter-spacing: 0.01em;
  }

  .mc-status-dot { width: 6px; height: 6px; border-radius: 50%; }

  .mc-status-default   { background: rgba(26,191,161,0.12); color: var(--mc-teal-dim); }
  .mc-status-default   .mc-status-dot { background: var(--mc-teal); }

  .mc-status-pendiente { background: rgba(244,169,40,0.12); color: #b37c00; }
  .mc-status-pendiente .mc-status-dot { background: var(--mc-warning); }

  .mc-status-confirmada { background: rgba(26,191,161,0.12); color: var(--mc-teal-dim); }
  .mc-status-confirmada .mc-status-dot { background: var(--mc-teal); }

  .mc-status-cancelada { background: rgba(229,90,90,0.1); color: #c0392b; }
  .mc-status-cancelada .mc-status-dot { background: var(--mc-danger); }

  /* ── EMPTY STATE ── */
  .mc-empty {
    padding: 56px 32px; text-align: center; color: var(--mc-muted);
  }

  .mc-empty-icon {
    width: 56px; height: 56px;
    background: var(--mc-teal-glow); border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px;
  }

  .mc-empty h4 { font-size: 20px; font-weight: 600; color: var(--mc-text); margin-bottom: 6px; }
  .mc-empty p { font-size: 13px; }

  /* ── ALERT ── */
  .mc-alert-error {
    margin: 16px 24px;
    background: rgba(229,90,90,0.08);
    border: 1px solid rgba(229,90,90,0.2);
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 13px; color: var(--mc-danger);
    display: flex; align-items: center; gap: 8px;
  }

  /* ── ANIMATIONS ── */
  @keyframes mcFadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

/* ─── Helpers ────────────────────────────────────────────────────── */
function getInitials(nombre = "", apellido = "") {
  return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
}

function formatFecha(fechaStr = "") {
  if (!fechaStr) return { date: "—", time: "" };
  const [date, time = ""] = fechaStr.split("T");
  return { date, time: time.slice(0, 5) };
}

function getStatusClass(estado = "") {
  const key = estado.toLowerCase();
  if (key.includes("confirm")) return "mc-status-confirmada";
  if (key.includes("pend")) return "mc-status-pendiente";
  if (key.includes("cancel")) return "mc-status-cancelada";
  return "mc-status-default";
}

/* ─── Component ──────────────────────────────────────────────────── */
function PacienteDashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [citas, setCitas] = useState([]);
  const [error, setError] = useState("");

  /* inject styles once */
  useEffect(() => {
    const tag = document.createElement("style");
    tag.id = "medicontrol-styles";
    tag.textContent = styles;
    if (!document.getElementById("medicontrol-styles")) {
      document.head.appendChild(tag);
    }
    return () => tag.remove();
  }, []);

  useEffect(() => {
    obtenerMisCitas();
  }, []);

  const obtenerMisCitas = async () => {
    try {
      const response = await API.get("/citas/mis-citas");
      setCitas(response.data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar tus citas.");
    }
  };

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* avatar initials from username fallback */
  const avatarInitials = (username ?? "P").slice(0, 2).toUpperCase();

  return (
    <div className="mc-layout">

      {/* ── SIDEBAR ── */}
      <aside className="mc-sidebar">
        <div className="mc-sidebar-logo">
          <div className="mc-logo-icon">
            <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
            </svg>
          </div>
          <div className="mc-logo-name">MediControl</div>
          <div className="mc-logo-sub">Portal Paciente</div>
        </div>

        <nav className="mc-sidebar-nav">
          <div className="mc-nav-label">Menú</div>
          <a className="mc-nav-item active" href="#">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
            </svg>
            Dashboard
          </a>
          <a className="mc-nav-item" href="#" onClick={() => navigate("/solicitar-cita")}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
            </svg>
            Mis citas
          </a>
          <a className="mc-nav-item" href="#" onClick={() => navigate("/paciente/perfil")}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
            Mi perfil
          </a>
        </nav>

        <div className="mc-sidebar-footer">
          <div className="mc-user-chip">
            <div className="mc-avatar">{avatarInitials}</div>
            <div>
              <div className="mc-user-name">{username}</div>
              <div className="mc-user-role">Paciente</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="mc-main">

        {/* Topbar */}
        <header className="mc-topbar">
          <div>
            <h1>Panel del Paciente</h1>
            <p>Bienvenido de nuevo, <strong>{username}</strong></p>
          </div>
          <button className="mc-btn-logout" onClick={cerrarSesion}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
            Cerrar sesión
          </button>
        </header>

        {/* Content */}
        <div className="mc-content">

          {/* CTA */}
          <div className="mc-cta-card">
            <div className="mc-cta-text">
              <h3>¿Necesitas una consulta?</h3>
              <p>Agenda tu cita con el especialista que necesitas</p>
            </div>
            <button className="mc-btn-cta" onClick={() => navigate("/solicitar-cita")}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-7-3h2v2h-2zm0-4h2v2h-2zm-4 4h2v2H8zm0-4h2v2H8zm8 4h2v2h-2zm0-4h2v2h-2z" />
              </svg>
              Solicitar cita
            </button>
          </div>

          {/* Table section */}
          <div className="mc-section-header">
            <span className="mc-section-title">Mis citas</span>
            {citas.length > 0 && (
              <span className="mc-badge-count">{citas.length} {citas.length === 1 ? "cita" : "citas"}</span>
            )}
          </div>

          <div className="mc-table-card">
            {error && (
              <div className="mc-alert-error">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
                {error}
              </div>
            )}

            {citas.length === 0 && !error ? (
              <div className="mc-empty">
                <div className="mc-empty-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1ABFA1" strokeWidth="1.8" width="26" height="26">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h4>Aún no tienes citas registradas</h4>
                <p>Solicita tu primera cita con el botón de arriba</p>
              </div>
            ) : (
              <div className="mc-table-wrap">
                <table className="mc-table">
                  <thead>
                    <tr>
                      <th>Médico</th>
                      <th>Fecha</th>
                      <th>Motivo</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citas.map((cita) => {
                      const { date, time } = formatFecha(cita.fecha);
                      const initials = cita.medico
                        ? getInitials(cita.medico.nombre, cita.medico.apellido)
                        : "NA";
                      const statusClass = getStatusClass(cita.estado);

                      return (
                        <tr key={cita.id}>
                          <td>
                            <div className="mc-doc-name">
                              <div className="mc-doc-avatar">{initials}</div>
                              <span>
                                {cita.medico
                                  ? `Dr. ${cita.medico.nombre} ${cita.medico.apellido}`
                                  : "No asignado"}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="mc-date-main">{date}</div>
                            {time && <div className="mc-date-time">{time}</div>}
                          </td>
                          <td>
                            <div className="mc-motivo-cell">{cita.motivo}</div>
                          </td>
                          <td>
                            <span className={`mc-status ${statusClass}`}>
                              <span className="mc-status-dot" />
                              {cita.estado}
                            </span>
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
      </div>
    </div>
  );
}

export default PacienteDashboard;
