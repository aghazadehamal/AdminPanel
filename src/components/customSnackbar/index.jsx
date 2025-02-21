import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Snackbar } from "@mui/material";
import styles from "./index.module.css";

const CustomSnackbar = ({ open, onClose, message, severity = "success" }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      ContentProps={{
        className: `${styles.snackbarContent} ${severity === "error" ? styles.snackbarError : ""}`,
      }}
      message={
        <Box className={styles.snackbarMessage}>
          {severity === "success" ? <CheckCircleIcon fontSize="small" className={styles.snackbarIcon} /> : <ErrorIcon fontSize="small" className={styles.snackbarIcon} />}
          {message}
        </Box>
      }
    />
  );
};

export default CustomSnackbar;
