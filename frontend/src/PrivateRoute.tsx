import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

export function PrivateRoute() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext deve estar dentro de um AuthProvider");
  }

  const { signed } = authContext;

  return signed ? <Outlet /> : <Navigate to="/login" replace />;
}
