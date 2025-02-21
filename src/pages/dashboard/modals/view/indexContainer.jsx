import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import LinkViewModal from ".";

const ViewLinkContainer = ({
  open,
  handleClose,
  selectedLinkId,
  languageId,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableRestoreFocus
      disableEnforceFocus
      sx={{
        "& .MuiDialog-paper": {
          width: "500px",
          height: "auto",
        },
      }}
    >
      <DialogContent>
        {selectedLinkId && (
          <LinkViewModal
            key={`${selectedLinkId}-${languageId}`}
            linkId={selectedLinkId}
            languageId={languageId}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewLinkContainer;
