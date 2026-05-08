import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import RegistroPaciente from "../pages/public/RegistroPaciente";
import PacienteDashboard from "../pages/paciente/PacienteDashboard";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import SolicitarCita from "../pages/paciente/SolicitarCita";
import GestionCitas from "../pages/dashboard/GestionCitas";
import MisCitasMedico from "../pages/dashboard/MisCitasMedico";
import GestionEspecialidades from "../pages/dashboard/GestionEspecialidades";
import GestionMedicos from "../pages/dashboard/GestionMedicos";
import GestionPacientes from "../pages/dashboard/GestionPacientes";
import PerfilPaciente from "../pages/paciente/PerfilPaciente";
import GestionUsuarios from "../pages/dashboard/GestionUsuarios";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro-paciente" element={<RegistroPaciente />} />

        <Route
          path="/paciente"
          element={
            <ProtectedRoute rolesPermitidos={["PACIENTE"]}>
              <PacienteDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute rolesPermitidos={["ADMIN", "RECEPCIONISTA", "MEDICO"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/solicitar-cita"
          element={
            <ProtectedRoute rolesPermitidos={["PACIENTE"]}>
              <SolicitarCita />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/citas"
          element={
            <ProtectedRoute
              rolesPermitidos={["ADMIN", "RECEPCIONISTA"]}
            >
              <GestionCitas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/mis-citas-medico"
          element={
            <ProtectedRoute rolesPermitidos={["MEDICO"]}>
              <MisCitasMedico />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/especialidades"
          element={
            <ProtectedRoute rolesPermitidos={["ADMIN", "RECEPCIONISTA"]}>
              <GestionEspecialidades />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/medicos"
          element={
            <ProtectedRoute rolesPermitidos={["ADMIN", "RECEPCIONISTA"]}>
              <GestionMedicos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/pacientes"
          element={
            <ProtectedRoute rolesPermitidos={["ADMIN", "RECEPCIONISTA"]}>
              <GestionPacientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/paciente/perfil"
          element={
            <ProtectedRoute rolesPermitidos={["PACIENTE"]}>
              <PerfilPaciente />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/usuarios"
          element={
            <ProtectedRoute rolesPermitidos={["ADMIN"]}>
              <GestionUsuarios />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;