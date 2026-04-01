'use client'
import React from "react";
import { Loader2 } from "lucide-react";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  return <>{children}</>;
};

export default ProtectedAdminRoute;
