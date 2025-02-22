import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";

import { ThemeContext } from "@/components/tehemeContext/ThemeContext";
import styles from "./index.module.css";

const fetchUserById = async () => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get("http://135.181.42.5:220/api/auth/getUserById", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

const UserModal = ({ userId, onClose }) => {
  const { darkMode } = useContext(ThemeContext);
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userById"],
    queryFn: fetchUserById,
    enabled: Boolean(userId),
  });

  const handleClose = () => {
    document.activeElement?.blur();
    onClose();
  };

  return (
    <Dialog open={Boolean(userId)} onClose={handleClose} maxWidth="sm" fullWidth disableRestoreFocus disableEnforceFocus className={darkMode ? "darkMode" : ""}>
      <DialogTitle className={styles.dialogTitle}>User Information</DialogTitle>

      <DialogContent>
        {isLoading && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" className={styles.userName}>
            An error occurred! Data could not be retrieved.
          </Typography>
        )}

        {userData && (
          <Box className={styles.dialogContent}>
            <Box className={styles.avatarBox}>
              {userData.avatar ? (
                <img src={`http://135.181.42.5:220${userData.avatar}`} alt="User Avatar" className={styles.avatarImage} />
              ) : (
                <Box className={styles.avatarPlaceholder}>
                  <AccountCircleIcon sx={{ fontSize: 80, color: "#9e9e9e" }} />
                </Box>
              )}
            </Box>

            <Typography variant="h6" className={styles.userName}>
              {userData.fullName || "Name not available"}
            </Typography>

            <Typography sx={{ color: darkMode ? "white" : "black" }}>Email: {userData.email}</Typography>

            <Typography variant="body1" className={styles.userInfoText}>
              Role: <strong>{userData.role || "admin"}</strong>
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions className={styles.dialogActions}>
        <Button onClick={handleClose} variant="contained" color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
