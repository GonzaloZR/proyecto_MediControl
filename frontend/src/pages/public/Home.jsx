import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Google Fonts ───────────────────────────────────────────────── */
if (!document.getElementById("mc-fonts")) {
  const link = document.createElement("link");
  link.id = "mc-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
}

/* ─── Styles ─────────────────────────────────────────────────────── */
const CSS = `
  :root {
    --navy:      #0B1E3D;
    --navy-2:    #132952;
    --navy-3:    #1a3870;
    --teal:      #1ABFA1;
    --teal-dim:  #12997f;
    --teal-pale: rgba(26,191,161,0.12);
    --teal-glow: rgba(26,191,161,0.22);
    --cream:     #F7F9FC;
    --cream-2:   #EEF2F8;
    --muted:     #7A8BA8;
    --text:      #1C2B45;
    --border:    rgba(11,30,61,0.09);
    --white:     #ffffff;
    --danger:    #E55A5A;
    --shadow-sm: 0 2px 12px rgba(11,30,61,0.07);
    --shadow-md: 0 6px 32px rgba(11,30,61,0.11);
  }

  .mc-home * { box-sizing: border-box; margin: 0; padding: 0; }

  .mc-home {
    font-family: 'DM Sans', sans-serif;
    color: var(--text);
    background: var(--white);
    overflow-x: hidden;
  }

  /* ── NAVBAR ── */
  .mc-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(11,30,61,0.97);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.07);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5%;
    height: 68px;
  }

  .mc-nav-brand {
    display: flex; align-items: center; gap: 12px;
    text-decoration: none;
  }

  .mc-nav-icon {
    width: 36px; height: 36px;
    background: var(--teal);
    border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
  }

  .mc-nav-icon svg { width: 20px; height: 20px; fill: white; }

  .mc-nav-name {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 600;
    color: white; letter-spacing: 0.01em;
  }

  .mc-nav-links {
    display: flex; align-items: center; gap: 32px;
    list-style: none;
  }

  .mc-nav-links a {
    font-size: 13.5px; font-weight: 400;
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    transition: color 0.18s;
  }

  .mc-nav-links a:hover { color: var(--teal); }

  .mc-nav-cta {
    padding: 9px 22px;
    background: var(--teal);
    color: white !important;
    border-radius: 8px;
    font-weight: 600 !important;
    font-size: 13px !important;
    transition: background 0.18s !important;
  }

  .mc-nav-cta:hover { background: var(--teal-dim) !important; color: white !important; }

  /* ── HERO ── */
  .mc-hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 420px;
    padding-top: 68px;
    background: var(--navy);
    position: relative;
    overflow: hidden;
  }

  .mc-hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 70% at 20% 50%, rgba(26,191,161,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 40% 50% at 80% 20%, rgba(26,191,161,0.06) 0%, transparent 55%);
    pointer-events: none;
  }

  .mc-hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  .mc-hero-left {
    display: flex; flex-direction: column; justify-content: center;
    padding: 80px 5% 80px 8%;
    position: relative; z-index: 1;
  }

  .mc-hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--teal-pale);
    border: 1px solid rgba(26,191,161,0.3);
    color: var(--teal);
    font-size: 12px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 6px 14px; border-radius: 20px;
    margin-bottom: 28px;
    width: fit-content;
    animation: mcFadeUp 0.5s ease both;
  }

  .mc-hero-tag span {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--teal);
    animation: mcPulse 2s infinite;
  }

  .mc-hero-h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(38px, 5vw, 58px);
    font-weight: 600;
    color: white;
    line-height: 1.12;
    letter-spacing: -0.02em;
    margin-bottom: 24px;
    animation: mcFadeUp 0.55s 0.1s ease both;
    opacity: 0;
    animation-fill-mode: both;
  }

  .mc-hero-h1 em {
    font-style: italic;
    color: var(--teal);
  }

  .mc-hero-sub {
    font-size: 16px; font-weight: 300;
    color: rgba(255,255,255,0.55);
    line-height: 1.7;
    max-width: 480px;
    margin-bottom: 40px;
    animation: mcFadeUp 0.6s 0.2s ease both;
    opacity: 0;
    animation-fill-mode: both;
  }

  .mc-hero-stats {
    display: flex; gap: 36px;
    animation: mcFadeUp 0.65s 0.3s ease both;
    opacity: 0;
    animation-fill-mode: both;
  }

  .mc-stat { display: flex; flex-direction: column; gap: 4px; }
  .mc-stat-n {
    font-family: 'Playfair Display', serif;
    font-size: 28px; font-weight: 600; color: white;
  }
  .mc-stat-n span { color: var(--teal); }
  .mc-stat-l { font-size: 12px; color: rgba(255,255,255,0.4); letter-spacing: 0.05em; }

  .mc-stat-divider {
    width: 1px; background: rgba(255,255,255,0.1); align-self: stretch;
  }

  /* ── HERO RIGHT (LOGIN PANEL) ── */
  .mc-hero-right {
    background: var(--white);
    display: flex; flex-direction: column; justify-content: center;
    padding: 60px 48px;
    position: relative; z-index: 1;
    box-shadow: -20px 0 60px rgba(0,0,0,0.25);
  }

  .mc-panel-logo {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 40px;
  }

  .mc-panel-logo-dot {
    width: 10px; height: 10px; border-radius: 50%;
    background: var(--teal);
  }

  .mc-panel-logo-name {
    font-family: 'Playfair Display', serif;
    font-size: 14px; font-weight: 500;
    color: var(--muted);
    letter-spacing: 0.05em;
  }

  .mc-panel-title {
    font-family: 'Playfair Display', serif;
    font-size: 26px; font-weight: 600;
    color: var(--navy);
    margin-bottom: 8px;
    line-height: 1.2;
  }

  .mc-panel-sub {
    font-size: 13px; color: var(--muted);
    margin-bottom: 36px;
  }

  .mc-panel-btn {
    display: flex; align-items: center; justify-content: space-between;
    width: 100%; padding: 16px 20px;
    border-radius: 12px; border: none;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 600;
    transition: all 0.2s;
    text-decoration: none;
    margin-bottom: 14px;
  }

  .mc-btn-primary {
    background: var(--navy);
    color: white;
  }

  .mc-btn-primary:hover { background: var(--navy-2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(11,30,61,0.25); }

  .mc-btn-outline {
    background: white;
    color: var(--navy);
    border: 1.5px solid var(--border) !important;
  }

  .mc-btn-outline:hover { border-color: var(--teal) !important; color: var(--teal); transform: translateY(-2px); }

  .mc-btn-arrow {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .mc-btn-primary .mc-btn-arrow { background: rgba(255,255,255,0.15); }
  .mc-btn-outline .mc-btn-arrow { background: var(--cream); }

  .mc-panel-divider {
    display: flex; align-items: center; gap: 12px;
    margin: 20px 0;
    color: var(--muted); font-size: 12px;
  }

  .mc-panel-divider::before,
  .mc-panel-divider::after {
    content: '';
    flex: 1; height: 1px;
    background: var(--border);
  }

  .mc-panel-trust {
    display: flex; align-items: center; gap: 8px;
    margin-top: 32px; padding-top: 24px;
    border-top: 1px solid var(--border);
  }

  .mc-trust-icons { display: flex; }

  .mc-trust-dot {
    width: 28px; height: 28px; border-radius: 50%;
    border: 2px solid white;
    background: var(--teal-pale);
    display: flex; align-items: center; justify-content: center;
    margin-left: -8px;
    font-size: 11px; font-weight: 700;
    color: var(--teal-dim);
  }

  .mc-trust-dot:first-child { margin-left: 0; }

  .mc-trust-text { font-size: 11.5px; color: var(--muted); }
  .mc-trust-text strong { color: var(--text); font-weight: 600; }

  /* ── SECTION BASE ── */
  .mc-section {
    padding: 100px 8%;
  }

  .mc-section-label {
    display: inline-block;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--teal);
    margin-bottom: 14px;
  }

  .mc-section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(28px, 3vw, 40px);
    font-weight: 600; color: var(--navy);
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .mc-section-title em { font-style: italic; }

  /* ── ABOUT ── */
  .mc-about {
    background: var(--cream);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .mc-about-text p {
    font-size: 15px; line-height: 1.8;
    color: var(--muted);
    margin-top: 20px;
  }

  .mc-about-text p + p { margin-top: 14px; }

  .mc-about-values {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 16px; margin-top: 36px;
  }

  .mc-value-card {
    background: white;
    border-radius: 12px;
    border: 1px solid var(--border);
    padding: 20px;
    transition: box-shadow 0.2s, transform 0.2s;
  }

  .mc-value-card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }

  .mc-value-icon {
    width: 40px; height: 40px;
    background: var(--teal-pale);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 12px;
  }

  .mc-value-icon svg { width: 20px; height: 20px; fill: var(--teal); }

  .mc-value-name {
    font-weight: 600; font-size: 14px;
    color: var(--navy); margin-bottom: 4px;
  }

  .mc-value-desc { font-size: 12px; color: var(--muted); line-height: 1.5; }

  .mc-about-visual {
    position: relative;
  }

  .mc-about-img-wrap {
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-3) 100%);
    border-radius: 20px;
    overflow: hidden;
    aspect-ratio: 4/5;
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }

  .mc-about-img-wrap::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 70% 60% at 30% 40%, rgba(26,191,161,0.18) 0%, transparent 60%);
  }

  .mc-about-badge {
    position: absolute; bottom: -20px; left: -20px;
    background: white;
    border-radius: 14px;
    padding: 18px 22px;
    box-shadow: var(--shadow-md);
    display: flex; align-items: center; gap: 14px;
  }

  .mc-badge-n {
    font-family: 'Playfair Display', serif;
    font-size: 30px; font-weight: 700;
    color: var(--navy);
  }

  .mc-badge-n span { color: var(--teal); }
  .mc-badge-l { font-size: 12px; color: var(--muted); line-height: 1.4; }

  .mc-about-tag {
    position: absolute; top: -16px; right: 24px;
    background: var(--teal);
    color: white;
    font-size: 12px; font-weight: 600;
    padding: 8px 16px;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(26,191,161,0.4);
  }

  /* ── CAROUSEL (ESPECIALIDADES) ── */
  .mc-carousel-section {
    background: var(--white);
    overflow: hidden;
  }

  .mc-carousel-header {
    padding: 100px 8% 48px;
    display: flex; align-items: flex-end; justify-content: space-between;
  }

  .mc-carousel-controls {
    display: flex; gap: 10px;
  }

  .mc-carousel-btn {
    width: 44px; height: 44px;
    border-radius: 50%;
    border: 1.5px solid var(--border);
    background: white;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; color: var(--navy);
    transition: all 0.18s;
  }

  .mc-carousel-btn:hover {
    background: var(--navy); color: white; border-color: var(--navy);
  }

  .mc-carousel-track-wrap {
    padding-bottom: 80px;
    position: relative;
  }

  .mc-carousel-track {
    display: flex;
    gap: 20px;
    padding: 0 8% 20px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    scroll-behavior: smooth;
  }

  .mc-carousel-track::-webkit-scrollbar { display: none; }

  .mc-spec-card {
    flex: 0 0 260px;
    scroll-snap-align: start;
    background: var(--cream);
    border-radius: 16px;
    padding: 28px 24px;
    border: 1px solid var(--border);
    transition: all 0.22s;
    cursor: default;
    position: relative;
    overflow: hidden;
  }

  .mc-spec-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--teal);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.25s;
  }

  .mc-spec-card:hover { background: white; box-shadow: var(--shadow-md); transform: translateY(-4px); }
  .mc-spec-card:hover::before { transform: scaleX(1); }

  .mc-spec-icon {
    width: 52px; height: 52px;
    background: var(--navy);
    border-radius: 13px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px;
  }

  .mc-spec-icon svg { width: 26px; height: 26px; fill: var(--teal); }

  .mc-spec-name {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 600;
    color: var(--navy); margin-bottom: 10px;
  }

  .mc-spec-desc {
    font-size: 13px; color: var(--muted);
    line-height: 1.6;
  }

  .mc-spec-link {
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: 20px;
    font-size: 13px; font-weight: 600;
    color: var(--teal);
    text-decoration: none;
  }

  .mc-spec-link svg { width: 14px; height: 14px; fill: var(--teal); transition: transform 0.15s; }
  .mc-spec-card:hover .mc-spec-link svg { transform: translateX(3px); }

  /* ── PROCESS ── */
  .mc-process {
    background: var(--navy);
    padding: 100px 8%;
    position: relative;
    overflow: hidden;
  }

  .mc-process::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 50% 80% at 80% 50%, rgba(26,191,161,0.08) 0%, transparent 60%);
    pointer-events: none;
  }

  .mc-process .mc-section-label { color: var(--teal); }
  .mc-process .mc-section-title { color: white; margin-bottom: 60px; }

  .mc-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
    position: relative;
    z-index: 1;
  }

  .mc-steps::before {
    content: '';
    position: absolute;
    top: 28px; left: calc(25% / 2);
    right: calc(25% / 2);
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(26,191,161,0.4), rgba(26,191,161,0.4), transparent);
  }

  .mc-step { text-align: center; }

  .mc-step-num {
    width: 56px; height: 56px;
    border-radius: 50%;
    background: var(--teal-pale);
    border: 1px solid rgba(26,191,161,0.3);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px;
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 600;
    color: var(--teal);
    position: relative; z-index: 1;
  }

  .mc-step-title {
    font-weight: 600; font-size: 15px;
    color: white; margin-bottom: 8px;
  }

  .mc-step-desc { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.6; }

  /* ── TESTIMONIALS ── */
  .mc-testimonials {
    background: var(--cream);
    padding: 100px 8%;
  }

  .mc-testimonials-header {
    text-align: center; margin-bottom: 56px;
  }

  .mc-testi-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .mc-testi-card {
    background: white;
    border-radius: 16px;
    border: 1px solid var(--border);
    padding: 28px;
    transition: box-shadow 0.2s;
  }

  .mc-testi-card:hover { box-shadow: var(--shadow-md); }

  .mc-testi-stars {
    display: flex; gap: 3px; margin-bottom: 16px;
  }

  .mc-star { color: #f4b942; font-size: 14px; }

  .mc-testi-text {
    font-size: 14px; line-height: 1.75;
    color: var(--text); margin-bottom: 20px;
    font-style: italic;
  }

  .mc-testi-author {
    display: flex; align-items: center; gap: 12px;
    padding-top: 16px; border-top: 1px solid var(--border);
  }

  .mc-testi-avatar {
    width: 38px; height: 38px; border-radius: 50%;
    background: linear-gradient(135deg, var(--navy) 0%, var(--navy-3) 100%);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; color: white;
    flex-shrink: 0;
  }

  .mc-testi-name { font-weight: 600; font-size: 13.5px; color: var(--navy); }
  .mc-testi-role { font-size: 11.5px; color: var(--muted); }

  /* ── FOOTER ── */
  .mc-footer {
    background: var(--navy);
    padding: 60px 8% 32px;
    position: relative; overflow: hidden;
  }

  .mc-footer::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 40% 60% at 90% 20%, rgba(26,191,161,0.07) 0%, transparent 60%);
    pointer-events: none;
  }

  .mc-footer-top {
    display: flex; justify-content: space-between; gap: 60px;
    padding-bottom: 48px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    margin-bottom: 32px;
  }

  .mc-footer-brand { max-width: 300px; }

  .mc-footer-brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-weight: 600;
    color: white; margin-bottom: 12px;
  }

  .mc-footer-brand p {
    font-size: 13px; color: rgba(255,255,255,0.4);
    line-height: 1.7;
  }

  .mc-footer-col h5 {
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--teal); margin-bottom: 18px;
  }

  .mc-footer-col ul { list-style: none; }
  .mc-footer-col ul li { margin-bottom: 10px; }
  .mc-footer-col ul li a {
    font-size: 13.5px; color: rgba(255,255,255,0.45);
    text-decoration: none; transition: color 0.15s;
  }

  .mc-footer-col ul li a:hover { color: var(--teal); }

  .mc-footer-bottom {
    display: flex; justify-content: space-between; align-items: center;
  }

  .mc-footer-copy {
    font-size: 12px; color: rgba(255,255,255,0.25);
  }

  .mc-footer-teal { color: var(--teal); }

  /* ── ANIMATIONS ── */
  @keyframes mcFadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes mcPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  @keyframes mcFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .mc-float { animation: mcFloat 4s ease-in-out infinite; }

  /* scroll-reveal */
  .mc-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }

  .mc-reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .mc-hero { grid-template-columns: 1fr; min-height: auto; }
    .mc-hero-right { padding: 48px 5%; }
    .mc-about { grid-template-columns: 1fr; }
    .mc-about-visual { display: none; }
    .mc-steps { grid-template-columns: repeat(2, 1fr); }
    .mc-testi-grid { grid-template-columns: 1fr; }
    .mc-footer-top { flex-direction: column; gap: 32px; }
    .mc-nav-links { display: none; }
    .mc-carousel-header { flex-direction: column; align-items: flex-start; gap: 20px; }
  }
`;

