import {
  Box,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
  useTheme
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import ExpandableText from "../ExpandableText/ExpandableText";
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
    enabled: !!linkId,
  });

  const theme = useTheme();
  const [openImageModal, setOpenImageModal] = useState(false);

  const handleOpenImageModal = () => {
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
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
    <Box
      sx={{
        p: 2,
        backgroundColor: theme.palette.background.default,
        borderRadius: "8px",
        wordBreak: "break-word",
        overflowWrap: "break-word",
        maxWidth: "100%",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold" }}>
        Name: <ExpandableText text={data?.linkName} maxLength={50} />
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold" }}>
        Title:{" "}
        <ExpandableText
          text={getTitleByLanguage(data?.usefulLinksTranslations, languageId)}
          maxLength={50}
        />
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold" }}>
        Link: <ExpandableText text={data?.link} maxLength={60} isLink />
      </Typography>

      {data?.imagePath && (
        <CardMedia
          sx={{
            mt: 2,
            borderRadius: "8px",
            height: 300,
            width: "100%",
            objectFit: "contain",
            cursor: "pointer",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          component="img"
          image={`http://135.181.42.5:220${data.imagePath}`}
          alt={""}
          onClick={handleOpenImageModal}
        />
      )}

      <Dialog
        open={openImageModal}
        onClose={handleCloseImageModal}
        maxWidth="xl"
        sx={{
          "& .MuiDialog-paper": {
            margin: 0,
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          <CardMedia
            component="img"
            image={`http://135.181.42.5:220${data.imagePath}`}
            alt=""
            sx={{
              width: "100%",
              height: "80vh",
              objectFit: "contain",

              "@media (max-width:600px)": {
                height: "auto",
              },
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LinkViewModal;
