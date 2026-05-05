"use client";
import { useAuthStore } from "../stores/useAuthStore";
import type { JSX } from "react";
import Unauthorized from "./Unauthorized";
import { UserRoles } from "../types/user";
import AdminOnly from "./AdminOnly";

interface ProtectedRouteProps {
  children: JSX.Element;
  adminOnly?: boolean; 
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-[#E0234E] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Unauthorized />;
  }

  if (adminOnly && user.role !== UserRoles.ADMIN) {
    return <AdminOnly />;
  }

  return children;
};

export default ProtectedRoute;
