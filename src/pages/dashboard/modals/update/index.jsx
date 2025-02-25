import { BASE_IMAGE_URL, createLinkData, defaultTranslations, formatEditLink, initialLinkData } from "@/constants/data";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

const UpdateLinkContainer = ({ modalOpen, handleCloseModal, refetch, darkMode, setSnackbarMessage, setSnackbarSeverity, setOpenSnackbar, editLink }) => {
  const [newLink, setNewLink] = useState(initialLinkData);
  const [previewImage, setPreviewImage] = useState(null);
  const queryClient = useQueryClient();

  const updateLinkMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const formData = new FormData();
      formData.append("Id", id);
      formData.append("Link", updatedData.url);
      formData.append("LinkName", updatedData.linkName);

      if (updatedData.imageFile && updatedData.imageFile instanceof File) {
        formData.append("ImageFile", updatedData.imageFile);
      }

      updatedData.translations.forEach((translation, index) => {
        formData.append(`UsefulLinkTranslations[${index}][LanguageId]`, translation.LanguageId);
        formData.append(`UsefulLinkTranslations[${index}][title]`, translation.title);
      });

      const token = localStorage.getItem("token");

      const response = await axios.put("http://135.181.42.5:220/api/home/updateUsefulLink", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllLinks"] });
    },
  });

  useEffect(() => {
    if (editLink) {
      const updatedTranslations = defaultTranslations.map((defaultItem) => {
        const existingTranslation = editLink.usefulLinksTranslations?.find((t) => t.languageId === defaultItem.LanguageId);

        return existingTranslation
          ? {
              LanguageId: existingTranslation.languageId,
              title: existingTranslation.title,
            }
          : { ...defaultItem, title: "" };
      });

      setPreviewImage(editLink.imagePath ? `${BASE_IMAGE_URL}${editLink.imagePath}` : null);
    }
  }, [editLink]);

  const handleTranslationChange = (index, field, value) => {
    const updatedTranslations = [...newLink.translations];
    updatedTranslations[index][field] = value;

    setNewLink({
      ...newLink,
      translations: updatedTranslations,
    });
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

  const handleSubmit = async () => {
    if (!newLink.url.trim() || !newLink.linkName.trim() || newLink.translations.some((t) => !t.title.trim())) {
      setSnackbarMessage("Please fill in all fields!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const linkData = createLinkData(newLink);

    try {
      await updateLinkMutation.mutateAsync({
        id: editLink.id,
        updatedData: linkData,
      });

      setSnackbarMessage("Link successfully updated!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setPreviewImage(null);
      handleCloseModal();

      await refetch();
    } catch (error) {
      setSnackbarMessage(error.message || "An error occurred!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    if (editLink) {
      setNewLink(formatEditLink(editLink));
      setPreviewImage(editLink.imagePath ? `${BASE_IMAGE_URL}${editLink.imagePath}` : null);
    }
  }, [editLink]);

  const handleModalClose = () => {
    document.activeElement?.blur();
    handleCloseModal();
  };

  return (
    <Dialog
      open={modalOpen}
      onClose={handleModalClose}
      maxWidth="sm"
      fullWidth
      disableRestoreFocus
      disableEnforceFocus
      classes={{
        paper: darkMode ? styles.dialogPaperDark : styles.dialogPaper,
      }}
    >
      <DialogTitle className={styles.dialogTitle}>Edit Link</DialogTitle>

      <DialogContent className={styles.dialogContent}>
        <TextField label="Link Name" value={newLink.linkName} onChange={(e) => setNewLink({ ...newLink, linkName: e.target.value })} className={styles.dialogInput} required />

        <TextField label="URL" value={newLink.url} onChange={(e) => setNewLink({ ...newLink, url: e.target.value })} className={styles.dialogInput} required />

        <Button variant="contained" component="label" className={styles.dialogButton}>
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
            label={translation.LanguageId === 1 ? "Title (English)" : translation.LanguageId === 2 ? "Title (Azerbaijani)" : "Title (العربية)"}
            value={translation.title}
            onChange={(e) => handleTranslationChange(index, "title", e.target.value)}
            className={styles.dialogInput}
            inputProps={{
              dir: translation.LanguageId === 3 ? "rtl" : "ltr",
            }}
            InputProps={{
              className: translation.LanguageId === 3 ? styles.translationInputRight : styles.translationInputLeft,
            }}
            required
          />
        ))}
      </DialogContent>

      <DialogActions className={styles.dialogActions}>
        <Button onClick={handleModalClose} color="error" variant="contained">
          Close
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="success">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateLinkContainer;
