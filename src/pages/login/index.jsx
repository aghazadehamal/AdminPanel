import { BASE_URL } from "@/constants/data";
import { loginSuccess } from "@/store/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmailIcon from "@mui/icons-material/Email";
import LoginIcon from "@mui/icons-material/Login";
import { Alert, Box, Button, CircularProgress, Divider, FormControl, FormLabel, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import styles from "./index.module.css";

const loginUserApi = async (userData) => {
  const { data } = await axios.post(`${BASE_URL}/api/auth/login`, userData);
  return data;
};

const schema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required."),
});

const LoginContainer = ({ showSnackbar }) => {
  const dispatch = useDispatch();

  const {
    mutate: loginUser,
    isPending: isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: loginUserApi,
  });

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    loginUser(data, {
      onSuccess: (response) => {
        const { accessToken, userId } = response;
        dispatch(loginSuccess({ token: accessToken, userId }));
        showSnackbar("Login successful!", "success");
      },
      onError: () => {
        showSnackbar("Login failed!", "error");
      },
    });
  };

  return (
    <Box className={styles.loginContainer}>
      <Box className={styles.sidebar}>
        <DashboardIcon className={styles.dashboardIcon} />
        <Typography variant="h3" className={styles.adminText}>
          <span className={styles.adminTextGold}>Admin</span> Panel
        </Typography>
        <Divider className={styles.sidebarDivider} />
        <Typography variant="subtitle1" className={styles.sidebarSubtitle}>
          Your Control Hub – Manage with Confidence
        </Typography>
      </Box>

      <Box className={styles.formWrapper}>
        <Paper elevation={3} className={styles.paper}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Typography variant="h5" className={styles.formTitle}>
              Login
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth margin="normal">
                <FormLabel>Email</FormLabel>
                <TextField
                  {...register("email")}
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.email)}
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
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  disabled={isLoading}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>

              {isError && (
                <Alert severity="error" className={styles.errorAlert}>
                  {error?.response?.data?.message || "Login failed, please try again."}
                </Alert>
              )}

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button type="submit" variant="contained" startIcon={<LoginIcon />} fullWidth disabled={isLoading} className={styles.submitButton}>
                  {isLoading ? <CircularProgress size={24} className={styles.circularProgress} /> : "Login"}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </Paper>
      </Box>
    </Box>
  );
};

export default LoginContainer;
