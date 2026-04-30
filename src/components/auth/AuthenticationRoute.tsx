import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";

function AuthenticationRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();

  if (user) return <Navigate to="/" replace />;

  return children;
}

export default AuthenticationRoute;
