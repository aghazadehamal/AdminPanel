import LanguageSelector from "@/components/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, IconButton, Typography } from "@mui/material";
import styles from "./index.module.css";

const HeaderActions = ({ handleOpenCreateModal, languageId, setLanguageId, setUserModalOpen, fullName }) => {
  const handleOpenUserModal = () => {
    setUserModalOpen(true);
  };

  return (
    <Box className={styles.headerContainer}>
      <Box className={styles.userBox} onClick={handleOpenUserModal}>
        <IconButton className={styles.iconButtonPrimary}>
          <AccountCircleIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <Typography variant="body1" className={styles.userNameText}>
          {fullName || "User"}
        </Typography>
      </Box>

      <Box className={styles.actionsBox}>
        <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={handleOpenCreateModal}>
          Add New Staff
        </Button>

        <LanguageSelector languageId={languageId} setLanguageId={setLanguageId} />
      </Box>
    </Box>
  );
};

export default HeaderActions;