/* ─── Data ───────────────────────────────────────────────────────── */
const ESPECIALIDADES = [
  {
    name: "Medicina General",
    desc: "Atención primaria integral para adultos y niños. Control preventivo y manejo de enfermedades agudas.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" /></svg>
    ),
  },
  {
    name: "Cardiología",
    desc: "Diagnóstico y tratamiento de enfermedades cardiovasculares con tecnología de última generación.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
    ),
  },
  {
    name: "Pediatría",
    desc: "Cuidado especializado para bebés, niños y adolescentes en cada etapa de su desarrollo.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 2a5 5 0 100 10A5 5 0 0012 2zm-7 20v-1c0-3.87 3.13-7 7-7s7 3.13 7 7v1H5z" /></svg>
    ),
  },
  {
    name: "Traumatología",
    desc: "Tratamiento de lesiones musculoesqueléticas, fracturas y patologías ortopédicas.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z" /></svg>
    ),
  },
  {
    name: "Ginecología",
    desc: "Salud femenina integral, control prenatal y procedimientos ginecológicos de alta complejidad.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 3.19 1.98 5.93 4.8 7.11L9 22h2l.5-2h1l.5 2h2l-.8-5.89C16.02 14.93 18 12.19 18 9c0-3.87-3.13-7-6-7zm0 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z" /></svg>
    ),
  },
  {
    name: "Dermatología",
    desc: "Diagnóstico y tratamiento de afecciones de la piel, cabello y uñas con enfoque dermatoscópico.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3z" /></svg>
    ),
  },
  {
    name: "Neurología",
    desc: "Evaluación y tratamiento de trastornos del sistema nervioso central y periférico.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-1v-1h1v1zm0-3h-1c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-1c0-1.65 1.35-3 3-3s3 1.35 3 3c0 2.5-3 2.75-3 5z" /></svg>
    ),
  },
  {
    name: "Laboratorio",
    desc: "Análisis clínicos, exámenes de sangre, orina y cultivos con resultados en tiempo real.",
    icon: (
      <svg viewBox="0 0 24 24"><path d="M19.8 18.4L14 10.67V6.5l1.35-1.69c.26-.33.03-.81-.39-.81H9.04c-.42 0-.65.48-.39.81L10 6.5v4.17L4.2 18.4c-.49.66-.02 1.6.8 1.6h14c.82 0 1.29-.94.8-1.6z" /></svg>
    ),
  },
];

