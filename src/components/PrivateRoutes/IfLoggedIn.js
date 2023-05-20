import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export const IfLoggedIn = () => {
  const LoginToken = localStorage.getItem("token");
  return LoginToken ? <Outlet /> : <Navigate to="/login" />;
};
