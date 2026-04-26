import { useEffect, useState, useMemo } from "react";
import api from "../services/api";

const CAMPOS_INICIALES = {
    nombre: "",
    apellido: "",
    dni: "",
    fecha_nacimiento: "",
    telefono: "",
    email: "",
    direccion: "",
};

const POR_PAGINA = 8;

function iniciales(nombre, apellido) {
    return `${nombre?.[0] ?? ""}${apellido?.[0] ?? ""}`.toUpperCase();
}

function Toast({ mensaje, tipo, onClose }) {
    useEffect(() => {
        const t = setTimeout(onClose, 3000);
        return () => clearTimeout(t);
    }, [onClose]);

    const colores =
        tipo === "error"
            ? { bg: "#FCEBEB", border: "#F09595", texto: "#A32D2D" }
            : { bg: "#E1F5EE", border: "#5DCAA5", texto: "#0F6E56" };

    return (
        <div
            style={{
                position: "fixed",
                bottom: "1.5rem",
                right: "1.5rem",
                background: colores.bg,
                border: `0.5px solid ${colores.border}`,
                color: colores.texto,
                borderRadius: 8,
                padding: "10px 16px",
                fontSize: 14,
                zIndex: 9999,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
        >
            {mensaje}
        </div>
    );
}

function ModalPaciente({ abierto, onClose, onGuardado, pacienteEditar }) {
    const editando = Boolean(pacienteEditar);
    const [form, setForm] = useState(CAMPOS_INICIALES);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if (abierto) {
            setForm(pacienteEditar ? { ...CAMPOS_INICIALES, ...pacienteEditar } : CAMPOS_INICIALES);
        }
    }, [abierto, pacienteEditar]);

    const manejarCambio = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const guardar = async (e) => {
        e.preventDefault();
        setCargando(true);
        try {
            if (editando) {
                await api.put(`/pacientes/${pacienteEditar.id}`, form);
            } else {
                await api.post("/pacientes", form);
            }
            onGuardado(editando ? "Paciente actualizado" : "Paciente registrado");
            onClose();
        } catch (err) {
            console.error(err);
            onGuardado("Error al guardar el paciente", "error");
        } finally {
            setCargando(false);
        }
    };

    if (!abierto) return null;

    return (
        <div
            onClick={(e) => e.target === e.currentTarget && onClose()}
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    background: "white",
                    borderRadius: 12,
                    width: 500,
                    maxWidth: "95vw",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px 20px",
                        borderBottom: "0.5px solid #e5e5e5",
                    }}
                >
                    <h3 style={{ fontSize: 16, fontWeight: 500 }}>
                        {editando ? "Editar paciente" : "Nuevo paciente"}
                    </h3>
                    <button
                        onClick={onClose}
                        style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#888" }}
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={guardar}>
                    <div style={{ padding: "20px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                            <Campo label="Nombre" name="nombre" value={form.nombre} onChange={manejarCambio} required />
                            <Campo label="Apellido" name="apellido" value={form.apellido} onChange={manejarCambio} required />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                            <Campo
                                label="DNI"
                                name="dni"
                                value={form.dni}
                                onChange={manejarCambio}
                                required
                                disabled={editando}
                            />
                            <Campo
                                label="Fecha de nacimiento"
                                name="fecha_nacimiento"
                                type="date"
                                value={form.fecha_nacimiento}
                                onChange={manejarCambio}
                            />
                        </div>

                        <hr style={{ border: "none", borderTop: "0.5px solid #e5e5e5", margin: "4px 0 12px" }} />

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                            <Campo label="Teléfono" name="telefono" value={form.telefono} onChange={manejarCambio} />
                            <Campo label="Email" name="email" type="email" value={form.email} onChange={manejarCambio} />
                        </div>

                        <Campo label="Dirección" name="direccion" value={form.direccion} onChange={manejarCambio} fullWidth />
                    </div>

                    {/* Footer */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 8,
                            padding: "14px 20px",
                            borderTop: "0.5px solid #e5e5e5",
                        }}
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                padding: "7px 16px",
                                border: "0.5px solid #ccc",
                                borderRadius: 8,
                                background: "transparent",
                                cursor: "pointer",
                                fontSize: 13,
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={cargando}
                            style={{
                                padding: "7px 18px",
                                border: "none",
                                borderRadius: 8,
                                background: cargando ? "#9FE1CB" : "#1D9E75",
                                color: "white",
                                cursor: "pointer",
                                fontSize: 13,
                                fontWeight: 500,
                            }}
                        >
                            {cargando ? "Guardando…" : editando ? "Actualizar" : "Guardar paciente"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function Campo({ label, name, value, onChange, type = "text", required, disabled, fullWidth }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 4, gridColumn: fullWidth ? "1 / -1" : undefined }}>
            <label style={{ fontSize: 12, color: "#666", fontWeight: 500 }}>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                disabled={disabled}
                className="form-control form-control-sm"
                style={disabled ? { background: "#f5f5f5", color: "#999" } : {}}
            />
        </div>
    );
}

