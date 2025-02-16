import { yupResolver } from "@hookform/resolvers/yup";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmailIcon from "@mui/icons-material/Email";
import { Divider } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useLoginUserMutation } from "../../api/authApi";
import { loginSuccess } from "../../store/authSlice";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography
} from "@mui/material";
import { motion } from "framer-motion";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required."),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data).unwrap();
      const { accessToken, userId } = response;
      localStorage.setItem("token", accessToken);
      dispatch(loginSuccess({ token: accessToken, userId }));
      setOpenSnackbar(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex" }}>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flex: 1,
          backgroundImage: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          px: 3,
          "&:hover": {
            transform: "scale(1.02)",
            transition: "transform 0.3s ease-in-out",
          },
        }}
      >
        <DashboardIcon sx={{ fontSize: 70, mb: 1 }} />
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          <span style={{ color: "#FFD700" }}>Admin</span> Panel
        </Typography>
        <Divider
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            width: "60%",
            mt: 1,
            mb: 2,
          }}
        />
        <Typography variant="subtitle1" sx={{ mt: 1, opacity: 0.8 }}>
          Your Control Hub – Manage with Confidence
        </Typography>
      </Box>

      <Box
        sx={(theme) => ({
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.palette.background.default,
        })}
      >
        <Paper
          elevation={3}
          sx={(theme) => ({
            padding: 4,
            width: "100%",
            maxWidth: "400px",
            borderRadius: "16px",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          })}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h5"
              sx={(theme) => ({
                marginBottom: 3,
                textAlign: "center",
                fontWeight: "bold",
                color: theme.palette.text.primary,
              })}
            >
              Login
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth margin="normal">
                <FormLabel>Email</FormLabel>
                <TextField
                  {...register("email")}
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              <FormControl fullWidth margin="normal">
                <FormLabel>Password</FormLabel>
                <TextField
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  disabled={isLoading}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              {error && (
                <Alert severity="error" sx={{ my: 2 }}>
                  Login failed, please try again.
                </Alert>
              )}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<LoginIcon />}
                  fullWidth
                  disabled={isLoading}
                  sx={{
                    mt: 2,
                    background: "linear-gradient(to right, #1e3c72, #2a5298)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(to right, #16325c, #1e3c72)",
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Login"
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </Paper>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Login successful!"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        ContentProps={{
          sx: { backgroundColor: "#1e88e5", color: "#fff", fontWeight: "bold" },
        }}
      />
    </Box>
  );
};

export default Login;
