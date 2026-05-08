import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosConfig";

const styles = `
  :root {
    --mc-navy: #0B1E3D;
    --mc-navy-light: #132952;
    --mc-teal: #1ABFA1;
    --mc-teal-dim: #12997f;
    --mc-cream: #F7F9FC;
    --mc-muted: #7A8BA8;
    --mc-text: #1C2B45;
    --mc-border: rgba(11,30,61,0.10);
    --mc-danger: #E55A5A;
    --mc-success: #1ABFA1;
    --mc-warning: #F4A928;
    --mc-shadow: 0 8px 32px rgba(11,30,61,0.10);
  }

  .sc-page {
    min-height: 100vh;
    background: var(--mc-cream);
    font-family: 'DM Sans', sans-serif;
    color: var(--mc-text);
    padding: 46px;
  }

  .sc-wrapper {
    max-width: 980px;
    margin: 0 auto;
  }

  .sc-header {
    background: linear-gradient(135deg, var(--mc-navy), var(--mc-navy-light), #1a3870);
    border-radius: 22px;
    padding: 38px 42px;
    color: white;
    margin-bottom: 30px;
    box-shadow: var(--mc-shadow);
    position: relative;
    overflow: hidden;
  }

  .sc-header::after {
    content: "";
    position: absolute;
    right: -70px;
    top: -70px;
    width: 260px;
    height: 260px;
    background: radial-gradient(circle, rgba(26,191,161,0.24), transparent 68%);
  }

  .sc-tag {
    display: inline-block;
    background: rgba(26,191,161,0.14);
    border: 1px solid rgba(26,191,161,0.28);
    color: var(--mc-teal);
    padding: 7px 15px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .10em;
    text-transform: uppercase;
    margin-bottom: 18px;
  }

  .sc-title {
    font-family: 'Playfair Display', serif;
    font-size: 38px;
    font-weight: 600;
    margin-bottom: 8px;
    position: relative;
    z-index: 1;
  }

  .sc-subtitle {
    font-size: 16px;
    color: rgba(255,255,255,0.68);
    position: relative;
    z-index: 1;
  }

  .sc-card {
    background: white;
    border-radius: 22px;
    padding: 38px 42px;
    box-shadow: var(--mc-shadow);
    border: 1px solid var(--mc-border);
  }

  .sc-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px;
    color: var(--mc-navy);
    margin-bottom: 8px;
  }

  .sc-section-subtitle {
    color: var(--mc-muted);
    font-size: 15px;
    margin-bottom: 28px;
  }

  .sc-alert {
    border-radius: 14px;
    padding: 15px 18px;
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 22px;
  }

  .sc-alert.success {
    background: rgba(26,191,161,0.11);
    color: var(--mc-teal-dim);
    border: 1px solid rgba(26,191,161,0.28);
  }

  .sc-alert.error {
    background: rgba(229,90,90,0.10);
    color: var(--mc-danger);
    border: 1px solid rgba(229,90,90,0.25);
  }

  .sc-alert.warning {
    background: rgba(244,169,40,0.12);
    color: #9a6a00;
    border: 1px solid rgba(244,169,40,0.25);
    margin-top: 12px;
  }

  .sc-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
  }

  .sc-field.full {
    grid-column: 1 / -1;
  }

  .sc-label {
    display: block;
    font-size: 13px;
    font-weight: 700;
    color: var(--mc-navy);
    text-transform: uppercase;
    letter-spacing: .06em;
    margin-bottom: 9px;
  }

  .sc-input,
  .sc-select,
  .sc-textarea {
    width: 100%;
    border: 1.5px solid var(--mc-border);
    background: var(--mc-cream);
    border-radius: 14px;
    padding: 15px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    color: var(--mc-text);
    outline: none;
    transition: all .2s ease;
  }

  .sc-select {
    cursor: pointer;
  }

  .sc-textarea {
    min-height: 140px;
    resize: vertical;
  }

  .sc-input:focus,
  .sc-select:focus,
  .sc-textarea:focus {
    background: white;
    border-color: var(--mc-teal);
    box-shadow: 0 0 0 4px rgba(26,191,161,0.11);
  }

  .sc-select:disabled {
    opacity: .65;
    cursor: not-allowed;
  }

  .sc-help {
    display: block;
    color: var(--mc-muted);
    font-size: 13px;
    margin-top: 8px;
    line-height: 1.5;
  }

  .sc-actions {
    display: flex;
    gap: 14px;
    margin-top: 30px;
  }

  .sc-btn {
    border: none;
    border-radius: 14px;
    padding: 15px 26px;
    font-family: 'DM Sans', sans-serif;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all .2s ease;
  }

  .sc-btn-primary {
    background: var(--mc-teal);
    color: white;
    box-shadow: 0 6px 18px rgba(26,191,161,0.28);
  }

  .sc-btn-primary:hover {
    background: var(--mc-teal-dim);
    transform: translateY(-1px);
  }

  .sc-btn-secondary {
    background: white;
    color: var(--mc-navy);
    border: 1.5px solid var(--mc-border);
  }

  .sc-btn-secondary:hover {
    border-color: var(--mc-teal);
    color: var(--mc-teal);
  }

  @media (max-width: 768px) {
    .sc-page {
      padding: 24px;
    }

    .sc-header,
    .sc-card {
      padding: 28px 24px;
    }

    .sc-title {
      font-size: 31px;
    }

    .sc-form-grid {
      grid-template-columns: 1fr;
    }

    .sc-actions {
      flex-direction: column;
    }

    .sc-btn {
      width: 100%;
    }
  }
`;