function Pacientes() {
    const [pacientes, setPacientes] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [pacienteEditar, setPacienteEditar] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [pagina, setPagina] = useState(1);
    const [toast, setToast] = useState(null);

    const mostrarToast = (mensaje, tipo = "exito") => setToast({ mensaje, tipo });

    const cargarPacientes = async () => {
        try {
            const { data } = await api.get("/pacientes");
            setPacientes(data);
        } catch (err) {
            console.error("Error al cargar pacientes:", err);
        }
    };

    useEffect(() => {
        cargarPacientes();
    }, []);

    // Filtrado
    const filtrados = useMemo(() => {
        const q = busqueda.toLowerCase().trim();
        if (!q) return pacientes;
        return pacientes.filter(
            (p) =>
                p.nombre?.toLowerCase().includes(q) ||
                p.apellido?.toLowerCase().includes(q) ||
                p.dni?.includes(q) ||
                p.email?.toLowerCase().includes(q)
        );
    }, [pacientes, busqueda]);

    // Paginación
    const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA);
    const paginaActual = Math.min(pagina, totalPaginas || 1);
    const visibles = filtrados.slice((paginaActual - 1) * POR_PAGINA, paginaActual * POR_PAGINA);

    useEffect(() => {
        setPagina(1);
    }, [busqueda]);

    const abrirNuevo = () => {
        setPacienteEditar(null);
        setModalAbierto(true);
    };

    const abrirEditar = (p) => {
        setPacienteEditar(p);
        setModalAbierto(true);
    };

    const alGuardar = (msg, tipo) => {
        mostrarToast(msg, tipo);
        if (tipo !== "error") cargarPacientes();
    };

    const eliminar = async (id) => {
        if (!window.confirm("¿Eliminar este paciente?")) return;
        try {
            await api.delete(`/pacientes/${id}`);
            mostrarToast("Paciente eliminado");
            cargarPacientes();
        } catch {
            mostrarToast("Error al eliminar", "error");
        }
    };

    return (
        <div className="container mt-4">
            {toast && (
                <Toast mensaje={toast.mensaje} tipo={toast.tipo} onClose={() => setToast(null)} />
            )}

            <ModalPaciente
                abierto={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onGuardado={alGuardar}
                pacienteEditar={pacienteEditar}
            />

            {/* Stats rápidas */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
                {[
                    { n: pacientes.length, label: "Total pacientes" },
                    { n: pacientes.filter((p) => p.telefono).length, label: "Con teléfono" },
                    { n: pacientes.filter((p) => p.email).length, label: "Con email" },
                ].map(({ n, label }) => (
                    <div
                        key={label}
                        className="card"
                        style={{ padding: "12px 16px", border: "0.5px solid #e5e5e5" }}
                    >
                        <div style={{ fontSize: 22, fontWeight: 500 }}>{n}</div>
                        <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{label}</div>
                    </div>
                ))}
            </div>

            {/* Barra superior */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h4 style={{ margin: 0, fontWeight: 500 }}>Pacientes</h4>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <input
                        className="form-control form-control-sm"
                        placeholder="Buscar nombre, DNI, email…"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        style={{ width: 240 }}
                    />
                    <button
                        onClick={abrirNuevo}
                        title="Nuevo paciente"
                        style={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            background: "#1D9E75",
                            border: "none",
                            color: "white",
                            fontSize: 22,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            lineHeight: 1,
                            flexShrink: 0,
                        }}
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Tabla */}
            <div className="card shadow-sm" style={{ overflow: "hidden" }}>
                <table className="table table-hover mb-0" style={{ fontSize: 13 }}>
                    <thead className="table-light">
                    <tr>
                        <th>Paciente</th>
                        <th>DNI</th>
                        <th>F. Nacimiento</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Dirección</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {visibles.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="text-center text-muted py-4">
                                {busqueda ? "Sin resultados para la búsqueda" : "No hay pacientes registrados"}
                            </td>
                        </tr>
                    ) : (
                        visibles.map((p) => (
                            <tr key={p.id}>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <div
                                            style={{
                                                width: 30,
                                                height: 30,
                                                borderRadius: "50%",
                                                background: "#E1F5EE",
                                                color: "#0F6E56",
                                                fontSize: 11,
                                                fontWeight: 500,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                            }}
                                        >
                                            {iniciales(p.nombre, p.apellido)}
                                        </div>
                                        <span>{p.nombre} {p.apellido}</span>
                                    </div>
                                </td>
                                <td>{p.dni}</td>
                                <td>{p.fecha_nacimiento || <span className="text-muted">—</span>}</td>
                                <td>{p.telefono || <span className="text-muted">—</span>}</td>
                                <td>{p.email || <span className="text-muted">—</span>}</td>
                                <td style={{ maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {p.direccion || <span className="text-muted">—</span>}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-secondary me-1"
                                        onClick={() => abrirEditar(p)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => eliminar(p.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>

                {/* Paginación */}
                {totalPaginas > 1 && (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px 16px",
                            borderTop: "0.5px solid #e5e5e5",
                            fontSize: 12,
                            color: "#888",
                        }}
                    >
            <span>
              Mostrando {(paginaActual - 1) * POR_PAGINA + 1}–
                {Math.min(paginaActual * POR_PAGINA, filtrados.length)} de {filtrados.length}
            </span>
                        <div style={{ display: "flex", gap: 4 }}>
                            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                                <button
                                    key={n}
                                    onClick={() => setPagina(n)}
                                    style={{
                                        width: 26,
                                        height: 26,
                                        border: "0.5px solid #ccc",
                                        borderRadius: 6,
                                        background: n === paginaActual ? "#1D9E75" : "transparent",
                                        color: n === paginaActual ? "white" : "#666",
                                        cursor: "pointer",
                                        fontSize: 12,
                                    }}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Pacientes;
