import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";

const queryClient = new QueryClient();

const AppRouter = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Login />} />
        {isAuthenticated && <Route path="/dashboard" element={<Dashboard />} />}
      </Routes>
    </QueryClientProvider>
  );
};

export default AppRouter;
