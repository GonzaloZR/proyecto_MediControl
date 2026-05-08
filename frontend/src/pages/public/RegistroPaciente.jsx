import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosConfig";

if (!document.getElementById("mc-fonts")) {
  const link = document.createElement("link");
  link.id = "mc-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
}

const CSS = `
:root {
  --navy:#0B1E3D;
  --navy-2:#132952;
  --teal:#1ABFA1;
  --teal-dim:#12997f;
  --cream:#F7F9FC;
  --muted:#7A8BA8;
  --text:#1C2B45;
  --border:rgba(11,30,61,0.10);
  --danger:#E55A5A;
  --success:#1ABFA1;
}

.mcr * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.mcr {
  min-height: 100vh;
  font-family: 'DM Sans', sans-serif;
  background:
    radial-gradient(circle at 20% 20%, rgba(26,191,161,0.12), transparent 30%),
    linear-gradient(145deg, var(--navy), var(--navy-2));
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 42px 20px;
}

.mcr-card {
  width: 100%;
  max-width: 1050px;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 360px 1fr;
  box-shadow: 0 24px 80px rgba(0,0,0,0.28);
}

.mcr-left {
  background: linear-gradient(160deg, var(--navy), #1a3870);
  color: white;
  padding: 42px 34px;
  position: relative;
  overflow: hidden;
}

.mcr-left::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}

.mcr-brand,
.mcr-left-content {
  position: relative;
  z-index: 1;
}

.mcr-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 70px;
}

.mcr-brand-icon {
  width: 42px;
  height: 42px;
  background: var(--teal);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.mcr-brand-name {
  font-family: 'Playfair Display', serif;
  font-size: 21px;
  font-weight: 600;
}

.mcr-tag {
  display: inline-block;
  background: rgba(26,191,161,0.12);
  color: var(--teal);
  border: 1px solid rgba(26,191,161,0.28);
  border-radius: 999px;
  padding: 7px 14px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.mcr-left h1 {
  font-family: 'Playfair Display', serif;
  font-size: 34px;
  line-height: 1.15;
  margin-bottom: 18px;
}

.mcr-left p {
  color: rgba(255,255,255,0.58);
  line-height: 1.7;
  font-size: 14px;
}

.mcr-benefits {
  margin-top: 34px;
  display: grid;
  gap: 14px;
}

.mcr-benefit {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.10);
  padding: 14px;
  border-radius: 14px;
  font-size: 13px;
  color: rgba(255,255,255,0.82);
}

.mcr-right {
  padding: 42px;
}

.mcr-top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
}

.mcr-form-tag {
  font-size: 11px;
  font-weight: 700;
  color: var(--teal);
  letter-spacing: .14em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.mcr-title {
  font-family: 'Playfair Display', serif;
  color: var(--navy);
  font-size: 30px;
  line-height: 1.15;
}

.mcr-sub {
  color: var(--muted);
  font-size: 14px;
  margin-top: 8px;
}

.mcr-back {
  color: var(--muted);
  text-decoration: none;
  font-size: 13px;
  white-space: nowrap;
}

.mcr-back:hover {
  color: var(--teal);
}

.mcr-alert {
  padding: 13px 15px;
  border-radius: 12px;
  margin-bottom: 18px;
  font-size: 13px;
}

.mcr-alert.error {
  background: rgba(229,90,90,0.10);
  color: var(--danger);
  border: 1px solid rgba(229,90,90,0.25);
}

.mcr-alert.success {
  background: rgba(26,191,161,0.10);
  color: var(--success);
  border: 1px solid rgba(26,191,161,0.25);
}

.mcr-section-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--navy);
  margin: 26px 0 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
}

.mcr-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.mcr-field.full {
  grid-column: 1 / -1;
}

.mcr-label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: .06em;
  text-transform: uppercase;
  margin-bottom: 7px;
}

.mcr-input,
.mcr-select,
.mcr-textarea {
  width: 100%;
  border: 1.5px solid var(--border);
  background: var(--cream);
  border-radius: 12px;
  padding: 13px 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  color: var(--text);
  outline: none;
  transition: .2s;
}

.mcr-input:focus,
.mcr-select:focus,
.mcr-textarea:focus {
  background: white;
  border-color: var(--teal);
  box-shadow: 0 0 0 4px rgba(26,191,161,0.10);
}

.mcr-textarea {
  min-height: 86px;
  resize: vertical;
}

.mcr-help {
  display: block;
  margin-top: 6px;
  color: var(--muted);
  font-size: 11.5px;
}

.mcr-error-text {
  display: block;
  margin-top: 6px;
  color: var(--danger);
  font-size: 11.5px;
}

.mcr-actions {
  display: flex;
  gap: 14px;
  margin-top: 28px;
}

.mcr-btn {
  height: 50px;
  border-radius: 12px;
  border: none;
  padding: 0 22px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
  cursor: pointer;
}

.mcr-btn-primary {
  flex: 1;
  background: var(--navy);
  color: white;
}

.mcr-btn-primary:hover {
  background: var(--navy-2);
}

.mcr-btn-primary:disabled {
  opacity: .65;
  cursor: not-allowed;
}

.mcr-btn-secondary {
  background: white;
  color: var(--navy);
  border: 1.5px solid var(--border);
}

.mcr-btn-secondary:hover {
  border-color: var(--teal);
  color: var(--teal);
}

@media (max-width: 900px) {
  .mcr-card {
    grid-template-columns: 1fr;
  }

  .mcr-left {
    display: none;
  }

  .mcr-right {
    padding: 32px 22px;
  }

  .mcr-grid {
    grid-template-columns: 1fr;
  }

  .mcr-top {
    flex-direction: column;
  }

  .mcr-actions {
    flex-direction: column;
  }
}
`;