const TESTIMONIALS = [
  {
    text: "Desde que uso MediControl, gestionar mis citas es rapidísimo. El personal es muy atento y los médicos son excelentes.",
    name: "Patricia R.",
    role: "Paciente desde 2022",
    initials: "PR",
  },
  {
    text: "Me operé de la rodilla aquí y la recuperación fue increíble. El seguimiento post-operatorio fue impecable y muy personalizado.",
    name: "Carlos M.",
    role: "Paciente de Traumatología",
    initials: "CM",
  },
  {
    text: "La mejor clínica donde he llevado a mis hijos. Los pediatras son muy cálidos y la plataforma digital facilita todo el proceso.",
    name: "Ana Lucía V.",
    role: "Madre de pacientes",
    initials: "AV",
  },
];

/* ─── Component ──────────────────────────────────────────────────── */
function Home() {
  const navigate = useNavigate();
  const trackRef = useRef(null);

  /* inject styles */
  useEffect(() => {
    const tag = document.createElement("style");
    tag.id = "mc-home-styles";
    tag.textContent = CSS;
    if (!document.getElementById("mc-home-styles")) document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  /* scroll reveal */
  useEffect(() => {
    const els = document.querySelectorAll(".mc-reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* carousel */
  const slide = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 280, behavior: "smooth" });
  };

  return (
    <div className="mc-home">

      {/* ── NAV ── */}
      <nav className="mc-nav">
        <a className="mc-nav-brand" href="/">
          <div className="mc-nav-icon">
            <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" /></svg>
          </div>
          <span className="mc-nav-name">MediControl</span>
        </a>
        <ul className="mc-nav-links">
          <li><a href="#especialidades">Especialidades</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#proceso">¿Cómo funciona?</a></li>
          <li><a href="/login" className="mc-nav-cta">Iniciar sesión</a></li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="mc-hero">
        <div className="mc-hero-grid" />

        <div className="mc-hero-left">
          <div className="mc-hero-tag">
            <span /> Clínica digital de confianza
          </div>

          <h1 className="mc-hero-h1">
            Tu salud, <em>nuestra</em><br />
            prioridad absoluta
          </h1>

          <p className="mc-hero-sub">
            En MediControl combinamos experiencia médica de primer nivel con tecnología moderna para brindarte una atención rápida, personalizada y humana.
          </p>

          <div className="mc-hero-stats">
            <div className="mc-stat">
              <span className="mc-stat-n">10<span>+</span></span>
              <span className="mc-stat-l">Años de trayectoria</span>
            </div>
            <div className="mc-stat-divider" />
            <div className="mc-stat">
              <span className="mc-stat-n">40<span>+</span></span>
              <span className="mc-stat-l">Especialistas</span>
            </div>
            <div className="mc-stat-divider" />
            <div className="mc-stat">
              <span className="mc-stat-n">15<span>k</span></span>
              <span className="mc-stat-l">Pacientes atendidos</span>
            </div>
          </div>
        </div>

        {/* LOGIN PANEL */}
        <div className="mc-hero-right">
          <div className="mc-panel-logo">
            <div className="mc-panel-logo-dot" />
            <span className="mc-panel-logo-name">Portal de Acceso — MediControl</span>
          </div>

          <h2 className="mc-panel-title">Bienvenido de nuevo</h2>
          <p className="mc-panel-sub">Accede a tu historial, citas y mucho más</p>

          <a href="/login" className="mc-panel-btn mc-btn-primary" style={{ display: "flex" }}>
            <span>Iniciar sesión</span>
            <div className="mc-btn-arrow">→</div>
          </a>

          <div className="mc-panel-divider">o</div>

          <a href="/registro-paciente" className="mc-panel-btn mc-btn-outline" style={{ display: "flex", border: "1.5px solid rgba(11,30,61,0.09)" }}>
            <span>Crear una cuenta</span>
            <div className="mc-btn-arrow">→</div>
          </a>

          <div className="mc-panel-trust">
            <div className="mc-trust-icons">
              {["JP", "ML", "AR", "KV"].map((i) => (
                <div key={i} className="mc-trust-dot">{i}</div>
              ))}
            </div>
            <p className="mc-trust-text">
              <strong>+15,000 pacientes</strong> ya confían en MediControl
            </p>
          </div>
        </div>
      </section>

      {/* ── ESPECIALIDADES (CAROUSEL) ── */}
      <section className="mc-carousel-section" id="especialidades">
        <div className="mc-carousel-header mc-reveal">
          <div>
            <span className="mc-section-label">Nuestros servicios</span>
            <h2 className="mc-section-title">
              Especialidades<br /><em>médicas</em>
            </h2>
          </div>
          <div className="mc-carousel-controls">
            <button className="mc-carousel-btn" onClick={() => slide(-1)} aria-label="Anterior">←</button>
            <button className="mc-carousel-btn" onClick={() => slide(1)} aria-label="Siguiente">→</button>
          </div>
        </div>

        <div className="mc-carousel-track-wrap">
          <div className="mc-carousel-track" ref={trackRef}>
            {ESPECIALIDADES.map((esp) => (
              <div key={esp.name} className="mc-spec-card">
                <div className="mc-spec-icon">{esp.icon}</div>
                <div className="mc-spec-name">{esp.name}</div>
                <p className="mc-spec-desc">{esp.desc}</p>
                <a href="/login" className="mc-spec-link">
                  Solicitar cita
                  <svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOBRE NOSOTROS ── */}
      <section className="mc-section mc-about" id="nosotros">
        <div className="mc-about-text mc-reveal">
          <span className="mc-section-label">Nuestra historia</span>
          <h2 className="mc-section-title">
            Más de una década<br />cuidando <em>vidas</em>
          </h2>
          <p>
            MediControl nació en 2013 con una misión clara: democratizar el acceso a servicios médicos de calidad. Fundada por un grupo de médicos comprometidos con la excelencia, comenzamos como una pequeña consulta multidisciplinaria.
          </p>
          <p>
            Hoy somos una institución de salud integral con más de 40 especialistas, infraestructura de última tecnología y un sistema digital que simplifica cada paso de la experiencia del paciente — desde agendar una cita hasta revisar resultados de laboratorio.
          </p>
          <p>
            Creemos que la salud no es un privilegio: es un derecho. Y trabajamos cada día para hacerla más accesible, más humana y más eficiente.
          </p>

          <div className="mc-about-values">
            {[
              { name: "Excelencia médica", desc: "Estándares internacionales en cada diagnóstico y tratamiento.", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" },
              { name: "Trato humano", desc: "Cada paciente es único y merece atención personalizada.", icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" },
              { name: "Innovación digital", desc: "Tecnología al servicio de una mejor experiencia clínica.", icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-9 3h2v2h-2V7zm0 4h2v6h-2v-6zm-4-4h2v8H7V7zm8 8h2V7h-2v8z" },
              { name: "Confidencialidad", desc: "Tu información médica está protegida y es completamente privada.", icon: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" },
            ].map((v) => (
              <div key={v.name} className="mc-value-card">
                <div className="mc-value-icon">
                  <svg viewBox="0 0 24 24"><path d={v.icon} /></svg>
                </div>
                <div className="mc-value-name">{v.name}</div>
                <p className="mc-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual decorativo */}
        {/* ── REEMPLAZA ESTE BLOQUE en Home.jsx ── */}
        {/* Busca <div className="mc-about-visual mc-reveal"> y sustituye todo el bloque */}

        <div className="mc-about-visual mc-reveal">

          {/* tarjeta principal con métricas */}
          <div style={{
            background: "linear-gradient(145deg, var(--navy) 0%, var(--navy-2) 100%)",
            borderRadius: "24px",
            padding: "40px 36px",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 24px 64px rgba(11,30,61,0.3)",
          }}>

            {/* fondo decorativo */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(26,191,161,0.15) 0%, transparent 60%)",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute",
              width: "200px", height: "200px",
              borderRadius: "50%",
              border: "1px solid rgba(26,191,161,0.1)",
              bottom: "-60px", right: "-60px",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute",
              width: "120px", height: "120px",
              borderRadius: "50%",
              border: "1px solid rgba(26,191,161,0.08)",
              top: "20px", right: "20px",
              pointerEvents: "none",
            }} />

            {/* tag superior */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "rgba(26,191,161,0.12)",
              border: "1px solid rgba(26,191,161,0.25)",
              borderRadius: "20px", padding: "5px 14px",
              marginBottom: "32px",
            }}>
              <span style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "var(--teal)",
                animation: "mcPulse 2s infinite",
                display: "inline-block",
              }} />
              <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--teal)", letterSpacing: "0.08em" }}>
                Desde 2013
              </span>
            </div>

            {/* stat grande */}
            <div style={{ marginBottom: "32px", position: "relative", zIndex: 1 }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "58px", fontWeight: 700,
                color: "white", lineHeight: 1,
                marginBottom: "6px",
              }}>
                98<span style={{ color: "var(--teal)", fontSize: "36px" }}>%</span>
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", letterSpacing: "0.04em" }}>
                Tasa de satisfacción de pacientes
              </div>
            </div>

            {/* barra de progreso */}
            <div style={{
              background: "rgba(255,255,255,0.07)",
              borderRadius: "4px", height: "6px",
              marginBottom: "36px", overflow: "hidden",
              position: "relative", zIndex: 1,
            }}>
              <div style={{
                width: "98%", height: "100%",
                background: "linear-gradient(90deg, var(--teal), #0e9a82)",
                borderRadius: "4px",
                boxShadow: "0 0 12px rgba(26,191,161,0.5)",
              }} />
            </div>

            {/* grid de mini stats */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "14px", position: "relative", zIndex: 1,
            }}>
              {[
                { n: "40+", label: "Especialistas", icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" },
                { n: "15k+", label: "Pacientes", icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" },
                { n: "8", label: "Especialidades", icon: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" },
                { n: "24/7", label: "Disponibilidad", icon: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" },
              ].map(({ n, label, icon }) => (
                <div key={label} style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "12px", padding: "16px",
                  transition: "background 0.2s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <div style={{
                      width: "28px", height: "28px",
                      background: "var(--teal-pale)", borderRadius: "7px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg viewBox="0 0 24 24" width="15" height="15" style={{ fill: "var(--teal)" }}>
                        <path d={icon} />
                      </svg>
                    </div>
                  </div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "22px", fontWeight: 700,
                    color: "white", lineHeight: 1, marginBottom: "3px",
                  }}>{n}</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.04em" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* badge inferior */}
            <div style={{
              marginTop: "20px", paddingTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              display: "flex", alignItems: "center", gap: "10px",
              position: "relative", zIndex: 1,
            }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "50%",
                background: "var(--teal)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg viewBox="0 0 24 24" width="18" height="18" style={{ fill: "white" }}>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>Certificados internacionalmente</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>ISO 9001 · Acreditación JCI</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="mc-process" id="proceso">
        <div style={{ textAlign: "center" }}>
          <span className="mc-section-label">Proceso simple</span>
          <h2 className="mc-section-title" style={{ color: "white" }}>
            ¿Cómo <em>funciona</em>?
          </h2>
        </div>

        <div style={{ marginTop: "60px" }}>
          <div className="mc-steps">
            {[
              { n: "01", title: "Crea tu cuenta", desc: "Regístrate en menos de 2 minutos con tus datos básicos." },
              { n: "02", title: "Elige especialidad", desc: "Selecciona la especialidad y el médico que necesitas." },
              { n: "03", title: "Agenda tu cita", desc: "Escoge la fecha y hora disponible que más te convenga." },
              { n: "04", title: "Asiste y sana", desc: "Recibe tu atención y accede a tu historial en línea." },
            ].map((s) => (
              <div key={s.n} className="mc-step mc-reveal">
                <div className="mc-step-num">{s.n}</div>
                <div className="mc-step-title">{s.title}</div>
                <p className="mc-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section className="mc-testimonials">
        <div className="mc-testimonials-header mc-reveal">
          <span className="mc-section-label">Testimonios</span>
          <h2 className="mc-section-title">
            Lo que dicen<br />nuestros <em>pacientes</em>
          </h2>
        </div>
        <div className="mc-testi-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="mc-testi-card mc-reveal">
              <div className="mc-testi-stars">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="mc-star">{s}</span>
                ))}
              </div>
              <p className="mc-testi-text">"{t.text}"</p>
              <div className="mc-testi-author">
                <div className="mc-testi-avatar">{t.initials}</div>
                <div>
                  <div className="mc-testi-name">{t.name}</div>
                  <div className="mc-testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="mc-footer">
        <div className="mc-footer-top">
          <div className="mc-footer-brand">
            <div className="mc-footer-brand-name">MediControl</div>
            <p>Tu salud es nuestra misión. Atención médica integral, digital y humana para toda la familia.</p>
          </div>
          <div className="mc-footer-col">
            <h5>Servicios</h5>
            <ul>
              {["Medicina General", "Cardiología", "Pediatría", "Traumatología", "Laboratorio"].map((s) => (
                <li key={s}><a href="/login">{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="mc-footer-col">
            <h5>Institución</h5>
            <ul>
              {["Sobre nosotros", "Nuestro equipo", "Certificaciones", "Trabaja con nosotros"].map((s) => (
                <li key={s}><a href="#">{s}</a></li>
              ))}
            </ul>
          </div>
          <div className="mc-footer-col">
            <h5>Contacto</h5>
            <ul>
              <li><a href="#">📍 Lima, Perú</a></li>
              <li><a href="#">📞 (01) 123-4567</a></li>
              <li><a href="#">✉️ info@medicontrol.pe</a></li>
              <li><a href="#">🕐 Lun–Vie 7am – 9pm</a></li>
            </ul>
          </div>
        </div>
        <div className="mc-footer-bottom">
          <span className="mc-footer-copy">© 2025 <span className="mc-footer-teal">MediControl</span>. Todos los derechos reservados.</span>
          <span className="mc-footer-copy">Hecho con ♥ para nuestros pacientes</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
