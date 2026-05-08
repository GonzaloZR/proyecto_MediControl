import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axiosConfig";

/* ─── Fonts ──────────────────────────────────────────────────────── */
if (!document.getElementById("mc-gu-fonts")) {
  const l = document.createElement("link");
  l.id = "mc-gu-fonts";
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&family=DM+Sans:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(l);
}

/* ─── CSS ────────────────────────────────────────────────────────── */
const styles = `
:root {
  --navy:      #0B1E3D;
  --navy-2:    #132952;
  --navy-3:    #1a3870;
  --teal:      #1ABFA1;
  --teal-dim:  #12997f;
  --teal-pale: rgba(26,191,161,.12);
  --teal-glow: rgba(26,191,161,.22);
  --cream:     #F7F9FC;
  --cream-2:   #EEF2F8;
  --muted:     #7A8BA8;
  --text:      #1C2B45;
  --border:    rgba(11,30,61,.09);
  --danger:    #E55A5A;
  --warning:   #F4A928;
  --info:      #3A8DFF;
  --shadow:    0 4px 24px rgba(11,30,61,.09);
  --shadow-lg: 0 12px 48px rgba(11,30,61,.14);
}

.gu * { box-sizing:border-box; margin:0; padding:0; }

.gu {
  min-height:100vh;
  background:var(--cream);
  font-family:'DM Sans',sans-serif;
  color:var(--text);
  display:flex;
}

/* ── SIDEBAR ── */
.gu-sidebar {
  width:64px;
  background:var(--navy);
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:20px 0;
  position:sticky;
  top:0;
  height:100vh;
  flex-shrink:0;
  z-index:10;
  gap:6px;
}

.gu-sidebar-logo {
  width:38px; height:38px;
  background:var(--teal);
  border-radius:10px;
  display:flex; align-items:center; justify-content:center;
  margin-bottom:20px;
  flex-shrink:0;
}

.gu-sidebar-logo svg { width:20px; height:20px; fill:white; }

.gu-sidebar-icon {
  width:40px; height:40px;
  border-radius:10px;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer;
  transition:.18s;
  color:rgba(255,255,255,.35);
  position:relative;
}

.gu-sidebar-icon svg { width:18px; height:18px; fill:currentColor; }

.gu-sidebar-icon:hover { background:rgba(255,255,255,.07); color:rgba(255,255,255,.75); }

.gu-sidebar-icon.active {
  background:var(--teal-pale);
  color:var(--teal);
  border:1px solid rgba(26,191,161,.2);
}

.gu-sidebar-divider {
  width:28px; height:1px;
  background:rgba(255,255,255,.08);
  margin:8px 0;
}

.gu-sidebar-spacer { flex:1; }

.gu-sidebar-avatar {
  width:36px; height:36px; border-radius:50%;
  background:linear-gradient(135deg,var(--teal),var(--teal-dim));
  display:flex; align-items:center; justify-content:center;
  font-size:12px; font-weight:700; color:white;
}

/* ── MAIN ── */
.gu-main { flex:1; padding:36px 40px; min-width:0; }

/* ── TOP BAR ── */
.gu-topbar {
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:32px;
  gap:20px;
}

.gu-topbar-left { display:flex; flex-direction:column; gap:4px; }

.gu-breadcrumb {
  display:flex; align-items:center; gap:6px;
  font-size:12px; color:var(--muted);
}

.gu-breadcrumb svg { width:13px; height:13px; fill:var(--muted); }
.gu-breadcrumb span { color:var(--muted); }
.gu-breadcrumb span.active { color:var(--navy); font-weight:600; }

.gu-page-title {
  font-family:'Playfair Display',serif;
  font-size:28px; font-weight:700;
  color:var(--navy); letter-spacing:-.01em;
  line-height:1;
}

.gu-topbar-right { display:flex; align-items:center; gap:12px; }

.gu-back-btn {
  display:flex; align-items:center; gap:7px;
  padding:10px 18px;
  border:1.5px solid var(--border);
  background:white; color:var(--navy);
  border-radius:10px;
  font-family:'DM Sans',sans-serif;
  font-size:13px; font-weight:600;
  cursor:pointer; transition:.18s;
}

.gu-back-btn svg { width:14px; height:14px; fill:currentColor; }
.gu-back-btn:hover { border-color:var(--teal); color:var(--teal); }

/* ── ALERT ── */
.gu-alert {
  display:flex; align-items:center; gap:10px;
  border-radius:12px;
  padding:13px 16px;
  font-size:13.5px; font-weight:500;
  margin-bottom:20px;
  animation:guSlideIn .3s ease;
}

.gu-alert svg { width:16px; height:16px; flex-shrink:0; }

.gu-alert.success {
  background:rgba(26,191,161,.1);
  color:var(--teal-dim);
  border:1px solid rgba(26,191,161,.25);
}

.gu-alert.success svg { fill:var(--teal); }

.gu-alert.error {
  background:rgba(229,90,90,.08);
  color:#c0392b;
  border:1px solid rgba(229,90,90,.22);
}

.gu-alert.error svg { fill:var(--danger); }

@keyframes guSlideIn {
  from { opacity:0; transform:translateY(-8px); }
  to   { opacity:1; transform:translateY(0); }
}

/* ── STATS ROW ── */
.gu-stats {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:16px;
  margin-bottom:24px;
}

.gu-stat {
  background:white;
  border:1px solid var(--border);
  border-radius:16px;
  padding:20px 22px;
  box-shadow:var(--shadow);
  position:relative;
  overflow:hidden;
  transition:.2s;
}

.gu-stat:hover { transform:translateY(-2px); box-shadow:var(--shadow-lg); }

.gu-stat::before {
  content:'';
  position:absolute; top:0; left:0; right:0;
  height:3px;
}

.gu-stat-total::before   { background:var(--navy); }
.gu-stat-active::before  { background:var(--teal); }
.gu-stat-admins::before  { background:var(--info); }
.gu-stat-recep::before   { background:var(--warning); }

.gu-stat-label {
  font-size:11px; font-weight:700;
  letter-spacing:.1em; text-transform:uppercase;
  color:var(--muted); margin-bottom:10px;
  display:flex; align-items:center; gap:7px;
}

.gu-stat-label-dot {
  width:6px; height:6px; border-radius:50%;
}

.gu-stat-total .gu-stat-label-dot   { background:var(--navy); }
.gu-stat-active .gu-stat-label-dot  { background:var(--teal); }
.gu-stat-admins .gu-stat-label-dot  { background:var(--info); }
.gu-stat-recep .gu-stat-label-dot   { background:var(--warning); }

.gu-stat-num {
  font-family:'Playfair Display',serif;
  font-size:38px; font-weight:700;
  color:var(--navy); line-height:1;
}

.gu-stat-sub {
  font-size:11.5px; color:var(--muted);
  margin-top:6px;
}

/* ── CARDS ── */
.gu-card {
  background:white;
  border:1px solid var(--border);
  border-radius:20px;
  box-shadow:var(--shadow);
  margin-bottom:24px;
  overflow:hidden;
}

.gu-card-head {
  padding:24px 28px 0;
  display:flex; align-items:flex-start; justify-content:space-between; gap:16px;
}

.gu-card-title {
  font-family:'Playfair Display',serif;
  font-size:20px; font-weight:600; color:var(--navy);
  margin-bottom:3px;
}

.gu-card-sub { font-size:13px; color:var(--muted); }

.gu-card-body { padding:24px 28px; }

.gu-collapsible-toggle {
  display:flex; align-items:center; gap:7px;
  font-size:13px; font-weight:600; color:var(--muted);
  background:none; border:none; cursor:pointer;
  font-family:'DM Sans',sans-serif;
  padding:8px 12px;
  border-radius:8px; transition:.15s;
}

.gu-collapsible-toggle:hover { background:var(--cream); color:var(--navy); }
.gu-collapsible-toggle svg { width:14px; height:14px; fill:currentColor; transition:transform .2s; }
.gu-collapsible-toggle.open svg { transform:rotate(180deg); }

.gu-collapse { overflow:hidden; transition:max-height .35s ease; }

/* ── FORM ── */
.gu-form-grid {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:16px;
}

.gu-field-label {
  display:block;
  font-size:11px; font-weight:700;
  text-transform:uppercase; letter-spacing:.07em;
  color:var(--text); margin-bottom:7px;
}

.gu-input-wrap { position:relative; }

.gu-input-icon {
  position:absolute; left:14px; top:50%;
  transform:translateY(-50%);
  width:15px; height:15px; fill:var(--muted);
  pointer-events:none; transition:.15s;
}

.gu-input-wrap:focus-within .gu-input-icon { fill:var(--teal); }

.gu-input, .gu-select {
  width:100%; height:46px;
  padding:0 14px 0 38px;
  border:1.5px solid var(--border);
  border-radius:11px;
  font-family:'DM Sans',sans-serif;
  font-size:14px; color:var(--text);
  background:var(--cream); outline:none;
  transition:.2s;
  -webkit-appearance:none;
}

.gu-input::placeholder { color:#b0bec5; }

.gu-input:focus, .gu-select:focus {
  border-color:var(--teal);
  background:white;
  box-shadow:0 0 0 3px rgba(26,191,161,.1);
}

.gu-input.error-field { border-color:var(--danger); }

.gu-input-hint {
  display:block; margin-top:5px;
  font-size:11.5px; color:var(--muted);
}

.gu-input-strength {
  display:flex; gap:4px; margin-top:6px;
}

.gu-strength-bar {
  height:3px; flex:1; border-radius:2px;
  background:var(--cream-2);
  transition:.3s;
}

.gu-strength-bar.weak   { background:var(--danger); }
.gu-strength-bar.medium { background:var(--warning); }
.gu-strength-bar.strong { background:var(--teal); }

.gu-strength-label {
  font-size:11px; font-weight:600; margin-top:4px;
  color:var(--muted);
}

.gu-strength-label.weak   { color:var(--danger); }
.gu-strength-label.medium { color:var(--warning); }
.gu-strength-label.strong { color:var(--teal-dim); }

.gu-eye-btn {
  position:absolute; right:12px; top:50%;
  transform:translateY(-50%);
  background:none; border:none; cursor:pointer;
  padding:3px; display:flex; align-items:center;
}

.gu-eye-btn svg { width:15px; height:15px; fill:var(--muted); transition:.15s; }
.gu-eye-btn:hover svg { fill:var(--navy); }

/* password without left icon (use full padding) */
.gu-input.pass-input { padding-right:40px; }

.gu-form-actions {
  display:flex; gap:10px; margin-top:20px; flex-wrap:wrap;
  padding-top:20px; border-top:1px solid var(--border);
}

.gu-btn {
  display:inline-flex; align-items:center; gap:7px;
  border:none; border-radius:10px;
  padding:11px 18px;
  font-family:'DM Sans',sans-serif;
  font-size:13.5px; font-weight:600;
  cursor:pointer; transition:.18s;
}

.gu-btn svg { width:15px; height:15px; fill:currentColor; }
.gu-btn:hover { transform:translateY(-1px); }
.gu-btn:active { transform:translateY(0); }

.gu-btn-primary {
  background:var(--navy); color:white;
  box-shadow:0 4px 14px rgba(11,30,61,.2);
}

.gu-btn-primary:hover { background:var(--navy-2); box-shadow:0 6px 20px rgba(11,30,61,.28); }

.gu-btn-ghost {
  background:white; color:var(--navy);
  border:1.5px solid var(--border);
}

.gu-btn-ghost:hover { border-color:var(--teal); color:var(--teal); }

.gu-btn-danger {
  background:rgba(229,90,90,.08);
  color:#c0392b;
  border:1px solid rgba(229,90,90,.22);
}

.gu-btn-danger:hover { background:rgba(229,90,90,.15); }

.gu-btn-success {
  background:var(--teal-pale);
  color:var(--teal-dim);
  border:1px solid rgba(26,191,161,.25);
}

.gu-btn-success:hover { background:rgba(26,191,161,.2); }

.gu-btn-sm { padding:7px 13px; font-size:12.5px; }

.gu-tip {
  display:flex; align-items:flex-start; gap:9px;
  margin-top:16px; padding:13px 16px;
  border-radius:10px;
  background:rgba(58,141,255,.07);
  border:1px solid rgba(58,141,255,.16);
  font-size:13px; color:#2367bd;
}

.gu-tip svg { width:15px; height:15px; fill:#2367bd; flex-shrink:0; margin-top:1px; }

/* ── TOOLBAR ── */
.gu-toolbar {
  display:flex; align-items:center; gap:12px;
  padding:20px 28px;
  border-bottom:1px solid var(--border);
  flex-wrap:wrap;
}

.gu-search-wrap {
  position:relative; flex:1; min-width:200px;
}

.gu-search-icon {
  position:absolute; left:14px; top:50%;
  transform:translateY(-50%);
  width:15px; height:15px; fill:var(--muted);
  pointer-events:none;
}

.gu-search {
  width:100%; height:42px;
  padding:0 14px 0 40px;
  border:1.5px solid var(--border);
  border-radius:10px;
  font-family:'DM Sans',sans-serif;
  font-size:13.5px; color:var(--text);
  background:var(--cream); outline:none;
  transition:.2s;
}

.gu-search:focus { border-color:var(--teal); background:white; box-shadow:0 0 0 3px rgba(26,191,161,.1); }

.gu-filter-select {
  height:42px; padding:0 12px;
  border:1.5px solid var(--border);
  border-radius:10px;
  font-family:'DM Sans',sans-serif;
  font-size:13px; color:var(--text);
  background:white; outline:none; cursor:pointer;
  transition:.2s; -webkit-appearance:none;
  min-width:160px;
}

.gu-filter-select:focus { border-color:var(--teal); box-shadow:0 0 0 3px rgba(26,191,161,.1); }

.gu-toggle-wrap {
  display:flex; align-items:center; gap:8px;
  font-size:13px; font-weight:500; color:var(--muted);
  cursor:pointer; user-select:none;
  white-space:nowrap;
}

/* custom toggle */
.gu-toggle {
  width:36px; height:20px; border-radius:10px;
  background:var(--cream-2); border:1.5px solid var(--border);
  position:relative; transition:.2s; flex-shrink:0;
}

.gu-toggle.on { background:var(--teal); border-color:var(--teal); }

.gu-toggle-knob {
  position:absolute; top:2px; left:2px;
  width:12px; height:12px; border-radius:50%;
  background:white; box-shadow:0 1px 3px rgba(0,0,0,.2);
  transition:.2s;
}

.gu-toggle.on .gu-toggle-knob { left:18px; }

.gu-toolbar-count {
  font-size:12px; font-weight:600;
  color:var(--muted); white-space:nowrap;
  padding:6px 12px;
  background:var(--cream);
  border-radius:8px;
  border:1px solid var(--border);
}

/* ── TABLE ── */
.gu-table-wrap { overflow-x:auto; }

.gu-table { width:100%; border-collapse:collapse; }

.gu-table thead tr { background:var(--navy); }

.gu-table thead th {
  padding:14px 20px;
  color:rgba(255,255,255,.55);
  font-size:11px; font-weight:600;
  text-transform:uppercase; letter-spacing:.1em;
  text-align:left; white-space:nowrap;
}

.gu-table thead th:first-child { padding-left:24px; }

.gu-table tbody tr {
  border-bottom:1px solid var(--border);
  transition:.15s;
}

.gu-table tbody tr:last-child { border-bottom:none; }
.gu-table tbody tr:hover { background:rgba(26,191,161,.03); }
.gu-table tbody tr.row-inactive { background:rgba(11,30,61,.02); opacity:.75; }
.gu-table tbody tr.row-inactive:hover { opacity:1; }

.gu-table td {
  padding:16px 20px;
  font-size:13.5px; vertical-align:middle;
}

.gu-table td:first-child { padding-left:24px; }

/* user cell */
.gu-user-cell { display:flex; align-items:center; gap:12px; }

.gu-avatar {
  width:40px; height:40px; border-radius:12px;
  display:flex; align-items:center; justify-content:center;
  font-size:13px; font-weight:700; flex-shrink:0;
}

.gu-avatar-admin   { background:rgba(58,141,255,.14); color:#2367bd; }
.gu-avatar-recep   { background:rgba(244,169,40,.14);  color:#a67200; }
.gu-avatar-default { background:var(--teal-pale); color:var(--teal-dim); }

.gu-user-name { font-weight:600; font-size:14px; color:var(--navy); }
.gu-user-id   { font-size:11.5px; color:var(--muted); margin-top:1px; }

/* email cell */
.gu-email-cell {
  display:flex; align-items:center; gap:6px;
  font-size:13.5px; color:var(--text);
}

.gu-email-cell svg { width:13px; height:13px; fill:var(--muted); flex-shrink:0; }

/* role badge */
.gu-role {
  display:inline-flex; align-items:center; gap:5px;
  padding:5px 12px; border-radius:20px;
  font-size:12px; font-weight:700;
  letter-spacing:.04em;
}

.gu-role-admin {
  background:rgba(58,141,255,.1); color:#2367bd;
  border:1px solid rgba(58,141,255,.2);
}

.gu-role-recep {
  background:rgba(244,169,40,.12); color:#a67200;
  border:1px solid rgba(244,169,40,.25);
}

.gu-role-default {
  background:rgba(11,30,61,.07); color:var(--navy);
  border:1px solid var(--border);
}

/* status badge */
.gu-status {
  display:inline-flex; align-items:center; gap:6px;
  padding:5px 12px; border-radius:20px;
  font-size:12px; font-weight:700;
}

.gu-status-dot { width:6px; height:6px; border-radius:50%; }

.gu-status-active  { background:rgba(26,191,161,.12); color:var(--teal-dim); }
.gu-status-active  .gu-status-dot { background:var(--teal); }

.gu-status-inactive { background:rgba(11,30,61,.07); color:var(--muted); }
.gu-status-inactive .gu-status-dot { background:var(--muted); }

/* actions cell */
.gu-actions-cell { display:flex; align-items:center; gap:8px; }

/* ── EMPTY ── */
.gu-empty {
  padding:56px 32px; text-align:center;
}

.gu-empty-icon {
  width:56px; height:56px; border-radius:16px;
  background:var(--teal-pale);
  display:flex; align-items:center; justify-content:center;
  margin:0 auto 16px;
}

.gu-empty-icon svg { width:26px; height:26px; fill:var(--teal); }
.gu-empty h3 { font-family:'Playfair Display',serif; font-size:22px; color:var(--navy); margin-bottom:6px; }
.gu-empty p  { font-size:13.5px; color:var(--muted); }

/* ── TABLE FOOTER ── */
.gu-table-footer {
  padding:14px 24px;
  border-top:1px solid var(--border);
  display:flex; align-items:center; justify-content:space-between;
  background:var(--cream);
  font-size:12.5px; color:var(--muted);
  gap:12px; flex-wrap:wrap;
}

.gu-footer-stat { display:flex; align-items:center; gap:6px; }
.gu-footer-dot  { width:6px; height:6px; border-radius:50%; }

/* ── MODAL ── */
.gu-modal-overlay {
  position:fixed; inset:0; z-index:200;
  background:rgba(11,30,61,.5);
  backdrop-filter:blur(4px);
  display:flex; align-items:center; justify-content:center;
  padding:24px;
  animation:guFadeIn .2s ease;
}

@keyframes guFadeIn { from{opacity:0} to{opacity:1} }

.gu-modal {
  background:white;
  border-radius:20px;
  width:100%; max-width:420px;
  box-shadow:0 24px 64px rgba(11,30,61,.25);
  overflow:hidden;
  animation:guScaleIn .25s ease;
}

@keyframes guScaleIn {
  from { opacity:0; transform:scale(.96) translateY(8px); }
  to   { opacity:1; transform:scale(1) translateY(0); }
}

.gu-modal-head {
  padding:24px 28px 0;
  display:flex; align-items:flex-start; justify-content:space-between;
}

.gu-modal-icon {
  width:44px; height:44px; border-radius:12px;
  display:flex; align-items:center; justify-content:center;
  margin-bottom:14px;
}

.gu-modal-icon.danger { background:rgba(229,90,90,.1); }
.gu-modal-icon.danger svg { fill:var(--danger); }
.gu-modal-icon.success { background:var(--teal-pale); }
.gu-modal-icon.success svg { fill:var(--teal); }
.gu-modal-icon svg { width:22px; height:22px; }

.gu-modal-close {
  background:none; border:none; cursor:pointer; padding:4px;
  color:var(--muted); transition:.15s;
  display:flex; align-items:center;
}

.gu-modal-close:hover { color:var(--navy); }
.gu-modal-close svg { width:18px; height:18px; fill:currentColor; }

.gu-modal-title {
  font-family:'Playfair Display',serif;
  font-size:20px; font-weight:600; color:var(--navy); margin-bottom:6px;
}

.gu-modal-body { padding:0 28px 24px; }

.gu-modal-body p { font-size:14px; color:var(--muted); line-height:1.6; }

.gu-modal-user {
  display:flex; align-items:center; gap:10px;
  margin:16px 0;
  padding:12px 14px;
  background:var(--cream); border-radius:10px;
  border:1px solid var(--border);
}

.gu-modal-user .gu-avatar { width:34px; height:34px; border-radius:9px; font-size:12px; }
.gu-modal-user strong { font-size:14px; color:var(--navy); }
.gu-modal-user span { font-size:12px; color:var(--muted); }

.gu-modal-actions {
  display:flex; gap:10px; margin-top:20px;
}

/* ── RESPONSIVE ── */
@media(max-width:1100px) {
  .gu-stats { grid-template-columns:repeat(2,1fr); }
  .gu-form-grid { grid-template-columns:repeat(2,1fr); }
}

@media(max-width:720px) {
  .gu-main { padding:24px 20px; }
  .gu-stats { grid-template-columns:1fr 1fr; }
  .gu-form-grid { grid-template-columns:1fr; }
  .gu-toolbar { flex-direction:column; align-items:stretch; }
  .gu-sidebar { display:none; }
}
`;

