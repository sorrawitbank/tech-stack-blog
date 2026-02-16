import type { Role } from "@/types/user";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";

interface Props {
  requiredRole: Role;
  children: React.ReactNode;
}

function ProtectedRoute(props: Props) {
  const { user, isAuthenticated, isGetUserLoading } = useAuthContext();

  if (isGetUserLoading === null) return;

  if (!isAuthenticated || user?.role !== props.requiredRole) {
    if (props.requiredRole === "admin") return <Navigate to="/admin" />;

    return <Navigate to="/login" />;
  }

  return props.children;
}

export default ProtectedRoute;
