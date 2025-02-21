import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/NightsStay";
import LightModeIcon from "@mui/icons-material/WbSunny";
import { Box, Drawer, IconButton, List, ListItemIcon, ListItemText, Switch, Typography } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import React from "react";
import styles from "./index.module.css";

const DrawerComponent = ({ isMobile, mobileOpen, handleDrawerToggle, darkMode, toggleTheme, setLogoutDialogOpen }) => {
  return (
    <Drawer variant={isMobile ? "temporary" : "permanent"} open={isMobile ? mobileOpen : true} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} className={styles.drawerRoot} classes={{ paper: styles.drawerPaper }}>
      <List className={styles.listContainer}>
        <ListItemButton className={styles.listItemButtonCenter}>
          <ListItemIcon className={styles.dashboardIconWrapper}>
            <DashboardIcon className={styles.iconWhite} />
          </ListItemIcon>
        </ListItemButton>

        <ListItemButton className={styles.listItemButton}>
          <ListItemIcon className={styles.listItemIcon}>
            <HomeIcon className={styles.iconWhite} />
          </ListItemIcon>
          <ListItemText primary="Home" className={styles.listItemText} />
        </ListItemButton>

        <Box className={styles.switchContainer}>
          <Typography variant="body2" className={styles.switchText}>
            Switch between light and dark mode 🌇
          </Typography>
          <Box className={styles.switchBox}>
            <IconButton onClick={toggleTheme} color="inherit">
              {darkMode ? <LightModeIcon className={styles.iconWhite} /> : <DarkModeIcon className={styles.iconWhite} />}
            </IconButton>

            <Switch checked={darkMode} onChange={toggleTheme} />
          </Box>
        </Box>
      </List>

      <Box className={styles.logoutWrapper}>
        <ListItemButton onClick={() => setLogoutDialogOpen(true)} className={styles.listItemButton}>
          <ListItemIcon className={styles.listItemIcon}>
            <LogoutIcon className={styles.iconWhite} />
          </ListItemIcon>
          <ListItemText primary="Log out" className={styles.listItemText} />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default DrawerComponent;
