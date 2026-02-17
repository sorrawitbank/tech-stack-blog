import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";

function AdminRedirectRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();

  if (user?.role === "admin") {
    return <Navigate to="/admin/article" replace />;
  }

  return children;
}

export default AdminRedirectRoute;