function RegistroPaciente() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "+51",
    correo: "",
    direccion: "",
    fechaNacimiento: "",
    sexo: "",
    tipoSangre: "",
    alergias: "",
    contactoEmergencia: "",
    telefonoEmergencia: "+51",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [errores, setErrores] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tag = document.createElement("style");
    tag.id = "mc-registro-paciente-styles";
    tag.textContent = CSS;

    if (!document.getElementById("mc-registro-paciente-styles")) {
      document.head.appendChild(tag);
    }

    return () => tag.remove();
  }, []);

  const soloLetras = (valor) =>
    valor.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");

  const limpiarTelefono = (valor) => {
    let numeros = valor.replace(/\D/g, "");

    if (numeros.startsWith("51")) {
      numeros = numeros.substring(2);
    }

    numeros = numeros.substring(0, 9);
    return "+51" + numeros;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let nuevoValor = value;

    if (name === "dni") {
      nuevoValor = value.replace(/\D/g, "").substring(0, 8);
    }

    if (name === "telefono" || name === "telefonoEmergencia") {
      nuevoValor = limpiarTelefono(value);
    }

    if (name === "nombre" || name === "apellido" || name === "contactoEmergencia") {
      nuevoValor = soloLetras(value);
    }

    setForm({
      ...form,
      [name]: nuevoValor,
    });

    setErrores({
      ...errores,
      [name]: "",
    });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!form.username.trim()) nuevosErrores.username = "El usuario es obligatorio.";
    if (form.password.length < 6) nuevosErrores.password = "La contraseña debe tener mínimo 6 caracteres.";
    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!form.apellido.trim()) nuevosErrores.apellido = "El apellido es obligatorio.";

    if (!/^\d{8}$/.test(form.dni)) {
      nuevosErrores.dni = "El DNI debe tener exactamente 8 dígitos.";
    }

    if (!/^\+51\d{9}$/.test(form.telefono)) {
      nuevosErrores.telefono = "El teléfono debe iniciar con +51 y tener 9 dígitos.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      nuevosErrores.correo = "Ingrese un correo válido.";
    }

    if (!form.fechaNacimiento) {
      nuevosErrores.fechaNacimiento = "La fecha de nacimiento es obligatoria.";
    }

    if (!form.sexo) {
      nuevosErrores.sexo = "Seleccione el sexo.";
    }

    if (form.telefonoEmergencia !== "+51" && !/^\+51\d{9}$/.test(form.telefonoEmergencia)) {
      nuevosErrores.telefonoEmergencia = "El teléfono de emergencia debe iniciar con +51 y tener 9 dígitos.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    if (!validarFormulario()) {
      setError("Revisa los campos marcados antes de continuar.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...form,
        telefonoEmergencia:
          form.telefonoEmergencia === "+51" ? "" : form.telefonoEmergencia,
      };

      const response = await API.post("/auth/register-paciente", payload);

      const { token, username, rol, pacienteId } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("rol", rol);
      localStorage.setItem("pacienteId", pacienteId ?? "");

      setMensaje("Paciente registrado correctamente. Redirigiendo...");

      setTimeout(() => {
        navigate("/paciente");
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        err.response?.data?.mensaje ||
        "Error al registrar paciente. Verifica que el DNI, usuario o correo no estén registrados."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mcr">
      <div className="mcr-card">
        <aside className="mcr-left">
          <div className="mcr-brand">
            <div className="mcr-brand-icon">+</div>
            <span className="mcr-brand-name">MediControl</span>
          </div>

          <div className="mcr-left-content">
            <span className="mcr-tag">Nuevo paciente</span>
            <h1>Registra tu cuenta médica</h1>
            <p>
              Crea tu perfil para solicitar citas, revisar tu información médica
              y acceder a los servicios de MediControl.
            </p>

            <div className="mcr-benefits">
              <div className="mcr-benefit">✓ Registro seguro como paciente</div>
              <div className="mcr-benefit">✓ Acceso a tus citas médicas</div>
              <div className="mcr-benefit">✓ Datos protegidos y organizados</div>
            </div>
          </div>
        </aside>

        <main className="mcr-right">
          <div className="mcr-top">
            <div>
              <div className="mcr-form-tag">Registro de paciente</div>
              <h2 className="mcr-title">Crear cuenta</h2>
              <p className="mcr-sub">
                Completa tus datos para ingresar al portal.
              </p>
            </div>

            <a className="mcr-back" href="/login">
              ← Ya tengo cuenta
            </a>
          </div>

          {mensaje && <div className="mcr-alert success">{mensaje}</div>}
          {error && <div className="mcr-alert error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <h3 className="mcr-section-title">Datos de acceso</h3>

            <div className="mcr-grid">
              <div className="mcr-field">
                <label className="mcr-label">Usuario</label>
                <input
                  className="mcr-input"
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Ejemplo: gonzalo123"
                />
                <small className="mcr-help">Ejemplo: paciente001</small>
                {errores.username && <small className="mcr-error-text">{errores.username}</small>}
              </div>

              <div className="mcr-field">
                <label className="mcr-label">Contraseña</label>
                <input
                  className="mcr-input"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                />
                <small className="mcr-help">Ejemplo: Paciente123</small>
                {errores.password && <small className="mcr-error-text">{errores.password}</small>}
              </div>
            </div>

            <h3 className="mcr-section-title">Datos personales</h3>

            <div className="mcr-grid">
              <div className="mcr-field">
                <label className="mcr-label">Nombre</label>
                <input
                  className="mcr-input"
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ejemplo: Gonzalo"
                />
                {errores.nombre && <small className="mcr-error-text">{errores.nombre}</small>}
              </div>

              <div className="mcr-field">
                <label className="mcr-label">Apellido</label>
                <input
                  className="mcr-input"
                  type="text"
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  placeholder="Ejemplo: Zavala"
                />
                {errores.apellido && <small className="mcr-error-text">{errores.apellido}</small>}
              </div>

              <div className="mcr-field">
                <label className="mcr-label">DNI</label>
                <input
                  className="mcr-input"
                  type="text"
                  name="dni"
                  value={form.dni}
                  onChange={handleChange}
                  placeholder="Ejemplo: 12345678"
                  maxLength="8"
                />
                <small className="mcr-help">Debe tener exactamente 8 dígitos.</small>
                {errores.dni && <small className="mcr-error-text">{errores.dni}</small>}
              </div>

              <div className="mcr-field">
                <label className="mcr-label">Teléfono</label>
                <input
                  className="mcr-input"
                  type="text"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="+51987654321"
                  maxLength="12"
                />
                <small className="mcr-help">Formato: +51 + 9 dígitos.</small>
                {errores.telefono && <small className="mcr-error-text">{errores.telefono}</small>}
              </div>

              <div className="mcr-field">
                <label className="mcr-label">Correo</label>
                <input
                  className="mcr-input"
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                />
                {errores.correo && <small className="mcr-error-text">{errores.correo}</small>}
              </div>

              <div className="mcr-field">
                <label className="mcr-label">Fecha de nacimiento</label>
                <input
                  className="mcr-input"
                  type="date"
                  name="fechaNacimiento"
                  value={form.fechaNacimiento}
                  onChange={handleChange}
                />
                {errores.fechaNacimiento && <small className="mcr-error-text">{errores.fechaNacimiento}</small>}
              </div>

              <div className="mcr-field">
                <label className="mcr-label">Sexo</label>
                <select
                  className="mcr-select"
                  name="sexo"
                  value={form.sexo}
                  onChange={handleChange}
                >
                  <option value="">Seleccione</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
                {errores.sexo && <small className="mcr-error-text">{errores.sexo}</small>}
              </div>

              <div className="mcr-field">
                <label className="mcr-label">Tipo de sangre</label>
                <select
                  className="mcr-select"
                  name="tipoSangre"
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

              <div className="mcr-field full">
                <label className="mcr-label">Dirección</label>
                <input
                  className="mcr-input"
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  placeholder="Ejemplo: Av. Lima 123, San Miguel"
                />
              </div>
            </div>

            <h3 className="mcr-section-title">Información médica y emergencia</h3>

            <div className="mcr-grid">
              <div className="mcr-field full">
                <label className="mcr-label">Alergias</label>
                <textarea
                  className="mcr-textarea"
                  name="alergias"
                  value={form.alergias}
                  onChange={handleChange}
                  placeholder="Ejemplo: Penicilina, polvo, mariscos. Si no tiene, escriba: Ninguna"
                />
              </div>

              <div className="mcr-field">
                <label className="mcr-label">Contacto de emergencia</label>
                <input
                  className="mcr-input"
                  type="text"
                  name="contactoEmergencia"
                  value={form.contactoEmergencia}
                  onChange={handleChange}
                  placeholder="Ejemplo: María Zavala"
                />
              </div>

              <div className="mcr-field">
                <label className="mcr-label">Teléfono de emergencia</label>
                <input
                  className="mcr-input"
                  type="text"
                  name="telefonoEmergencia"
                  value={form.telefonoEmergencia}
                  onChange={handleChange}
                  placeholder="+51987654321"
                  maxLength="12"
                />
                <small className="mcr-help">Opcional. Formato: +51 + 9 dígitos.</small>
                {errores.telefonoEmergencia && (
                  <small className="mcr-error-text">{errores.telefonoEmergencia}</small>
                )}
              </div>
            </div>

            <div className="mcr-actions">
              <button
                type="button"
                className="mcr-btn mcr-btn-secondary"
                onClick={() => navigate("/login")}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="mcr-btn mcr-btn-primary"
                disabled={loading}
              >
                {loading ? "Registrando..." : "Crear cuenta de paciente"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default RegistroPaciente;