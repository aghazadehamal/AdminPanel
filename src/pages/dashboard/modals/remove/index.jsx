import { Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const DeleteLinkContainer = ({ open, onClose, linkToDelete, refetch, setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar }) => {
  const queryClient = useQueryClient();

  const deleteLinkMutation = useMutation({
    mutationFn: async (id) => {
      const token = localStorage.getItem("token");
      await axios.delete(`http://135.181.42.5:220/api/home/deleteUsefulLink/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllLinks"] });
    },
  });

  const handleDelete = async () => {
    if (!linkToDelete) return;
    try {
      await deleteLinkMutation.mutateAsync(linkToDelete);
      setSnackbarMessage("Data successfully deleted!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      await refetch();
    } catch (error) {
      setSnackbarMessage("An error occurred, please try again!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      onClose();
    }
  };

  const handleClose = () => {
    document.activeElement?.blur();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth disableRestoreFocus disableEnforceFocus>
      <DialogContent>
        <Typography>Are you sure you want to delete this information?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteLinkContainer;
