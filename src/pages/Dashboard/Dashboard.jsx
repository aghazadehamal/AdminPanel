import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../../components/Modals/LogoutModal";
import UserModal from "../../components/Modals/UserModal";
import { ThemeContext } from "../../components/TehemeContext/ThemeContext";

import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Paper,
  Table,
  TableContainer,
  useMediaQuery
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import React, { useContext, useState } from "react";
import { useGetUserByIdQuery } from "../../api/authApi";
import CreateLinkModal from "../../components/Modals/CreateLinkModal";
import DeleteConfirmationModal from "../../components/Modals/DeleteConfirmationModal";
import LinkViewModal from "../../components/Modals/LinkViewModal";
import UpdateLinkModal from "../../components/Modals/UpdateLinkModal";

import createLink from "../../components/CrudOperation/CreateLink";
import deleteLink from "../../components/CrudOperation/DeleteLink";
import getAllLinks from "../../components/CrudOperation/GetAllLinks";
import updateLink from "../../components/CrudOperation/UpdateLink";
import DrawerComponent from "../../components/sideBar/ DrawerKomponent";
import TableBodyComponent from "../../components/Table/TableBodyComponent";
import TableHeadComponent from "../../components/Table/TableHeadComponent";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import HeaderActions from "../../components/HeaderActions/HeaderActions";

