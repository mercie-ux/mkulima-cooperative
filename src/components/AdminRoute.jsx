import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />; // Not logged in
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" />; // Not admin
  }

  return children;
};
