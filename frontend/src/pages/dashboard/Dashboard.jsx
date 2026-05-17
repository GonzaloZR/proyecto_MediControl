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
  --mc-success:#1ABFA1;
  --mc-shadow:0 10px 34px rgba(11,30,61,.11);
}

.admin-page * {
  box-sizing:border-box;
}

.admin-page {
  min-height:100vh;
  display:flex;
  background:var(--mc-cream);
  font-family:'DM Sans', sans-serif;
  color:var(--mc-text);
}

.admin-sidebar {
  width:290px;
  background:linear-gradient(180deg,var(--mc-navy),var(--mc-navy-2));
  color:white;
  display:flex;
  flex-direction:column;
  flex-shrink:0;
}

.admin-brand {
  padding:32px 26px;
  border-bottom:1px solid rgba(255,255,255,.08);
}

.admin-logo {
  width:48px;
  height:48px;
  border-radius:15px;
  background:var(--mc-teal);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:25px;
  font-weight:800;
  margin-bottom:14px;
}

.admin-brand h2 {
  font-family:'Playfair Display', serif;
  font-size:25px;
  margin:0;
}

.admin-brand span {
  display:block;
  margin-top:5px;
  font-size:12px;
  letter-spacing:.13em;
  text-transform:uppercase;
  color:rgba(255,255,255,.45);
}

.admin-menu {
  padding:24px 16px;
  flex:1;
}

.admin-menu-label {
  font-size:11px;
  color:rgba(255,255,255,.38);
  text-transform:uppercase;
  letter-spacing:.14em;
  font-weight:800;
  margin:0 12px 12px;
}

.admin-menu button {
  width:100%;
  border:1px solid transparent;
  background:transparent;
  color:rgba(255,255,255,.70);
  border-radius:14px;
  padding:14px 15px;
  margin-bottom:8px;
  display:flex;
  align-items:center;
  gap:12px;
  font-size:15px;
  font-weight:700;
  cursor:pointer;
  transition:.2s;
  text-align:left;
}

.admin-menu button:hover,
.admin-menu button.active {
  background:rgba(26,191,161,.14);
  color:var(--mc-teal);
  border-color:rgba(26,191,161,.25);
}

.admin-footer {
  padding:18px 16px;
  border-top:1px solid rgba(255,255,255,.08);
}

.admin-user {
  background:rgba(255,255,255,.07);
  border-radius:18px;
  padding:15px;
  display:flex;
  gap:12px;
  align-items:center;
}

.admin-avatar {
  width:43px;
  height:43px;
  border-radius:50%;
  background:var(--mc-teal);
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:900;
}

.admin-user strong {
  display:block;
  color:white;
  font-size:15px;
}

.admin-user small {
  color:rgba(255,255,255,.45);
}

.admin-main {
  flex:1;
  min-width:0;
}

