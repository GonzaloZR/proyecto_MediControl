import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2>Panel principal - MediControl</h2>
                <p>Bienvenido al sistema de gestión clínica.</p>

                <div className="d-flex gap-2">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => navigate("/pacientes")}
                    >
                        Pacientes
                    </button>
                    <button className="btn btn-outline-success">Médicos</button>
                    <button className="btn btn-outline-warning">Citas</button>
                    <button className="btn btn-danger ms-auto" onClick={cerrarSesion}>
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;