const Dashboard = () => {
  const userId = useSelector((state) => state.auth.userId);

  const [editLink, setEditLink] = useState(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [previewImage, setPreviewImage] = useState(null);
  const [userModalOpen, setUserModalOpen] = useState(false);

  const createLinkMutation = createLink();
  const updateLinkMutation = updateLink();
  const deleteLinkMutation = deleteLink();
  const [languageId, setLanguageId] = useState(1);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const { data, isLoading, error, refetch } = getAllLinks();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 10;

  const paginatedData = data?.datas.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil((data?.datas.length || 0) / limit);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const {
    data: userData,
    isLoading: isLoadingUser,
    error: userError,
  } = useGetUserByIdQuery(userId);

  const [newLink, setNewLink] = useState({
    title: "",
    url: "",
    linkName: "",
    imageFile: null,
    translations: [
      { LanguageId: 1, title: "" },
      { LanguageId: 2, title: "" },
      { LanguageId: 3, title: "" },
    ],
  });

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
    setNewLink({
      title: "",
      url: "",
      linkName: "",
      imageFile: null,
      translations: [
        { LanguageId: 1, title: "" },
        { LanguageId: 2, title: "" },
        { LanguageId: 3, title: "" },
      ],
    });
    setPreviewImage(null);
  };

  const handleOpenUpdateModal = (link) => {
    setUpdateModalOpen(true);
    setEditLink(link);

    const defaultTranslations = [
      { LanguageId: 1, title: "English Title" },
      { LanguageId: 2, title: "Azerbaijani Title" },
      { LanguageId: 3, title: "Arabic Title" },
    ];

    const updatedTranslations = defaultTranslations.map((defaultItem) => {
      const existingTranslation = link.usefulLinksTranslations?.find(
        (t) => t.languageId === defaultItem.LanguageId
      );
      return existingTranslation
        ? {
            LanguageId: existingTranslation.languageId,
            title: existingTranslation.title,
          }
        : { ...defaultItem, title: "" };
    });

    setNewLink({
      url: link.link,
      linkName: link.linkName,
      imageFile: null,
      translations: updatedTranslations,
    });

    setPreviewImage(
      link.imagePath ? `http://135.181.42.5:220${link.imagePath}` : null
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedLinkId(null);
  };

  const handleLogoutClose = () => setLogoutDialogOpen(false);

  const handleLogoutConfirm = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleUserModalClose = () => setUserModalOpen(false);

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

  const handleCreateLink = async () => {
    if (
      !newLink.url.trim() ||
      !newLink.linkName.trim() ||
      !newLink.imageFile ||
      newLink.translations.some((t) => !t.title.trim())
    ) {
      setSnackbarMessage("Please fill in all fields!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const linkData = {
      url: newLink.url,
      linkName: newLink.linkName,
      imageFile: newLink.imageFile,
      translations: newLink.translations,
    };

    try {
      await createLinkMutation.mutateAsync(linkData);

      setSnackbarMessage("Link successfully added!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setNewLink({
        title: "",
        url: "",
        linkName: "",
        imageFile: null,
        translations: [
          { LanguageId: 1, title: "" },
          { LanguageId: 2, title: "" },
          { LanguageId: 3, title: "" },
        ],
      });

      setPreviewImage(null);
      setCreateModalOpen(false);

      await refetch();
    } catch (error) {
      setSnackbarMessage(error.message || "An error occurred!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleUpdateLink = async () => {
    if (
      !newLink.url.trim() ||
      !newLink.linkName.trim() ||
      newLink.translations.some((t) => !t.title.trim())
    ) {
      setSnackbarMessage("Please fill in all fields!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const linkData = {
      url: newLink.url,
      linkName: newLink.linkName,
      imageFile: newLink.imageFile,
      translations: newLink.translations,
    };

    try {
      await updateLinkMutation.mutateAsync({
        id: editLink.id,
        updatedData: linkData,
      });

      setSnackbarMessage("Link successfully updated!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setEditLink(null);
      setNewLink({ title: "", url: "", linkName: "", imageFile: null });
      setUpdateModalOpen(false);

      await refetch();
    } catch (error) {
      setSnackbarMessage(error.message || "n error occurred!");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleDeleteClick = (id) => {
    setLinkToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
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
      setDeleteDialogOpen(false);
      setLinkToDelete(null);
    }
  };

  const handleViewLink = (id) => {
    setSelectedLinkId(id);
    setViewModalOpen(true);
  };

  const handleEdit = (link) => {
    setEditLink(link);
    setNewLink({
      ...newLink,
      linkName: link.linkName,
      url: link.link,
      imageFile: link.imagePath
        ? `http://135.181.42.5:220${link.imagePath}`
        : null,
    });

    setPreviewImage(
      link.imagePath ? `http://135.181.42.5:220${link.imagePath}` : null
    );
    handleOpenUpdateModal(link);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        onClick={scrollToBottom}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "green",
          color: "white",
          "&:hover": { backgroundColor: "darkgreen" },
        }}
      >
        <ArrowDownwardIcon />
      </IconButton>

      <IconButton
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: 80,
          right: 20,
          backgroundColor: "blue",
          color: "white",
          "&:hover": { backgroundColor: "darkblue" },
        }}
      >
        <ArrowUpwardIcon />
      </IconButton>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        ContentProps={{
          sx: {
            backgroundColor:
              snackbarSeverity === "success" ? "#4caf50" : "#d32f2f",
            color: "#ffffff",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "12px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          },
        }}
        message={
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {snackbarSeverity === "success" ? (
              <CheckCircleIcon fontSize="small" sx={{ color: "#fff" }} />
            ) : (
              <ErrorIcon fontSize="small" sx={{ color: "#fff" }} />
            )}
            {snackbarMessage}
          </Box>
        }
      />

      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            display: { xs: "block", sm: "none" },
            position: "absolute",
            top: 24,
            left: 10,
            zIndex: 1300,
          }}
        >
          <MenuIcon sx={{ fontSize: "32px", color: "#4CAF50" }} />
        </IconButton>
      )}

      <DrawerComponent
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        setUserModalOpen={setUserModalOpen}
        setLogoutDialogOpen={setLogoutDialogOpen}
      />

      <Box
        sx={{
          flexGrow: 1,
          padding: "20px",
          color: darkMode ? "#ffffff" : "#000000",
          display: { xs: "none", sm: "block" },
        }}
      ></Box>

      <Box sx={{ flexGrow: 1, padding: "20px", width: "100%" }}>
        <HeaderActions
          handleOpenCreateModal={handleOpenCreateModal}
          languageId={languageId}
          setLanguageId={setLanguageId}
          setUserModalOpen={setUserModalOpen}
          fullName={userData?.fullName}
        />

        {userModalOpen && (
          <UserModal userId={userId} onClose={handleUserModalClose} />
        )}

        {logoutDialogOpen && (
          <LogoutModal
            open={logoutDialogOpen}
            onClose={handleLogoutClose}
            onLogoutConfirm={handleLogoutConfirm}
          />
        )}

        <DeleteConfirmationModal
          open={deleteDialogOpen}
          onClose={() => {
            document.activeElement?.blur();
            setDeleteDialogOpen(false);
          }}
          onConfirm={confirmDelete}
        />

        <CreateLinkModal
          modalOpen={createModalOpen}
          handleCloseModal={() => {
            document.activeElement?.blur();
            setCreateModalOpen(false);
          }}
          handleSubmit={handleCreateLink}
          newLink={newLink}
          setNewLink={setNewLink}
          handleImageChange={handleImageChange}
          previewImage={previewImage}
          darkMode={darkMode}
        />

        <UpdateLinkModal
          modalOpen={updateModalOpen}
          handleCloseModal={() => {
            document.activeElement?.blur();
            setUpdateModalOpen(false);
          }}
          handleSubmit={handleUpdateLink}
          newLink={newLink}
          setNewLink={setNewLink}
          handleImageChange={handleImageChange}
          previewImage={previewImage}
          darkMode={darkMode}
        />

        <Dialog
          open={viewModalOpen}
          onClose={() => {
            document.activeElement?.blur();
            handleCloseViewModal();
          }}
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
            <Button
              onClick={() => {
                document.activeElement?.blur();
                handleCloseViewModal();
              }}
              color="error"
              variant="contained"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
          <Table sx={{ minWidth: "100%" }}>
            <TableHeadComponent darkMode={darkMode} />
            <TableBodyComponent
              isLoading={isLoading}
              data={{ datas: paginatedData }}
              darkMode={darkMode}
              handleDelete={handleDeleteClick}
              handleViewLink={handleViewLink}
              handleEdit={handleEdit}
              languageId={languageId}
              page={page}
              limit={limit}
            />
          </Table>
        </TableContainer>

        {data && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
