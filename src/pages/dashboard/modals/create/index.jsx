import { BASE_URL, getInitialLinkData } from "@/constants/data";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import styles from "./index.module.css";

const CreateLinkModal = ({ modalOpen, handleCloseModal, refetch, darkMode, setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar }) => {
  const [newLink, setNewLink] = useState(getInitialLinkData());
  const [previewImage, setPreviewImage] = useState(null);

  const queryClient = useQueryClient();

  const createLinkMutation = useMutation({
    mutationFn: async (linkData) => {
      const formData = new FormData();
      formData.append("Link", linkData.url);
      formData.append("LinkName", linkData.linkName);
      formData.append("ImageFile", linkData.imageFile);

      linkData.translations.forEach((translation, index) => {
        formData.append(`UsefulLinkTranslations[${index}][LanguageId]`, translation.LanguageId);
        formData.append(`UsefulLinkTranslations[${index}][title]`, translation.title);
      });

      const token = localStorage.getItem("token");
      const response = await axios.post(`${BASE_URL}/api/home/createUsefulLink`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.datas;
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(["getAllLinks"], (oldData) => {
        if (!oldData) return { datas: [newData] };
        return {
          ...oldData,
          datas: [newData, ...oldData.datas],
        };
      });
      setSnackbarMessage("Link successfully added!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      handleCloseModal();
      setNewLink(getInitialLinkData());
      setPreviewImage(null);
      refetch();
    },
    onError: (error) => {
      setSnackbarMessage(error.message || "An error occurred!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    },
  });

  const handleTranslationChange = (index, field, value) => {
    const updatedTranslations = [...newLink.translations];
    updatedTranslations[index][field] = value;

    setNewLink({
      ...newLink,
      translations: updatedTranslations,
    });
  };

  const handleModalClose = () => {
    document.activeElement?.blur();
    handleCloseModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewLink({
        ...newLink,
        imageFile: file,
      });

      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
    }
  };

  const handleSubmit = () => {
    if (!newLink.url.trim() || !newLink.linkName.trim() || !newLink.imageFile || newLink.translations.some((t) => !t.title.trim())) {
      setSnackbarMessage("Please fill in all fields!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    createLinkMutation.mutate(newLink);
  };

  return (
    <Dialog open={modalOpen} onClose={handleModalClose} maxWidth="sm" fullWidth disableRestoreFocus disableEnforceFocus classes={{ paper: darkMode ? styles.dialogPaperDark : styles.dialogPaper }}>
      <DialogTitle className={styles.dialogTitle}>Add New Link</DialogTitle>

      <DialogContent className={styles.dialogContent}>
        <TextField label="Link Name" fullWidth value={newLink.linkName} onChange={(e) => setNewLink({ ...newLink, linkName: e.target.value })} required />

        <TextField label="URL" fullWidth value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} required />

        <Button variant="contained" component="label" className={styles.dialogImageInput}>
          Choose Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>

        {previewImage && (
          <Box className={styles.previewImageBox}>
            <img src={previewImage} alt="Selected" className={styles.previewImage} />
          </Box>
        )}

        {newLink?.translations?.map((translation, index) => (
          <TextField
            key={translation.LanguageId}
            label={translation.LanguageId === 1 ? "Title (English)" : translation.LanguageId === 2 ? "Title (Azerbaijani)" : "Title (Arabic)"}
            fullWidth
            value={translation.title}
            onChange={(e) => handleTranslationChange(index, "title", e.target.value)}
            required
            inputProps={{
              dir: translation.LanguageId === 3 ? "rtl" : "ltr",
            }}
            className={translation.LanguageId === 3 ? styles.translationInputRight : styles.translationInputLeft}
          />
        ))}
      </DialogContent>

      <DialogActions className={styles.dialogActions}>
        <Button onClick={handleModalClose} color="error" variant="contained">
          Close
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="success" disabled={createLinkMutation.isLoading}>
          {createLinkMutation.isLoading ? "Adding..." : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateLinkModal;
