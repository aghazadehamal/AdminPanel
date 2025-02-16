import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";

const CreateLinkModal = ({
  modalOpen,
  handleCloseModal,
  handleSubmit,
  newLink,
  setNewLink,
  handleImageChange,
  previewImage,
  darkMode,
}) => {
  const handleTranslationChange = (index, field, value) => {
    const updatedTranslations = [...newLink.translations];
    updatedTranslations[index][field] = value;

    setNewLink({
      ...newLink,
      translations: updatedTranslations,
    });
  };

  return (
    <Dialog
      open={modalOpen}
      onClose={handleCloseModal}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          padding: "24px",
          backgroundColor: darkMode ? "#2c3e50" : "#ffffff",
          transition: "all 0.3s ease",
        },
      }}
    >
      <DialogTitle
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "22px" }}
      >
        Add New Link
      </DialogTitle>

      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <TextField
          label="Link Name"
          fullWidth
          value={newLink.linkName}
          onChange={(e) => setNewLink({ ...newLink, linkName: e.target.value })}
          required
        />

        <TextField
          label="URL"
          fullWidth
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          required
        />

        <Button variant="contained" component="label">
          Choose Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>

        {previewImage && (
          <Box sx={{ textAlign: "center" }}>
            <img
              src={previewImage}
              alt="Selected"
              style={{ width: "120px", height: "120px", borderRadius: "8px" }}
            />
          </Box>
        )}

        {newLink?.translations?.map((translation, index) => (
          <TextField
            key={translation.LanguageId}
            label={
              translation.LanguageId === 1
                ? "Title (English)"
                : translation.LanguageId === 2
                ? "Title (Azerbaijani)"
                : "Title (Arabic)"
            }
            fullWidth
            value={translation.title}
            onChange={(e) =>
              handleTranslationChange(index, "title", e.target.value)
            }
            required
            inputProps={{
              dir: translation.LanguageId === 3 ? "rtl" : "ltr",
            }}
            sx={{
              "& .MuiInputBase-input": {
                textAlign: translation.LanguageId === 3 ? "right" : "left",
              },
            }}
          />
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseModal} color="error" variant="contained">
          Close
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="success">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateLinkModal;
