import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/NightsStay";
import LightModeIcon from "@mui/icons-material/WbSunny";
import ListItemButton from "@mui/material/ListItemButton";

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography
} from "@mui/material";
import React from "react";

const DrawerComponent = ({
  isMobile,
  mobileOpen,
  handleDrawerToggle,
  darkMode,
  toggleTheme,
  setLogoutDialogOpen,
}) => {
  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : true}
      onClose={handleDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: 240,
        flexShrink: 0,
        display: "block",
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          background: "#2c3e50",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 2,
          pl: 2,
          mt: { xs: 7, sm: 2 },
        }}
      >
        <ListItemButton
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            pl: 0,
            cursor: "pointer",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "50px",
              transform: "scale(1.5)",

              "@media (max-width:600px)": {
                marginTop: "8px",
              },
            }}
          >
            <DashboardIcon sx={{ color: "#ffffff" }} />
          </ListItemIcon>
        </ListItemButton>

        <ListItemButton
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            pl: 0,
            cursor: "pointer",
          }}
        >
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <HomeIcon sx={{ color: "#ffffff" }} />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ color: "#ffffff", ml: -1 }} />
        </ListItemButton>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "#b0bec5", fontStyle: "italic" }}
          >
            Switch between light and dark mode 🌇
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <Switch checked={darkMode} onChange={toggleTheme} />
          </Box>
        </Box>
      </List>

      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={() => setLogoutDialogOpen(true)}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            pl: 0,
            cursor: "pointer",
          }}
        >
          <ListItemIcon sx={{ minWidth: "40px" }}>
            <LogoutIcon sx={{ color: "#ffffff" }} />
          </ListItemIcon>
          <ListItemText primary="Log out" sx={{ color: "#ffffff", ml: -1 }} />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
