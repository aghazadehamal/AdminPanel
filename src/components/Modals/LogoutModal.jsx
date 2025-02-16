import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import React from "react";

const LogoutModal = ({ open, onClose, onLogoutConfirm }) => {
  const handleClose = () => {
    document.activeElement?.blur();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      disableRestoreFocus
      disableEnforceFocus
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Are you sure you want to log out? You will need to log in again after
        logging out.
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center" }}>
        <Typography color="textSecondary">
          Do you really want to log out? You will have to sign in again
          afterward.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            document.activeElement?.blur();
            onLogoutConfirm();
          }}
          variant="contained"
          color="error"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutModal;
