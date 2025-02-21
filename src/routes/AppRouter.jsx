import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import CustomSnackbar from "@/components/customSnackbar";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";

const queryClient = new QueryClient();

const AppRouter = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleShowSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login showSnackbar={handleShowSnackbar} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard showSnackbar={handleShowSnackbar} /> : <Navigate to="/" />} />
      </Routes>

      <CustomSnackbar open={snackbarOpen} onClose={handleCloseSnackbar} message={snackbarMessage} severity={snackbarSeverity} />
    </QueryClientProvider>
  );
};

export default AppRouter;
