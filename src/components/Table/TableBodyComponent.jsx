import SkeletonRows from "@/components/Skeletons";
import { BASE_IMAGE_URL } from "@/constants/data";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import styles from "./Table.module.css";

import { Box, CardMedia, IconButton, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TableBodyComponent = ({ isLoading, data, darkMode, handleDelete, handleViewLink, handleEdit, page, limit }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const languageId = useSelector((state) => state.language.languageId);

  const getTitleByLanguage = (translations, langId) => {
    const translation = translations?.find((item) => item.languageId === langId);
    return translation ? translation.title : "Title not found";
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <TableBody className={styles.tableBody}>
      {isLoading || !data?.datas ? (
        <SkeletonRows />
      ) : (
        data.datas.map((link, index) => (
          <TableRow key={link.id}>
            <TableCell colSpan={isMobile ? 6 : 1} align={isMobile ? "left" : "center"}>
              {isMobile ? (
                <Box className={`${styles.mobileCardContainer} ${darkMode ? styles.mobileCardContainerDarkMode : ""}`}>
                  <Typography variant="body2" className={styles.mobileCardTitle}>
                    {(page - 1) * limit + index + 1}
                  </Typography>

                  <CardMedia component="img" height="80" image={`${BASE_IMAGE_URL}${link.imagePath}`} alt={link.linkName} className={styles.mobileCardImage} />
                  <Typography variant="body1" className={styles.mobileCardTitle}>
                    {truncateText(link.linkName, 19)}
                  </Typography>
                  <Typography variant="body2">{truncateText(getTitleByLanguage(link.usefulLinksTranslations, languageId), 18)}</Typography>
                  <Typography variant="body2" color="primary">
                    <a href={link.link} target="_blank" rel="noopener noreferrer" className={`${styles.tableLink} ${darkMode ? styles.tableLinkDarkLink : ""}`}>
                      {truncateText(link.link, 25)}
                    </a>
                  </Typography>
                  <Box className={styles.iconButtonContainer}>
                    <IconButton color="primary" onClick={() => handleViewLink(link.id)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleEdit(link)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(link.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              ) : (
                (page - 1) * limit + index + 1
              )}
            </TableCell>

            {!isMobile && (
              <>
                <TableCell align="center" style={{ width: "10%" }}>
                  <CardMedia component="img" height="80" image={`${BASE_IMAGE_URL}${link.imagePath}`} alt={link.linkName} className={styles.desktopCardImage} />
                </TableCell>
                <TableCell align="center" style={{ width: "15%" }}>
                  <Typography className={`${styles.desktopText} ${darkMode ? styles.desktopTextDarkText : ""}`}>{truncateText(link.linkName, 12)}</Typography>
                </TableCell>
                <TableCell align="center" style={{ width: "20%" }}>
                  <Typography className={`${styles.desktopText} ${darkMode ? styles.desktopTextDarkText : ""}`}>{truncateText(getTitleByLanguage(link.usefulLinksTranslations, languageId), 18)}</Typography>
                </TableCell>
                <TableCell align="center" style={{ width: "30%" }}>
                  <a href={link.link} target="_blank" rel="noopener noreferrer" className={`${styles.tableLink} ${darkMode ? styles.tableLinkDarkLink : ""}`}>
                    {truncateText(link.link, 25)}
                  </a>
                </TableCell>
                <TableCell align="center" style={{ width: "20%" }}>
                  <Box className={styles.iconButtonContainer}>
                    <IconButton color="primary" onClick={() => handleViewLink(link.id)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleEdit(link)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(link.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </>
            )}
          </TableRow>
        ))
      )}
    </TableBody>
  );
};
export default TableBodyComponent;