/* ─── Helpers ────────────────────────────────────────────────────── */
const initials = (s = "") => s.slice(0, 2).toUpperCase().padEnd(2, "U");

const avatarClass = (rol) => {
  if (rol === "ADMIN") return "gu-avatar-admin";
  if (rol === "RECEPCIONISTA") return "gu-avatar-recep";
  return "gu-avatar-default";
};

const roleClass = (rol) => {
  if (rol === "ADMIN") return "gu-role-admin";
  if (rol === "RECEPCIONISTA") return "gu-role-recep";
  return "gu-role-default";
};

const pwStrength = (pw) => {
  if (!pw) return { level: 0, label: "", bars: [null, null, null] };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { level: 1, label: "Débil", bars: ["weak", null, null] };
  if (score <= 2) return { level: 2, label: "Media", bars: ["medium", "medium", null] };
  return { level: 3, label: "Fuerte", bars: ["strong", "strong", "strong"] };
};

/* ─── Component ──────────────────────────────────────────────────── */
function GestionUsuarios() {
  const navigate = useNavigate();

  // State — data
  const [usuarios, setUsuarios] = useState([]);

  // State — filters
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("TODOS");
  const [mostrarInactivos, setMostrarInactivos] = useState(false);

  // State — form
  const [form, setForm] = useState({ username: "", password: "", correo: "", rol: "RECEPCIONISTA" });
  const [showPass, setShowPass] = useState(false);
  const [formOpen, setFormOpen] = useState(true);

  // State — UI
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalConfig, setModalConfig] = useState(null); // { type, usuario }

  // Inject CSS
  useEffect(() => {
    const tag = document.createElement("style");
    tag.id = "gu-styles-v2";
    tag.textContent = styles;
    if (!document.getElementById("gu-styles-v2")) document.head.appendChild(tag);
    return () => tag.remove();
  }, []);

  useEffect(() => { obtenerUsuarios(); }, []);

  // Auto-clear alerts
  useEffect(() => {
    if (!mensaje && !error) return;
    const t = setTimeout(() => { setMensaje(""); setError(""); }, 5000);
    return () => clearTimeout(t);
  }, [mensaje, error]);

  /* ── API ── */
  const obtenerUsuarios = async () => {
    try {
      setError("");
      const res = await API.get("/usuarios/todos");
      setUsuarios(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setError("Error al cargar usuarios.");
    }
  };

  const registrarUsuario = async (e) => {
    e.preventDefault();
    setMensaje(""); setError("");

    if (form.username.trim().length < 4) return setError("El username debe tener mínimo 4 caracteres.");
    if (form.password.trim().length < 6) return setError("La contraseña debe tener mínimo 6 caracteres.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) return setError("Ingresa un correo válido.");
    if (!form.rol) return setError("Selecciona un rol.");

    setLoading(true);
    try {
      await API.post("/usuarios/registrar-interno", {
        username: form.username.trim(),
        password: form.password.trim(),
        correo: form.correo.trim(),
        rol: form.rol,
      });
      setMensaje(`Usuario "${form.username}" registrado correctamente.`);
      setForm({ username: "", password: "", correo: "", rol: "RECEPCIONISTA" });
      obtenerUsuarios();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.response?.data || "Error al registrar usuario.");
    } finally {
      setLoading(false);
    }
  };

  const desactivarUsuario = async (id) => {
    setModalConfig(null);
    try {
      await API.delete(`/usuarios/${id}`);
      setMensaje("Usuario desactivado correctamente.");
      obtenerUsuarios();
    } catch (err) {
      console.error(err);
      setError("Error al desactivar usuario.");
    }
  };

  const activarUsuario = async (id) => {
    setModalConfig(null);
    try {
      await API.put(`/usuarios/${id}/activar`);
      setMensaje("Usuario activado correctamente.");
      obtenerUsuarios();
    } catch (err) {
      console.error(err);
      setError("Error al activar usuario.");
    }
  };

  /* ── Derived ── */
  const usuariosFiltrados = useMemo(() => {
    const txt = busqueda.toLowerCase().trim();
    return usuarios
      .filter((u) => mostrarInactivos ? true : u.estado)
      .filter((u) => {
        const rol = u.rol?.nombre || "";
        const coincideRol = filtroRol === "TODOS" || rol === filtroRol;
        const data = `${u.username || ""} ${u.correo || ""} ${rol}`.toLowerCase();
        return data.includes(txt) && coincideRol;
      });
  }, [usuarios, mostrarInactivos, busqueda, filtroRol]);

  const totalActivos     = usuarios.filter((u) => u.estado).length;
  const totalInactivos   = usuarios.filter((u) => !u.estado).length;
  const totalAdmins      = usuarios.filter((u) => u.rol?.nombre === "ADMIN").length;
  const totalRecep       = usuarios.filter((u) => u.rol?.nombre === "RECEPCIONISTA").length;

  const strength = pwStrength(form.password);
  const adminUser = localStorage.getItem("username") || "Admin";

  return (
    <div className="gu">

      {/* ── SIDEBAR ── */}
      <aside className="gu-sidebar">
        <div className="gu-sidebar-logo">
          <svg viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
          </svg>
        </div>

        {[
          { icon: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z", active: false, title: "Dashboard", path: "/dashboard" },
          { icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z", active: true, title: "Usuarios" },
        ].map(({ icon, active, title, path }) => (
          <div
            key={title}
            className={`gu-sidebar-icon${active ? " active" : ""}`}
            title={title}
            onClick={() => path && navigate(path)}
          >
            <svg viewBox="0 0 24 24"><path d={icon}/></svg>
          </div>
        ))}

        <div className="gu-sidebar-spacer" />
        <div className="gu-sidebar-divider" />
        <div className="gu-sidebar-avatar" title={adminUser}>
          {initials(adminUser)}
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="gu-main">

        {/* Top bar */}
        <div className="gu-topbar">
          <div className="gu-topbar-left">
            <div className="gu-breadcrumb">
              <svg viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
              <span>Dashboard</span>
              <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
              <span className="active">Gestión de Usuarios</span>
            </div>
            <h1 className="gu-page-title">Gestión de Usuarios</h1>
          </div>
          <div className="gu-topbar-right">
            <button className="gu-back-btn" onClick={() => navigate("/dashboard")}>
              <svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
              Volver al dashboard
            </button>
          </div>
        </div>

        {/* Alerts */}
        {mensaje && (
          <div className="gu-alert success">
            <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            {mensaje}
          </div>
        )}
        {error && (
          <div className="gu-alert error">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            {error}
          </div>
        )}

        {/* Stats */}
        <div className="gu-stats">
          {[
            { cls: "gu-stat-total",  label: "Total registrados", num: usuarios.length, sub: `${totalInactivos} inactivos` },
            { cls: "gu-stat-active", label: "Usuarios activos",  num: totalActivos,    sub: "con acceso al sistema" },
            { cls: "gu-stat-admins", label: "Administradores",   num: totalAdmins,     sub: "acceso completo" },
            { cls: "gu-stat-recep",  label: "Recepcionistas",    num: totalRecep,      sub: "acceso operativo" },
          ].map(({ cls, label, num, sub }) => (
            <div key={label} className={`gu-stat ${cls}`}>
              <div className="gu-stat-label">
                <span className="gu-stat-label-dot" />
                {label}
              </div>
              <div className="gu-stat-num">{num}</div>
              <div className="gu-stat-sub">{sub}</div>
            </div>
          ))}
        </div>

        {/* ── FORM CARD ── */}
        <div className="gu-card">
          <div className="gu-card-head">
            <div>
              <div className="gu-card-title">Registrar usuario interno</div>
              <div className="gu-card-sub">Crea accesos para personal administrativo o de recepción</div>
            </div>
            <button
              className={`gu-collapsible-toggle${formOpen ? " open" : ""}`}
              onClick={() => setFormOpen(!formOpen)}
            >
              {formOpen ? "Contraer" : "Expandir"}
              <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>
            </button>
          </div>

          <div
            className="gu-collapse"
            style={{ maxHeight: formOpen ? "800px" : "0" }}
          >
            <div className="gu-card-body">
              <form onSubmit={registrarUsuario}>
                <div className="gu-form-grid">

                  {/* Username */}
                  <div>
                    <label className="gu-field-label">Username</label>
                    <div className="gu-input-wrap">
                      <svg className="gu-input-icon" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                      <input
                        type="text"
                        className="gu-input"
                        name="username"
                        placeholder="recepcion01"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value.replace(/\s/g, "").toLowerCase() })}
                        required
                      />
                    </div>
                    <small className="gu-input-hint">Sin espacios · mín. 4 caracteres</small>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="gu-field-label">Contraseña</label>
                    <div className="gu-input-wrap">
                      <svg className="gu-input-icon" viewBox="0 0 24 24">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                      </svg>
                      <input
                        type={showPass ? "text" : "password"}
                        className="gu-input pass-input"
                        name="password"
                        placeholder="Mínimo 6 caracteres"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                      />
                      <button type="button" className="gu-eye-btn" onClick={() => setShowPass(!showPass)}>
                        {showPass
                          ? <svg viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>
                          : <svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                        }
                      </button>
                    </div>
                    {form.password && (
                      <>
                        <div className="gu-input-strength">
                          {strength.bars.map((b, i) => (
                            <div key={i} className={`gu-strength-bar${b ? ` ${b}` : ""}`} />
                          ))}
                        </div>
                        <span className={`gu-input-hint gu-strength-label${strength.label ? ` ${strength.bars[0]}` : ""}`}>
                          Seguridad: {strength.label}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Correo */}
                  <div>
                    <label className="gu-field-label">Correo electrónico</label>
                    <div className="gu-input-wrap">
                      <svg className="gu-input-icon" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      <input
                        type="email"
                        className="gu-input"
                        name="correo"
                        placeholder="usuario@medicontrol.pe"
                        value={form.correo}
                        onChange={(e) => setForm({ ...form, correo: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Rol */}
                  <div>
                    <label className="gu-field-label">Rol del sistema</label>
                    <div className="gu-input-wrap">
                      <svg className="gu-input-icon" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                      </svg>
                      <select
                        className="gu-select"
                        name="rol"
                        value={form.rol}
                        onChange={(e) => setForm({ ...form, rol: e.target.value })}
                      >
                        <option value="RECEPCIONISTA">RECEPCIONISTA</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </div>
                    <small className="gu-input-hint">Define los permisos del usuario</small>
                  </div>
                </div>

                <div className="gu-form-actions">
                  <button type="submit" className="gu-btn gu-btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <svg viewBox="0 0 24 24" style={{ animation: "spin 1s linear infinite" }}>
                          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
                        </svg>
                        Registrando...
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                        Registrar usuario
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="gu-btn gu-btn-ghost"
                    onClick={() => setForm({ username: "", password: "", correo: "", rol: "RECEPCIONISTA" })}
                  >
                    <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                    Limpiar
                  </button>
                </div>

                <div className="gu-tip">
                  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                  Crea cuentas ADMIN solo para personal autorizado. Para operaciones diarias usa el rol RECEPCIONISTA.
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ── TABLE CARD ── */}
        <div className="gu-card">
          <div className="gu-card-head" style={{ paddingBottom: "0" }}>
            <div>
              <div className="gu-card-title">Usuarios registrados</div>
              <div className="gu-card-sub">Busca, filtra y controla los accesos al sistema</div>
            </div>
            <button className="gu-btn gu-btn-ghost gu-btn-sm" onClick={obtenerUsuarios}>
              <svg viewBox="0 0 24 24"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
              Actualizar
            </button>
          </div>

          {/* Toolbar */}
          <div className="gu-toolbar">
            <div className="gu-search-wrap">
              <svg className="gu-search-icon" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                className="gu-search"
                placeholder="Buscar por usuario, correo o rol..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <select
              className="gu-filter-select"
              value={filtroRol}
              onChange={(e) => setFiltroRol(e.target.value)}
            >
              <option value="TODOS">Todos los roles</option>
              <option value="ADMIN">ADMIN</option>
              <option value="RECEPCIONISTA">RECEPCIONISTA</option>
            </select>

            <label className="gu-toggle-wrap" onClick={() => setMostrarInactivos(!mostrarInactivos)}>
              <div className={`gu-toggle${mostrarInactivos ? " on" : ""}`}>
                <div className="gu-toggle-knob" />
              </div>
              Ver inactivos
            </label>

            <div className="gu-toolbar-count">
              {usuariosFiltrados.length} resultado{usuariosFiltrados.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Table */}
          {usuariosFiltrados.length === 0 ? (
            <div className="gu-empty">
              <div className="gu-empty-icon">
                <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
              </div>
              <h3>Sin resultados</h3>
              <p>No hay usuarios con los filtros actuales.</p>
            </div>
          ) : (
            <div className="gu-table-wrap">
              <table className="gu-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosFiltrados.map((u) => {
                    const rol = u.rol?.nombre || "SIN ROL";
                    return (
                      <tr key={u.id} className={!u.estado ? "row-inactive" : ""}>
                        <td>
                          <div className="gu-user-cell">
                            <div className={`gu-avatar ${avatarClass(rol)}`}>
                              {initials(u.username)}
                            </div>
                            <div>
                              <div className="gu-user-name">{u.username}</div>
                              <div className="gu-user-id">ID #{u.id}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="gu-email-cell">
                            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                            {u.correo}
                          </div>
                        </td>
                        <td>
                          <span className={`gu-role ${roleClass(rol)}`}>{rol}</span>
                        </td>
                        <td>
                          <span className={`gu-status ${u.estado ? "gu-status-active" : "gu-status-inactive"}`}>
                            <span className="gu-status-dot" />
                            {u.estado ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td>
                          <div className="gu-actions-cell">
                            {u.estado ? (
                              <button
                                className="gu-btn gu-btn-danger gu-btn-sm"
                                onClick={() => setModalConfig({ type: "deactivate", usuario: u })}
                              >
                                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>
                                Desactivar
                              </button>
                            ) : (
                              <button
                                className="gu-btn gu-btn-success gu-btn-sm"
                                onClick={() => setModalConfig({ type: "activate", usuario: u })}
                              >
                                <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
                                Activar
                              </button>
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

          {/* Table footer */}
          <div className="gu-table-footer">
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div className="gu-footer-stat">
                <div className="gu-footer-dot" style={{ background: "var(--teal)" }} />
                {totalActivos} activos
              </div>
              <div className="gu-footer-stat">
                <div className="gu-footer-dot" style={{ background: "var(--muted)" }} />
                {totalInactivos} inactivos
              </div>
            </div>
            <span>Mostrando {usuariosFiltrados.length} de {usuarios.length} usuarios</span>
          </div>
        </div>
      </main>

      {/* ── CONFIRMATION MODAL ── */}
      {modalConfig && (
        <div className="gu-modal-overlay" onClick={() => setModalConfig(null)}>
          <div className="gu-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gu-modal-head">
              <div>
                <div className={`gu-modal-icon ${modalConfig.type === "deactivate" ? "danger" : "success"}`}>
                  {modalConfig.type === "deactivate"
                    ? <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>
                    : <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  }
                </div>
                <div className="gu-modal-title">
                  {modalConfig.type === "deactivate" ? "¿Desactivar usuario?" : "¿Activar usuario?"}
                </div>
              </div>
              <button className="gu-modal-close" onClick={() => setModalConfig(null)}>
                <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
            </div>
            <div className="gu-modal-body">
              <div className="gu-modal-user">
                <div className={`gu-avatar ${avatarClass(modalConfig.usuario.rol?.nombre)}`}>
                  {initials(modalConfig.usuario.username)}
                </div>
                <div>
                  <strong>{modalConfig.usuario.username}</strong><br/>
                  <span>{modalConfig.usuario.correo}</span>
                </div>
              </div>
              <p>
                {modalConfig.type === "deactivate"
                  ? "El usuario perderá acceso inmediato al sistema. Podrás reactivarlo en cualquier momento."
                  : "El usuario recuperará acceso completo al sistema según su rol asignado."
                }
              </p>
              <div className="gu-modal-actions">
                {modalConfig.type === "deactivate" ? (
                  <button className="gu-btn gu-btn-danger" onClick={() => desactivarUsuario(modalConfig.usuario.id)}>
                    Sí, desactivar
                  </button>
                ) : (
                  <button className="gu-btn gu-btn-success" onClick={() => activarUsuario(modalConfig.usuario.id)}>
                    Sí, activar
                  </button>
                )}
                <button className="gu-btn gu-btn-ghost" onClick={() => setModalConfig(null)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  );
}

export default GestionUsuarios;