function SolicitarCita() {
  const navigate = useNavigate();

  const [medicos, setMedicos] = useState([]);
  const [citas, setCitas] = useState([]);

  const [form, setForm] = useState({
    medicoId: "",
    fecha: "",
    motivo: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const horasDisponibles = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  useEffect(() => {
    const tag = document.createElement("style");
    tag.id = "solicitar-cita-styles";
    tag.textContent = styles;

    if (!document.getElementById("solicitar-cita-styles")) {
      document.head.appendChild(tag);
    }

    return () => tag.remove();
  }, []);

  useEffect(() => {
    obtenerMedicos();
    obtenerCitas();
  }, []);

  const obtenerMedicos = async () => {
    try {
      const response = await API.get("/medicos");
      setMedicos(response.data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar médicos.");
    }
  };

  const obtenerCitas = async () => {
    try {
      const response = await API.get("/citas");
      setCitas(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const generarHorarios = () => {
    const horarios = [];
    const hoy = new Date();

    if (!form.medicoId) return horarios;

    for (let i = 0; i < 7; i++) {
      const fecha = new Date();
      fecha.setDate(hoy.getDate() + i);

      const dia = fecha.getDay();

      if (dia === 0) continue;

      const yyyy = fecha.getFullYear();
      const mm = String(fecha.getMonth() + 1).padStart(2, "0");
      const dd = String(fecha.getDate()).padStart(2, "0");

      horasDisponibles.forEach((hora) => {
        const fechaHora = `${yyyy}-${mm}-${dd}T${hora}:00`;
        const fechaDate = new Date(fechaHora);

        if (fechaDate <= hoy) return;

        const ocupado = citas.some((cita) => {
          const fechaCita = cita.fecha?.slice(0, 19);

          return (
            cita.medico?.id === parseInt(form.medicoId) &&
            fechaCita === fechaHora &&
            cita.estado !== "RECHAZADA" &&
            cita.estado !== "CANCELADA"
          );
        });

        horarios.push({
          value: fechaHora,
          label: ocupado
            ? `${diasSemana[dia]} ${dd}/${mm}/${yyyy} - ${hora} (No disponible)`
            : `${diasSemana[dia]} ${dd}/${mm}/${yyyy} - ${hora}`,
          ocupado,
        });
      });
    }

    return horarios;
  };

  const horariosGenerados = generarHorarios();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
      ...(name === "medicoId" ? { fecha: "" } : {}),
    });

    setError("");
    setMensaje("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    if (!form.medicoId || !form.fecha || !form.motivo.trim()) {
      setError("Completa todos los campos antes de solicitar la cita.");
      return;
    }

    try {
      const body = {
        medico: {
          id: parseInt(form.medicoId),
        },
        fecha: form.fecha,
        motivo: form.motivo.trim(),
      };

      await API.post("/citas/mis-citas", body);

      setMensaje("Cita solicitada correctamente. Redirigiendo al panel...");
      await obtenerCitas();

      setTimeout(() => {
        navigate("/paciente");
      }, 1500);
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (typeof err.response?.data === "string") {
        setError(err.response.data);
      } else {
        setError("Error al solicitar cita.");
      }
    }
  };

  return (
    <div className="sc-page">
      <div className="sc-wrapper">
        <div className="sc-header">
          <span className="sc-tag">Portal Paciente</span>
          <h1 className="sc-title">Solicitar cita médica</h1>
          <p className="sc-subtitle">
            Selecciona un médico, revisa los horarios disponibles y registra el motivo de tu consulta.
          </p>
        </div>

        <div className="sc-card">
          <h2 className="sc-section-title">Datos de la cita</h2>
          <p className="sc-section-subtitle">
            Completa la información necesaria para enviar tu solicitud.
          </p>

          {mensaje && <div className="sc-alert success">{mensaje}</div>}
          {error && <div className="sc-alert error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="sc-form-grid">
              <div className="sc-field">
                <label className="sc-label">Médico</label>

                <select
                  name="medicoId"
                  className="sc-select"
                  value={form.medicoId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un médico</option>

                  {medicos.map((medico) => (
                    <option key={medico.id} value={medico.id}>
                      Dr. {medico.nombre} {medico.apellido}
                    </option>
                  ))}
                </select>

                <small className="sc-help">
                  Primero selecciona el médico con el que deseas atenderte.
                </small>
              </div>

              <div className="sc-field">
                <label className="sc-label">Día y horario disponible</label>

                <select
                  name="fecha"
                  className="sc-select"
                  value={form.fecha}
                  onChange={handleChange}
                  required
                  disabled={!form.medicoId}
                >
                  <option value="">
                    {form.medicoId
                      ? "Seleccione día y hora"
                      : "Primero seleccione un médico"}
                  </option>

                  {horariosGenerados.map((horario) => (
                    <option
                      key={horario.value}
                      value={horario.value}
                      disabled={horario.ocupado}
                    >
                      {horario.label}
                    </option>
                  ))}
                </select>

                <small className="sc-help">
                  Se muestran horarios de lunes a sábado, de 08:00 a 18:00.
                </small>

                {form.medicoId && horariosGenerados.length === 0 && (
                  <div className="sc-alert warning">
                    No hay horarios disponibles para este médico en los próximos 7 días.
                  </div>
                )}
              </div>

              <div className="sc-field full">
                <label className="sc-label">Motivo de la consulta</label>

                <textarea
                  name="motivo"
                  className="sc-textarea"
                  value={form.motivo}
                  onChange={handleChange}
                  required
                  placeholder="Describe brevemente el motivo de tu consulta. Ejemplo: dolor de cabeza frecuente, control médico, dolor abdominal, etc."
                />
              </div>
            </div>

            <div className="sc-actions">
              <button type="submit" className="sc-btn sc-btn-primary">
                Solicitar cita
              </button>

              <button
                type="button"
                className="sc-btn sc-btn-secondary"
                onClick={() => navigate("/paciente")}
              >
                Volver al panel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SolicitarCita;