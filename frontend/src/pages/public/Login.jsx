import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosConfig";

/* ─── Google Fonts ─────────────────────────────────────────── */
if (!document.getElementById("mc-fonts")) {
  const link = document.createElement("link");
  link.id = "mc-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
}

const CSS = `
  :root {
    --navy:      #0B1E3D;
    --navy-2:    #132952;
    --navy-3:    #1a3870;
    --teal:      #1ABFA1;
    --teal-dim:  #12997f;
    --teal-pale: rgba(26,191,161,0.12);
    --cream:     #F7F9FC;
    --muted:     #7A8BA8;
    --text:      #1C2B45;
    --border:    rgba(11,30,61,0.1);
    --danger:    #E55A5A;
  }

  .mcl * { box-sizing: border-box; margin: 0; padding: 0; }

  .mcl {
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 480px;
    background: var(--navy);
  }

  /* ── LEFT PANEL ── */
  .mcl-left {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 56px;
  }

  .mcl-left-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 70% 60% at 15% 30%, rgba(26,191,161,0.13) 0%, transparent 55%),
      radial-gradient(ellipse 50% 40% at 85% 80%, rgba(26,191,161,0.08) 0%, transparent 50%),
      linear-gradient(160deg, var(--navy) 0%, var(--navy-2) 50%, var(--navy-3) 100%);
    pointer-events: none;
  }

  .mcl-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 52px 52px;
    pointer-events: none;
  }

  /* rotating rings */
  .mcl-ring-outer {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(26,191,161,0.12);
    pointer-events: none;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }

  .mcl-ring-outer-1 { width: 500px; height: 500px; animation: mcSpin 40s linear infinite; }
  .mcl-ring-outer-2 { width: 350px; height: 350px; animation: mcSpin 28s linear infinite reverse; border-color: rgba(26,191,161,0.18); }
  .mcl-ring-outer-3 { width: 200px; height: 200px; animation: mcSpin 18s linear infinite; border-color: rgba(26,191,161,0.25); }

  @keyframes mcSpin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
  @keyframes mcFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes mcPulseDot { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
  @keyframes mcShake { 0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)} }
  @keyframes mcFadeUp { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }

  .mcl-brand {
    display: flex; align-items: center; gap: 12px;
    position: relative; z-index: 1;
    animation: mcFadeUp 0.5s ease both;
  }

  .mcl-brand-icon {
    width: 42px; height: 42px;
    background: var(--teal);
    border-radius: 11px;
    display: flex; align-items: center; justify-content: center;
  }

  .mcl-brand-icon svg { width: 22px; height: 22px; fill: white; }

  .mcl-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 600; color: white;
  }

  /* central card */
  .mcl-center {
    flex: 1;
    display: flex; align-items: center; justify-content: center;
    position: relative; z-index: 1;
  }

  .mcl-info-card {
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 36px;
    width: 100%;
    max-width: 380px;
    animation: mcFadeUp 0.6s 0.15s ease both;
    opacity: 0;
    animation-fill-mode: both;
  }

  .mcl-card-tag {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--teal-pale);
    border: 1px solid rgba(26,191,161,0.25);
    border-radius: 20px; padding: 5px 14px;
    margin-bottom: 28px;
  }

  .mcl-card-tag span {
    font-size: 11px; font-weight: 600;
    color: var(--teal); letter-spacing: 0.08em;
  }

  .mcl-pulse-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--teal);
    animation: mcPulseDot 2s infinite;
    display: inline-block;
  }

  .mcl-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 24px; font-weight: 600; color: white;
    line-height: 1.25; margin-bottom: 8px;
  }

  .mcl-card-sub {
    font-size: 13px; color: rgba(255,255,255,0.4);
    line-height: 1.6; margin-bottom: 28px;
  }

  .mcl-stats-row {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 1px; background: rgba(255,255,255,0.07);
    border-radius: 12px; overflow: hidden; margin-bottom: 24px;
  }

  .mcl-stat-cell {
    background: rgba(255,255,255,0.03);
    padding: 16px 12px; text-align: center;
  }

  .mcl-stat-n {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-weight: 700; color: white;
  }

  .mcl-stat-n span { color: var(--teal); }
  .mcl-stat-l { font-size: 10px; color: rgba(255,255,255,0.35); margin-top: 3px; }

  /* floating pills */
  .mcl-pill {
    display: flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px; padding: 10px 14px;
    margin-bottom: 10px;
    animation: mcFloat 4s ease-in-out infinite;
  }

  .mcl-pill:last-child { margin-bottom: 0; animation-delay: 1.2s; }

  .mcl-pill-icon {
    width: 28px; height: 28px; border-radius: 7px;
    background: var(--teal-pale);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }

  .mcl-pill-icon svg { width: 14px; height: 14px; fill: var(--teal); }
  .mcl-pill-text { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.75); }
  .mcl-pill-sub  { font-size: 10px; color: rgba(255,255,255,0.35); }

  /* quote */
  .mcl-left-quote {
    position: relative; z-index: 1;
    animation: mcFadeUp 0.6s 0.3s ease both;
    opacity: 0; animation-fill-mode: both;
  }

  .mcl-quote-text {
    font-family: 'Playfair Display', serif;
    font-size: 16px; font-style: italic;
    color: rgba(255,255,255,0.5); line-height: 1.6; margin-bottom: 14px;
  }

  .mcl-quote-author { display: flex; align-items: center; gap: 10px; }
  .mcl-quote-line { width: 28px; height: 1px; background: var(--teal); }
  .mcl-quote-name { font-size: 11px; color: var(--teal); letter-spacing: 0.1em; font-weight: 600; text-transform: uppercase; }

  /* ── RIGHT PANEL ── */
  .mcl-right {
    background: white;
    display: flex; flex-direction: column; justify-content: center;
    padding: 60px 52px;
    position: relative;
    box-shadow: -24px 0 80px rgba(0,0,0,0.3);
    overflow: hidden;
  }

  .mcl-right::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, transparent, var(--teal), transparent);
  }

  .mcl-top-link {
    position: absolute; top: 28px; right: 32px;
    display: flex; align-items: center; gap: 6px;
    font-size: 13px; color: var(--muted);
    text-decoration: none; transition: color 0.15s;
    font-family: 'DM Sans', sans-serif;
  }

  .mcl-top-link:hover { color: var(--navy); }
  .mcl-top-link svg { width: 14px; height: 14px; fill: currentColor; }

  .mcl-form-tag {
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--teal); margin-bottom: 10px;
  }

  .mcl-form-title {
    font-family: 'Playfair Display', serif;
    font-size: 30px; font-weight: 600; color: var(--navy);
    line-height: 1.15; margin-bottom: 8px;
  }

  .mcl-form-sub { font-size: 14px; color: var(--muted); margin-bottom: 36px; }

  /* fields */
  .mcl-field { margin-bottom: 20px; }

  .mcl-label {
    display: block; font-size: 11px; font-weight: 600;
    color: var(--text); letter-spacing: 0.06em;
    text-transform: uppercase; margin-bottom: 8px;
  }

  .mcl-input-wrap { position: relative; }

  .mcl-input-icon {
    position: absolute; left: 16px; top: 50%;
    transform: translateY(-50%);
    width: 17px; height: 17px; fill: var(--muted);
    pointer-events: none; transition: fill 0.18s;
  }

  .mcl-input-wrap:focus-within .mcl-input-icon { fill: var(--teal); }

  .mcl-input {
    width: 100%; height: 52px;
    padding: 0 48px 0 46px;
    border: 1.5px solid var(--border);
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; color: var(--text);
    background: var(--cream); outline: none;
    transition: all 0.2s;
  }

  .mcl-input::placeholder { color: #b0bec5; }

  .mcl-input:focus {
    border-color: var(--teal);
    background: white;
    box-shadow: 0 0 0 4px rgba(26,191,161,0.1);
  }

  .mcl-eye-btn {
    position: absolute; right: 14px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    padding: 4px; display: flex; align-items: center;
  }

  .mcl-eye-btn svg { width: 17px; height: 17px; fill: var(--muted); transition: fill 0.15s; }
  .mcl-eye-btn:hover svg { fill: var(--navy); }

  .mcl-forgot { text-align: right; margin-top: 7px; }
  .mcl-forgot a { font-size: 12px; color: var(--teal); text-decoration: none; font-weight: 500; }
  .mcl-forgot a:hover { color: var(--teal-dim); }

  /* error */
  .mcl-error {
    display: flex; align-items: center; gap: 10px;
    background: rgba(229,90,90,0.08);
    border: 1px solid rgba(229,90,90,0.25);
    border-radius: 10px; padding: 12px 16px;
    margin-bottom: 20px; font-size: 13px; color: var(--danger);
    animation: mcShake 0.4s ease;
  }

  .mcl-error svg { width: 16px; height: 16px; fill: var(--danger); flex-shrink: 0; }

  /* submit */
  .mcl-submit {
    width: 100%; height: 52px;
    background: var(--navy); color: white; border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 600;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: all 0.2s; margin-top: 8px;
    position: relative; overflow: hidden;
  }

  .mcl-submit::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s;
  }

  .mcl-submit:hover { background: var(--navy-2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(11,30,61,0.25); }
  .mcl-submit:hover::after { transform: translateX(100%); }
  .mcl-submit:active { transform: translateY(0); }
  .mcl-submit:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
  .mcl-submit svg { width: 16px; height: 16px; fill: white; }

  .mcl-spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: mcSpin 0.7s linear infinite;
  }

  /* divider */
  .mcl-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 24px 0; color: var(--muted); font-size: 12px;
    font-family: 'DM Sans', sans-serif;
  }

  .mcl-divider::before, .mcl-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }

  .mcl-register { text-align: center; font-size: 14px; color: var(--muted); font-family: 'DM Sans', sans-serif; }
  .mcl-register a { color: var(--teal); font-weight: 600; text-decoration: none; }
  .mcl-register a:hover { color: var(--teal-dim); }

  /* trust bar */
  .mcl-trust {
    display: flex; align-items: center; justify-content: center; gap: 20px;
    margin-top: 36px; padding-top: 24px;
    border-top: 1px solid var(--border);
  }

  .mcl-trust-item {
    display: flex; align-items: center; gap: 6px;
    font-size: 11.5px; color: var(--muted);
    font-family: 'DM Sans', sans-serif;
  }

  .mcl-trust-item svg { width: 14px; height: 14px; fill: var(--teal); }

  @media (max-width: 820px) {
    .mcl { grid-template-columns: 1fr; }
    .mcl-left { display: none; }
    .mcl-right { padding: 48px 28px; }
  }
`;

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const tag = document.createElement("style");
    tag.id = "mc-login-styles";
    tag.textContent = CSS;
    if (!document.getElementById("mc-login-styles")) document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await API.post("/auth/login", form);
      const { token, username, rol, pacienteId } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("rol", rol);
      localStorage.setItem("pacienteId", pacienteId ?? "");
      if (rol === "PACIENTE") navigate("/paciente");
      else navigate("/dashboard");
    } catch (err) {
      setError("Usuario o contraseña incorrectos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mcl">

      {/* ── LEFT ── */}
      <div className="mcl-left">
        <div className="mcl-left-bg" />
        <div className="mcl-grid" />
        <div className="mcl-ring-outer mcl-ring-outer-1" />
        <div className="mcl-ring-outer mcl-ring-outer-2" />
        <div className="mcl-ring-outer mcl-ring-outer-3" />

        {/* brand */}
        <div className="mcl-brand">
          <div className="mcl-brand-icon">
            <svg viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
            </svg>
          </div>
          <span className="mcl-brand-name">MediControl</span>
        </div>

        {/* info card */}
        <div className="mcl-center">
          <div className="mcl-info-card">
            <div className="mcl-card-tag">
              <span className="mcl-pulse-dot" />
              <span>Sistema activo</span>
            </div>

            <h2 className="mcl-card-title">Tu salud,<br />en buenas manos</h2>
            <p className="mcl-card-sub">
              Accede a tu historial clínico, gestiona tus citas y mantente al tanto de tu salud desde cualquier lugar.
            </p>

            {/* stats */}
            <div className="mcl-stats-row">
              {[
                { n: "10", sup: "+", label: "Años" },
                { n: "40", sup: "+", label: "Médicos" },
                { n: "15", sup: "k", label: "Pacientes" },
              ].map(({ n, sup, label }) => (
                <div key={label} className="mcl-stat-cell">
                  <div className="mcl-stat-n">{n}<span>{sup}</span></div>
                  <div className="mcl-stat-l">{label}</div>
                </div>
              ))}
            </div>

            {/* pills */}
            {[
              {
                icon: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z",
                text: "Citas en línea", sub: "Agenda en segundos",
              },
              {
                icon: "M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z",
                text: "Historial médico", sub: "Siempre disponible",
              },
            ].map(({ icon, text, sub }) => (
              <div key={text} className="mcl-pill">
                <div className="mcl-pill-icon">
                  <svg viewBox="0 0 24 24"><path d={icon} /></svg>
                </div>
                <div>
                  <div className="mcl-pill-text">{text}</div>
                  <div className="mcl-pill-sub">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* quote */}
        <div className="mcl-left-quote">
          <p className="mcl-quote-text">"La medicina es el arte de mantener al paciente tranquilo mientras la naturaleza cura la enfermedad."</p>
          <div className="mcl-quote-author">
            <div className="mcl-quote-line" />
            <span className="mcl-quote-name">Voltaire</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div className="mcl-right">
        <a href="/" className="mcl-top-link">
          <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
          Volver al inicio
        </a>

        <div className="mcl-form-tag">Portal de acceso</div>
        <h1 className="mcl-form-title">Inicia sesión<br />en tu cuenta</h1>
        <p className="mcl-form-sub">Ingresa tus credenciales para continuar</p>

        {error && (
          <div className="mcl-error">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          {/* username */}
          <div className="mcl-field">
            <label className="mcl-label" htmlFor="mc-user">Usuario</label>
            <div className="mcl-input-wrap">
              <svg className="mcl-input-icon" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <input
                id="mc-user"
                className="mcl-input"
                type="text"
                name="username"
                placeholder="Tu nombre de usuario"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>
          </div>

          {/* password */}
          <div className="mcl-field">
            <label className="mcl-label" htmlFor="mc-pass">Contraseña</label>
            <div className="mcl-input-wrap">
              <svg className="mcl-input-icon" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
              <input
                id="mc-pass"
                className="mcl-input"
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="mcl-eye-btn"
                onClick={() => setShowPass(!showPass)}
                aria-label={showPass ? "Ocultar" : "Mostrar"}
              >
                {showPass ? (
                  <svg viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
                )}
              </button>
            </div>
            <div className="mcl-forgot">
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
          </div>

          <button className="mcl-submit" type="submit" disabled={loading}>
            {loading ? (
              <div className="mcl-spinner" />
            ) : (
              <>
                Ingresar a MediControl
                <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>
              </>
            )}
          </button>
        </form>

        <div className="mcl-divider">¿Eres nuevo aquí?</div>

        <div className="mcl-register">
          ¿No tienes cuenta?{" "}
          <a href="/registro-paciente">Regístrate gratis →</a>
        </div>

        <div className="mcl-trust">
          {[
            { path: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z", label: "Datos protegidos" },
            { path: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z", label: "Acceso seguro" },
            { path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z", label: "Soporte 24/7" },
          ].map(({ path, label }) => (
            <div key={label} className="mcl-trust-item">
              <svg viewBox="0 0 24 24"><path d={path} /></svg>
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Login;