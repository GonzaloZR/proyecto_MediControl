import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, rolesPermitidos }) {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;