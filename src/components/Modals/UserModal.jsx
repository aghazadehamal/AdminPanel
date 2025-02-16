import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import React from "react";
import { useGetUserByIdQuery } from "../../api/authApi";

const UserModal = ({ userId, onClose }) => {
  const {
    data: userData,
    isLoading: isLoadingUser,
    error: userError,
  } = useGetUserByIdQuery(userId);

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{ textAlign: "center", fontWeight: "bold", fontSize: "22px" }}
      >
        User Information
      </DialogTitle>
      <DialogContent>
        {isLoadingUser && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        )}

        {userError && (
          <Typography
            color="error"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            An error occurred! Data could not be retrieved.
          </Typography>
        )}

        {userData && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            my={2}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "50%",
                overflow: "hidden",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
              }}
            >
              {userData?.avatar ? (
                <img
                  src={`http://135.181.42.5:220${userData.avatar}`}
                  alt="User Avatar"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <AccountCircleIcon sx={{ fontSize: 80, color: "#9e9e9e" }} />
                </Box>
              )}
            </Box>

            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {userData.fullName || "Name not available"}
            </Typography>

            <Typography variant="body1" color="textSecondary">
              Email: {userData.email}
            </Typography>

            <Typography variant="body1" color="textSecondary">
              Role: <strong>{userData.role || "admin"}</strong>
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
        <Button onClick={onClose} variant="contained" color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
