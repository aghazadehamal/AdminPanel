import ExpandableText from "@/components/ExpandableText";
import {
  Box,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { BASE_IMAGE_URL } from "../../../../constants/data";
import styles from "./index.module.css";


const fetchLinkById = async (id) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.get(
    `http://135.181.42.5:220/api/home/getUsefulLinkById/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

const LinkViewModal = ({ linkId, languageId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getUsefulLinkById", linkId],
    queryFn: () => fetchLinkById(linkId),
    enabled: Boolean(linkId),

  });

  const theme = useTheme();
  const [openImageModal, setOpenImageModal] = useState(false);

  const handleOpenImageModal = () => {
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    document.activeElement?.blur();
    setOpenImageModal(false);
  };

  const getTitleByLanguage = (translations, langId) => {
    const translation = translations?.find(
      (item) => item.languageId === langId
    );
    return translation ? translation.title : "Title not found";
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Typography color="error">An error occurred!</Typography>;

  return (
    <Box className={styles.viewModalContainer}>
    <Typography variant="h6" className={styles.sectionTitle}>
      Name: <ExpandableText text={data?.linkName} maxLength={50} />
    </Typography>

    <Typography variant="h6" className={styles.sectionTitle}>
      Title:{" "}
      <ExpandableText
        text={getTitleByLanguage(data?.usefulLinksTranslations, languageId)}
        maxLength={50}
      />
    </Typography>

    <Typography variant="h6" className={styles.sectionTitle}>
      Link: <ExpandableText text={data?.link} maxLength={60} isLink />
    </Typography>

    {data?.imagePath && (
      <CardMedia
        className={styles.cardMedia}
        component="img"
        image={`${BASE_IMAGE_URL}${data.imagePath}`}
        alt=""
        onClick={handleOpenImageModal}
      />
    )}

    <Dialog
      open={openImageModal}
      onClose={handleCloseImageModal}
      maxWidth="xl"
      disableRestoreFocus
      disableEnforceFocus
      classes={{ paper: styles.dialogPaper }}
    >
      <DialogContent className={styles.dialogImageContent}>
        <CardMedia
          component="img"
          image={`http://135.181.42.5:220${data.imagePath}`}
          alt=""
          className={styles.dialogImage}
        />
      </DialogContent>
    </Dialog>
  </Box>
  );
};

export default LinkViewModal;
