export const handleDeleteClick = (id, setLinkToDelete, setDeleteDialogOpen) => {
  setLinkToDelete(id);
  setDeleteDialogOpen(true);
};

export const handleViewLink = (id, setSelectedLinkId, setViewModalOpen) => {
  setSelectedLinkId(id);
  setViewModalOpen(true);
};

export const handleEdit = (link, setEditLink, setUpdateModalOpen) => {
  setEditLink(link);
  setUpdateModalOpen(true);
};

export const handleOpenCreateModal = (setCreateModalOpen, setNewLink, initialLinkData, setPreviewImage) => {
  setCreateModalOpen(true);
  setNewLink(initialLinkData);
  setPreviewImage(null);
};

export const handleCloseViewModal = (setViewModalOpen, setSelectedLinkId) => {
  setViewModalOpen(false);
  setSelectedLinkId(null);
};

export const handleLogoutClose = (setLogoutDialogOpen) => {
  setLogoutDialogOpen(false);
};

export const handleLogoutConfirm = (dispatch, logout, navigate) => {
  dispatch(logout());
  navigate("/");
};

export const handleDrawerToggle = (setMobileOpen, mobileOpen) => {
  setMobileOpen(!mobileOpen);
};

export const handleCloseModal = (setModalOpen) => {
  setModalOpen(false);
};