.admin-topbar {
  height:86px;
  background:white;
  border-bottom:1px solid var(--mc-border);
  padding:0 44px;
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.admin-topbar h1 {
  font-family:'Playfair Display', serif;
  font-size:32px;
  color:var(--mc-navy);
  margin:0;
}

.admin-topbar p {
  margin:4px 0 0;
  font-size:15px;
  color:var(--mc-muted);
}

.admin-logout {
  border:1px solid rgba(229,90,90,.3);
  background:rgba(229,90,90,.07);
  color:var(--mc-danger);
  border-radius:13px;
  padding:12px 18px;
  font-weight:800;
  cursor:pointer;
}

.admin-content {
  padding:42px;
}

.admin-hero {
  background:linear-gradient(135deg,var(--mc-navy),var(--mc-navy-2),#1a3870);
  color:white;
  border-radius:26px;
  padding:38px 42px;
  box-shadow:var(--mc-shadow);
  margin-bottom:30px;
  position:relative;
  overflow:hidden;
}

.admin-hero::after {
  content:"";
  position:absolute;
  right:-70px;
  top:-80px;
  width:330px;
  height:330px;
  background:radial-gradient(circle,rgba(26,191,161,.28),transparent 70%);
}

.admin-hero-tag {
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

.admin-hero h2 {
  font-family:'Playfair Display', serif;
  font-size:40px;
  margin:0 0 8px;
  position:relative;
  z-index:1;
}

.admin-hero p {
  font-size:16px;
  color:rgba(255,255,255,.68);
  margin:0;
  position:relative;
  z-index:1;
}

.admin-alert-error {
  background:rgba(229,90,90,.09);
  color:var(--mc-danger);
  border:1px solid rgba(229,90,90,.22);
  padding:15px 18px;
  border-radius:15px;
  margin-bottom:24px;
  font-size:15px;
  font-weight:700;
}

.admin-stats {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:20px;
  margin-bottom:28px;
}

.stat-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:22px;
  padding:24px;
  box-shadow:var(--mc-shadow);
}

.stat-card span {
  color:var(--mc-muted);
  font-size:14px;
  font-weight:800;
}

.stat-card h3 {
  font-family:'Playfair Display', serif;
  font-size:36px;
  color:var(--mc-navy);
  margin:8px 0 3px;
}

.stat-card small {
  color:var(--mc-teal);
  font-weight:800;
}

.admin-grid-main {
  display:grid;
  grid-template-columns:1.3fr .7fr;
  gap:24px;
  margin-bottom:34px;
}

.panel {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:24px;
  padding:28px;
  box-shadow:var(--mc-shadow);
}

.panel h3 {
  font-family:'Playfair Display', serif;
  font-size:27px;
  color:var(--mc-navy);
  margin:0 0 6px;
}

.panel p {
  color:var(--mc-muted);
  font-size:15px;
  margin-bottom:22px;
}

.bar-chart {
  display:flex;
  align-items:end;
  gap:18px;
  height:230px;
  padding-top:20px;
}

.bar-item {
  flex:1;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:10px;
}

.bar {
  width:100%;
  max-width:58px;
  background:linear-gradient(180deg,var(--mc-teal),#0e9a82);
  border-radius:14px 14px 6px 6px;
  box-shadow:0 8px 20px rgba(26,191,161,.22);
  transition:.3s;
}

.bar-item strong {
  font-size:14px;
  color:var(--mc-navy);
}

.bar-item span {
  font-size:12px;
  color:var(--mc-muted);
  text-align:center;
}

.donut-wrap {
  display:flex;
  align-items:center;
  justify-content:center;
  padding:12px 0;
}

.donut {
  width:210px;
  height:210px;
  border-radius:50%;
  display:flex;
  align-items:center;
  justify-content:center;
  position:relative;
}

.donut::before {
  content:"";
  width:132px;
  height:132px;
  background:white;
  border-radius:50%;
  position:absolute;
}

.donut-center {
  position:relative;
  text-align:center;
}

.donut-center strong {
  display:block;
  font-family:'Playfair Display', serif;
  font-size:34px;
  color:var(--mc-navy);
}

.donut-center span {
  color:var(--mc-muted);
  font-size:13px;
}

.legend {
  display:flex;
  flex-direction:column;
  gap:10px;
  margin-top:18px;
}

.legend-item {
  display:flex;
  align-items:center;
  justify-content:space-between;
  color:var(--mc-muted);
  font-size:14px;
}

.legend-left {
  display:flex;
  align-items:center;
  gap:9px;
}

.dot {
  width:10px;
  height:10px;
  border-radius:50%;
}

.dot.green { background:var(--mc-teal); }
.dot.yellow { background:var(--mc-warning); }
.dot.red { background:var(--mc-danger); }
.dot.blue { background:var(--mc-navy); }

.section-title {
  margin-bottom:20px;
}

.section-title h2 {
  font-family:'Playfair Display', serif;
  font-size:32px;
  color:var(--mc-navy);
  margin:0 0 5px;
}

.section-title p {
  color:var(--mc-muted);
  font-size:15px;
  margin:0;
}

.module-grid {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:22px;
}

.module-card {
  background:white;
  border:1px solid var(--mc-border);
  border-radius:24px;
  padding:28px;
  box-shadow:var(--mc-shadow);
  min-height:220px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  transition:.22s;
}

.module-card:hover {
  transform:translateY(-4px);
  border-color:rgba(26,191,161,.35);
}

.module-icon {
  width:52px;
  height:52px;
  border-radius:16px;
  background:rgba(26,191,161,.12);
  color:var(--mc-teal);
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:25px;
  font-weight:900;
  margin-bottom:16px;
}

.module-card h3 {
  font-family:'Playfair Display', serif;
  font-size:26px;
  color:var(--mc-navy);
  margin:0 0 8px;
}

.module-card p {
  color:var(--mc-muted);
  font-size:15px;
  line-height:1.6;
  margin:0;
}

.module-card button {
  margin-top:24px;
  width:100%;
  border:none;
  background:var(--mc-navy);
  color:white;
  border-radius:14px;
  padding:14px 18px;
  font-size:15px;
  font-weight:900;
  cursor:pointer;
  transition:.2s;
}

.module-card button:hover {
  background:var(--mc-teal);
}

.admin-warning {
  background:rgba(244,169,40,.12);
  color:#9a6a00;
  border:1px solid rgba(244,169,40,.28);
  border-radius:15px;
  padding:16px 18px;
  font-size:15px;
  font-weight:700;
}

@media(max-width:1200px) {
  .admin-stats {
    grid-template-columns:repeat(2,1fr);
  }

  .admin-grid-main {
    grid-template-columns:1fr;
  }

  .module-grid {
    grid-template-columns:repeat(2,1fr);
  }
}

@media(max-width:850px) {
  .admin-page {
    flex-direction:column;
  }

  .admin-sidebar {
    width:100%;
  }

  .admin-menu,
  .admin-footer {
    display:none;
  }

  .admin-topbar {
    height:auto;
    padding:24px;
    flex-direction:column;
    align-items:flex-start;
    gap:16px;
  }

  .admin-content {
    padding:24px;
  }

  .admin-stats,
  .module-grid {
    grid-template-columns:1fr;
  }

  .admin-hero {
    padding:30px 26px;
  }

  .admin-hero h2 {
    font-size:32px;
  }
}
`;

function Dashboard() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const rol = localStorage.getItem("rol");

  const [metricas, setMetricas] = useState({
    pacientes: 0,
    medicos: 0,
    especialidades: 0,
    citas: 0,
    pendientes: 0,
    confirmadas: 0,
    rechazadas: 0,
    atendidas: 0,
  });

  const [errorMetricas, setErrorMetricas] = useState("");

  useEffect(() => {
    const tag = document.createElement("style");
    tag.id = "admin-dashboard-real-styles";
    tag.textContent = styles;

    if (!document.getElementById("admin-dashboard-real-styles")) {
      document.head.appendChild(tag);
    }

    if (rol === "ADMIN" || rol === "RECEPCIONISTA") {
      obtenerMetricas();
    }

    return () => tag.remove();
  }, [rol]);

  const obtenerMetricas = async () => {
    if (rol === "MEDICO") return;

    try {
      setErrorMetricas("");

      const peticiones = [
        API.get("/pacientes"),
        API.get("/especialidades"),
        API.get("/citas"),
      ];

      if (rol === "ADMIN" || rol === "RECEPCIONISTA") {
        peticiones.push(API.get("/medicos"));
      }

      const respuestas = await Promise.all(peticiones);

      const pacientes = Array.isArray(respuestas[0].data) ? respuestas[0].data : [];
      const especialidades = Array.isArray(respuestas[1].data)
        ? respuestas[1].data
        : [];
      const citas = Array.isArray(respuestas[2].data) ? respuestas[2].data : [];
      const medicos = respuestas[3] && Array.isArray(respuestas[3].data)
        ? respuestas[3].data
        : [];

      setMetricas({
        pacientes: pacientes.length,
        medicos: medicos.length,
        especialidades: especialidades.length,
        citas: citas.length,
        pendientes: citas.filter((c) => c.estado === "PENDIENTE").length,
        solicitadas: citas.filter((c) => c.estado === "SOLICITADA").length,
        confirmadas: citas.filter((c) => c.estado === "CONFIRMADA").length,
        rechazadas: citas.filter((c) => c.estado === "RECHAZADA").length,
        atendidas: citas.filter((c) => c.estado === "ATENDIDA").length,
      });
    } catch (err) {
      console.error("Error al cargar métricas:", err);

      if (rol !== "MEDICO") {
        setErrorMetricas(
          "No se pudieron cargar las métricas del dashboard. Verifica que los endpoints estén disponibles."
        );
      }
    }
  };

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/login");
  };

  const opcionesPorRol = {
    ADMIN: [
      {
        icono: "P",
        titulo: "Pacientes",
        descripcion:
          "Gestionar pacientes registrados, datos personales y estado de atención.",
        ruta: "/dashboard/pacientes",
      },
      {
        icono: "M",
        titulo: "Médicos",
        descripcion:
          "Administrar médicos, especialidades, colegiatura y disponibilidad.",
        ruta: "/dashboard/medicos",
      },
      {
        icono: "E",
        titulo: "Especialidades",
        descripcion:
          "Organizar especialidades médicas disponibles en la clínica.",
        ruta: "/dashboard/especialidades",
      },
      {
        icono: "C",
        titulo: "Citas",
        descripcion:
          "Ver, confirmar, rechazar y controlar las solicitudes de citas.",
        ruta: "/dashboard/citas",
      },
      {
        icono: "U",
        titulo: "Usuarios",
        descripcion:
          "Gestionar usuarios internos, accesos y roles del sistema.",
        ruta: "/dashboard/usuarios",
      },
    ],
    RECEPCIONISTA: [
      {
        icono: "P",
        titulo: "Pacientes",
        descripcion: "Gestionar información básica de pacientes.",
        ruta: "/dashboard/pacientes",
      },
      {
        icono: "C",
        titulo: "Citas",
        descripcion: "Confirmar, rechazar y revisar solicitudes de citas.",
        ruta: "/dashboard/citas",
      },
      {
        icono: "M",
        titulo: "Médicos",
        descripcion: "Consultar médicos disponibles dentro de la clínica.",
        ruta: "/dashboard/medicos",
      },
      {
        icono: "E",
        titulo: "Especialidades",
        descripcion: "Consultar especialidades médicas registradas.",
        ruta: "/dashboard/especialidades",
      },
    ],
    MEDICO: [
      {
        titulo: "Atención médica",
        descripcion: "Registrar diagnóstico, observaciones y atención realizada.",
        ruta: "/dashboard/mis-citas-medico",
      },
    ],
  };

  const opciones = opcionesPorRol[rol] || [];
  const iniciales = username ? username.slice(0, 2).toUpperCase() : "US";

  const calcularAltura = (valor) => {
    const max = Math.max(
      metricas.pacientes,
      metricas.medicos,
      metricas.especialidades,
      metricas.citas,
      1
    );

    return `${Math.max((valor / max) * 100, 8)}%`;
  };

  const porcentaje = (valor) => {
    if (metricas.citas === 0) return 0;
    return Math.round((valor / metricas.citas) * 100);
  };

  const porcentajeConfirmadas = porcentaje(metricas.confirmadas);
  const porcentajePendientes = porcentaje(metricas.pendientes);
  const porcentajeRechazadas = porcentaje(metricas.rechazadas);
  const porcentajeAtendidas = porcentaje(metricas.atendidas);

  const finConfirmadas = porcentajeConfirmadas;
  const finPendientes = porcentajeConfirmadas + porcentajePendientes;
  const finRechazadas = finPendientes + porcentajeRechazadas;

  const donutBackground =
    metricas.citas === 0
      ? "conic-gradient(rgba(11,30,61,.12) 0 100%)"
      : `conic-gradient(
          var(--mc-teal) 0 ${finConfirmadas}%,
          var(--mc-warning) ${finConfirmadas}% ${finPendientes}%,
          var(--mc-danger) ${finPendientes}% ${finRechazadas}%,
          var(--mc-navy) ${finRechazadas}% 100%
        )`;

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-logo">+</div>
          <h2>MediControl</h2>
          <span>Panel interno</span>
        </div>

        <nav className="admin-menu">
          <div className="admin-menu-label">Navegación</div>

          <button className="active" type="button">
            ▣ Dashboard
          </button>

          {opciones.map((opcion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => navigate(opcion.ruta)}
            >
              {opcion.icono} {opcion.titulo}
            </button>
          ))}
        </nav>

        <div className="admin-footer">
          <div className="admin-user">
            <div className="admin-avatar">{iniciales}</div>
            <div>
              <strong>{username}</strong>
              <small>{rol}</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <h1>Dashboard Administrativo</h1>
            <p>
              Bienvenido, <strong>{username}</strong> | Rol:{" "}
              <strong>{rol}</strong>
            </p>
          </div>

          <button className="admin-logout" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </header>

        {rol === "ADMIN" && (

          <section className="admin-content">

            <div className="admin-hero">

              <span className="admin-hero-tag">
                Gestión clínica
              </span>

              <h2>
                Centro de control MediControl
              </h2>

              <p>
                Supervisa los principales módulos del sistema usando información
                real registrada en la base de datos.
              </p>

            </div>

            {errorMetricas && (
              <div className="admin-alert-error">
                {errorMetricas}
              </div>
            )}

            <div className="admin-stats">

              <div className="stat-card">
                <span>Pacientes</span>
                <h3>{metricas.pacientes}</h3>
                <small>Registrados</small>
              </div>

              <div className="stat-card">
                <span>Médicos</span>
                <h3>{metricas.medicos}</h3>
                <small>Disponibles</small>
              </div>

              <div className="stat-card">
                <span>Citas</span>
                <h3>{metricas.citas}</h3>
                <small>Total registradas</small>
              </div>

              <div className="stat-card">
                <span>Especialidades</span>
                <h3>{metricas.especialidades}</h3>
                <small>Activas</small>
              </div>

            </div>

            <div className="admin-grid-main">

              <div className="panel">

                <h3>
                  Resumen por módulo
                </h3>

                <p>
                  Comparación visual basada en los registros actuales de la base
                  de datos.
                </p>

                <div className="bar-chart">

                  <div className="bar-item">
                    <div
                      className="bar"
                      style={{
                        height: calcularAltura(metricas.pacientes),
                      }}
                    />
                    <strong>{metricas.pacientes}</strong>
                    <span>Pacientes</span>
                  </div>

                  <div className="bar-item">
                    <div
                      className="bar"
                      style={{
                        height: calcularAltura(metricas.medicos),
                      }}
                    />
                    <strong>{metricas.medicos}</strong>
                    <span>Médicos</span>
                  </div>

                  <div className="bar-item">
                    <div
                      className="bar"
                      style={{
                        height: calcularAltura(metricas.citas),
                      }}
                    />
                    <strong>{metricas.citas}</strong>
                    <span>Citas</span>
                  </div>

                  <div className="bar-item">
                    <div
                      className="bar"
                      style={{
                        height: calcularAltura(metricas.especialidades),
                      }}
                    />
                    <strong>{metricas.especialidades}</strong>
                    <span>Especialidades</span>
                  </div>

                </div>

              </div>

              <div className="panel">

                <h3>
                  Estado de citas
                </h3>

                <p>
                  Distribución real según el estado registrado.
                </p>

                <div className="donut-wrap">

                  <div
                    className="donut"
                    style={{ background: donutBackground }}
                  >

                    <div className="donut-center">
                      <strong>{metricas.citas}</strong>
                      <span>Total citas</span>
                    </div>

                  </div>

                </div>

                <div className="legend">

                  <div className="legend-item">
                    <div className="legend-left">
                      <span className="dot green"></span>
                      Confirmadas
                    </div>

                    <strong>
                      {metricas.confirmadas} ({porcentajeConfirmadas}%)
                    </strong>
                  </div>

                  <div className="legend-item">
                    <div className="legend-left">
                      <span className="dot yellow"></span>
                      Pendientes
                    </div>

                    <strong>
                      {metricas.pendientes} ({porcentajePendientes}%)
                    </strong>
                  </div>

                  <div className="legend-item">
                    <div className="legend-left">
                      <span className="dot red"></span>
                      Rechazadas
                    </div>

                    <strong>
                      {metricas.rechazadas} ({porcentajeRechazadas}%)
                    </strong>
                  </div>

                  <div className="legend-item">
                    <div className="legend-left">
                      <span className="dot blue"></span>
                      Atendidas
                    </div>

                    <strong>
                      {metricas.atendidas} ({porcentajeAtendidas}%)
                    </strong>
                  </div>

                </div>

              </div>

            </div>

            <div className="section-title">
              <h2>Módulos del sistema</h2>
              <p>Selecciona el módulo que deseas gestionar.</p>
            </div>

            <div className="module-grid">

              {opciones.map((opcion, index) => (

                <div className="module-card" key={index}>

                  <div>

                    <div className="module-icon">
                      {opcion.icono}
                    </div>

                    <h3>
                      {opcion.titulo}
                    </h3>

                    <p>
                      {opcion.descripcion}
                    </p>

                  </div>

                  <button
                    onClick={() => navigate(opcion.ruta)}
                  >
                    Entrar al módulo
                  </button>

                </div>

              ))}

            </div>

          </section>

        )}

        {rol === "RECEPCIONISTA" && (

          <section className="admin-content">

            <div className="admin-hero">

              <span className="admin-hero-tag">
                Recepción clínica
              </span>

              <h2>
                Panel de Recepción
              </h2>

              <p>
                Gestiona pacientes, citas y consulta información médica disponible.
              </p>

            </div>

            <div className="section-title">

              <h2>
                Módulos disponibles
              </h2>

              <p>
                Accede a las funciones asignadas para recepción.
              </p>

            </div>

            <div className="module-grid">

              {opciones.map((opcion, index) => (

                <div className="module-card" key={index}>

                  <div>

                    <div className="module-icon">
                      {opcion.icono}
                    </div>

                    <h3>
                      {opcion.titulo}
                    </h3>

                    <p>
                      {opcion.descripcion}
                    </p>

                  </div>

                  <button
                    onClick={() => navigate(opcion.ruta)}
                  >
                    Entrar al módulo
                  </button>

                </div>

              ))}

            </div>

          </section>

        )}

        {rol === "MEDICO" && (

          <section className="admin-content">

            <div className="admin-hero">

              <span className="admin-hero-tag">
                Atención médica
              </span>

              <h2>
                Panel Médico
              </h2>

              <p>
                Gestiona tus citas médicas, diagnósticos y atención de pacientes.
              </p>

            </div>

            <div className="module-grid">

              {opciones.map((opcion, index) => (

                <div className="module-card" key={index}>

                  <div>

                    <div className="module-icon">
                      A
                    </div>

                    <h3>
                      {opcion.titulo}
                    </h3>

                    <p>
                      {opcion.descripcion}
                    </p>

                  </div>

                  <button
                    onClick={() => navigate(opcion.ruta)}
                  >
                    Entrar al módulo
                  </button>

                </div>

              ))}

            </div>

          </section>

        )}
      </main>
    </div>
  );
}

export default Dashboard;