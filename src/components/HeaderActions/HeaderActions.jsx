import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, IconButton, Typography } from "@mui/material";
import LanguageSelector from "../Language/Language";

const HeaderActions = ({
  handleOpenCreateModal,
  languageId,
  setLanguageId,
  setUserModalOpen,
  fullName,
}) => {
  const handleOpenUserModal = () => {
    setUserModalOpen(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
        }}
        onClick={handleOpenUserModal}
      >
        <IconButton color="primary">
          <AccountCircleIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {fullName || "User"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={handleOpenCreateModal}
        >
          Add New Staff
        </Button>

        <LanguageSelector
          languageId={languageId}
          setLanguageId={setLanguageId}
        />
      </Box>
    </Box>
  );
};

export default HeaderActions;
