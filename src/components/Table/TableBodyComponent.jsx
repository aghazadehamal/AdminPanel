import VisibilityIcon from "@mui/icons-material/Visibility";
import { useMediaQuery } from "@mui/material";

import {
  Box,
  CardMedia,
  IconButton,
  Skeleton,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from "@mui/material";
import React from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TableBodyComponent = ({
  isLoading,
  data,
  darkMode,
  handleDelete,
  handleViewLink,
  handleEdit,
  languageId,
  page,
  limit,
}) => {
  const getTitleByLanguage = (translations, langId) => {
    const translation = translations?.find(
      (item) => item.languageId === langId
    );
    return translation ? translation.title : "Title not found";
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <TableBody sx={{ width: "100%", minWidth: "100%", mt: "2" }}>
      {isLoading || !data?.datas
        ? Array(15)
            .fill({})
            .map((_, index) => (
              <TableRow key={index}>
                <TableCell colSpan={6}>
                  {isMobile ? (
                    <Box
                      sx={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "12px",
                        marginBottom: "8px",
                        backgroundColor: "#f9f9f9",
                        textAlign: "center",
                      }}
                    >
                      <Skeleton
                        variant="text"
                        width="50%"
                        height={24}
                        sx={{ margin: "0 auto" }}
                      />
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        height={80}
                        sx={{ marginY: 1 }}
                      />
                      <Skeleton
                        variant="text"
                        width="60%"
                        height={24}
                        sx={{ margin: "0 auto" }}
                      />
                      <Skeleton
                        variant="text"
                        width="80%"
                        height={24}
                        sx={{ margin: "0 auto" }}
                      />
                      <Skeleton
                        variant="text"
                        width="90%"
                        height={24}
                        sx={{ margin: "0 auto" }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "8px",
                          marginTop: "8px",
                        }}
                      >
                        <Skeleton variant="circular" width={30} height={30} />
                        <Skeleton variant="circular" width={30} height={30} />
                        <Skeleton variant="circular" width={30} height={30} />
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        gap: "15px",
                        alignItems: "center",
                      }}
                    >
                      <Skeleton variant="text" width="3%" height={24} />

                      <Skeleton variant="rectangular" width="11%" height={50} />
                      <Skeleton variant="text" width="10%" height={24} />
                      <Skeleton variant="text" width="20%" height={24} />
                      <Skeleton variant="text" width="35%" height={24} />
                      <Skeleton variant="circular" width={30} height={30} />
                      <Skeleton variant="circular" width={30} height={30} />
                      <Skeleton variant="circular" width={30} height={30} />
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))
        : data.datas.map((link, index) => (
            <TableRow key={link.id}>
              <TableCell
                colSpan={isMobile ? 6 : 1}
                align={isMobile ? "left" : "center"}
              >
                {isMobile ? (
                  <Box
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      padding: "12px",
                      marginBottom: "8px",
                      backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {(page - 1) * limit + index + 1}
                    </Typography>

                    <CardMedia
                      component="img"
                      height="80"
                      image={`http://135.181.42.5:220${link.imagePath}`}
                      alt=""
                      sx={{
                        objectFit: "contain",
                        borderRadius: "8px",
                        marginTop: "8px",
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ marginTop: "8px", fontWeight: "bold" }}
                    >
                      {truncateText(link.linkName, 19)}
                    </Typography>
                    <Typography variant="body2">
                      {truncateText(
                        getTitleByLanguage(
                          link.usefulLinksTranslations,
                          languageId
                        ),
                        18
                      )}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      <a
                        href={link.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: darkMode ? "#ffffff" : "#1976d2",
                          textDecoration: "none",
                        }}
                      >
                        {truncateText(link.link, 25)}
                      </a>
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "8px",
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => handleViewLink(link.id)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(link)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(link.id)}
                      >
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
                  <TableCell align="center" sx={{ width: "10%" }}>
                    <CardMedia
                      component="img"
                      height="80"
                      image={`http://135.181.42.5:220${link.imagePath}`}
                      alt=""
                      sx={{
                        objectFit: "contain",
                        borderRadius: "8px",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ width: "15%" }}>
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: darkMode ? "#ffffff" : "#000000",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {truncateText(link.linkName, 12)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: darkMode ? "#ffffff" : "#000000",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {truncateText(
                        getTitleByLanguage(
                          link.usefulLinksTranslations,
                          languageId
                        ),
                        18
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ width: "30%" }}>
                    <a
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: darkMode ? "#ffffff" : "#000000",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "12px",
                        wordBreak: "break-word",
                        maxWidth: "200px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "inline-block",
                      }}
                    >
                      {truncateText(link.link, 25)}
                    </a>
                  </TableCell>
                  <TableCell align="center" sx={{ width: "20%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "center",
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => handleViewLink(link.id)}
                      >
                        <VisibilityIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(link)}
                      >
                        <EditIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(link.id)}
                      >
                        <DeleteIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
    </TableBody>
  );
};
export default TableBodyComponent;
