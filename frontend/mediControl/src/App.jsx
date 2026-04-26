import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pacientes from "./pages/Pacientes.jsx";

function App() {
    const token = localStorage.getItem("token");

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route
                path="/dashboard"
                element={token ? <Dashboard /> : <Navigate to="/" />}
            />
            <Route path="/pacientes" element={<Pacientes />} />
        </Routes>
    );
}

export default App;