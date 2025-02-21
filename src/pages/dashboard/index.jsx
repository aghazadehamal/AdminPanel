import { ThemeContext } from "@/components/tehemeContext/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CreateLinkContainer from "@/pages/dashboard/modals/create";
import LogoutModal from "@/pages/dashboard/modals/logout";
import DeleteLinkContainer from "@/pages/dashboard/modals/remove";
import UpdateLinkContainer from "@/pages/dashboard/modals/update";
import UserModal from "@/pages/dashboard/modals/user";
import ViewLinkContainer from "@/pages/dashboard/modals/view/indexContainer";

import { useGetUserByIdQuery } from "@/api/authApi";
import { logout } from "@/store/authSlice";

import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Paper, Table, TableContainer, useMediaQuery } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import React, { useContext, useState } from "react";

import DrawerComponent from "@/components/drawerKomponent";

import getAllLinks from "@/components/crudOperation/GetAllLinks";
import TableBodyComponent from "@/components/table/TableBodyComponent";
import TableHeadComponent from "@/components/table/TableHeadComponent";

import CustomSnackbar from "@/components/customSnackbar";
import HeaderActions from "@/components/headerActions";
import ScrollButtons from "@/components/ScrollButtons";

import { initialLinkData, PAGE_LIMIT } from "@/constants/data";

import { handleCloseModal, handleCloseViewModal, handleDeleteClick as deleteHandler, handleDrawerToggle, handleEdit as editHandler, handleLogoutClose, handleLogoutConfirm, handleOpenCreateModal, handleViewLink as viewHandler } from "@/pages/dashboard/dashboardHandlers";

import styles from "./index.module.css";

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

  const [languageId, setLanguageId] = useState(1);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const { data, isLoading, error, refetch } = getAllLinks();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState(null);

  const [page, setPage] = useState(1);
  const limit = PAGE_LIMIT;
  const dispatch = useDispatch();

  const paginatedData = data?.datas.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil((data?.datas.length || 0) / limit);

  const navigate = useNavigate();

  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { data: userData, isLoading: isLoadingUser, error: userError } = useGetUserByIdQuery(userId);

  const [newLink, setNewLink] = useState(initialLinkData);

  const toggleDrawer = () => handleDrawerToggle(setMobileOpen, mobileOpen);

  const openCreateModal = () => handleOpenCreateModal(setCreateModalOpen, setNewLink, initialLinkData, setPreviewImage);

  const closeViewModal = () => handleCloseViewModal(setViewModalOpen, setSelectedLinkId);

  const closeLogoutModal = () => handleLogoutClose(setLogoutDialogOpen);

  const confirmLogout = () => handleLogoutConfirm(dispatch, logout, navigate);

  const closeSnackbar = () => setOpenSnackbar(false);

  const closeDeleteModal = () => handleCloseModal(setDeleteDialogOpen);
  const closeCreateModal = () => handleCloseModal(setCreateModalOpen);
  const closeUpdateModal = () => handleCloseModal(setUpdateModalOpen);

  const handleUserModalClose = () => setUserModalOpen(false);

  const onDeleteClick = (id) => deleteHandler(id, setLinkToDelete, setDeleteDialogOpen);

  const onViewLink = (id) => viewHandler(id, setSelectedLinkId, setViewModalOpen);

  const onEdit = (link) => editHandler(link, setEditLink, setUpdateModalOpen);

  return (
    <Box className={styles.dashboardRoot}>
      <ScrollButtons />

      <CustomSnackbar open={openSnackbar} onClose={closeSnackbar} message={snackbarMessage} severity={snackbarSeverity} />

      {isMobile && (
        <IconButton onClick={toggleDrawer} className={styles.menuButton}>
          <MenuIcon className={styles.menuIcon} />
        </IconButton>
      )}

      <DrawerComponent isMobile={isMobile} mobileOpen={mobileOpen} handleDrawerToggle={toggleDrawer} darkMode={darkMode} toggleTheme={toggleTheme} setUserModalOpen={setUserModalOpen} setLogoutDialogOpen={setLogoutDialogOpen} />

      <Box className={styles.hiddenOnMobile} style={{ color: darkMode ? "#ffffff" : "#000000" }}></Box>

      <Box className={styles.contentWrapper}>
        <HeaderActions handleOpenCreateModal={openCreateModal} languageId={languageId} setLanguageId={setLanguageId} setUserModalOpen={setUserModalOpen} fullName={userData?.fullName} />

        {userModalOpen && <UserModal userId={userId} onClose={handleUserModalClose} />}

        {logoutDialogOpen && <LogoutModal open={logoutDialogOpen} onClose={closeLogoutModal} onLogoutConfirm={confirmLogout} />}

        <DeleteLinkContainer open={deleteDialogOpen} onClose={closeDeleteModal} linkToDelete={linkToDelete} refetch={refetch} setSnackbarMessage={setSnackbarMessage} setSnackbarSeverity={setSnackbarSeverity} setOpenSnackbar={setOpenSnackbar} />

        <CreateLinkContainer modalOpen={createModalOpen} handleCloseModal={closeCreateModal} refetch={refetch} darkMode={darkMode} setSnackbarMessage={setSnackbarMessage} setSnackbarSeverity={setSnackbarSeverity} setOpenSnackbar={setOpenSnackbar} />

        <UpdateLinkContainer modalOpen={updateModalOpen} handleCloseModal={closeUpdateModal} refetch={refetch} darkMode={darkMode} setSnackbarMessage={setSnackbarMessage} setSnackbarSeverity={setSnackbarSeverity} setOpenSnackbar={setOpenSnackbar} editLink={editLink} />

        <ViewLinkContainer open={viewModalOpen} handleClose={closeViewModal} selectedLinkId={selectedLinkId} languageId={languageId} />

        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table sx={{ minWidth: "100%" }}>
            <TableHeadComponent darkMode={darkMode} />
            <TableBodyComponent handleDelete={onDeleteClick} handleViewLink={onViewLink} handleEdit={onEdit} isLoading={isLoading} data={{ datas: paginatedData }} darkMode={darkMode} languageId={languageId} page={page} limit={limit} />
          </Table>
        </TableContainer>

        {data && <Pagination count={totalPages} page={page} onChange={(event, value) => setPage(value)} color="primary" className={styles.paginationWrapper} />}
      </Box>
    </Box>
  );
};

export default Dashboard;
