import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography
} from "@mui/material";
import React from "react";

const DeleteConfirmationModal = ({ open, onClose, onConfirm }) => {
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
      <DialogContent>
        <Typography>
          Are you sure you want to delete this information?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
