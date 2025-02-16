import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

const TableHeadComponent = ({ darkMode }) => (
  <TableHead>
    <TableRow
      sx={{
        backgroundColor: darkMode ? "#2c3e50" : "#f5f5f5",
        "@media (max-width: 600px)": { display: "none" },
      }}
    >
      <TableCell align="center" sx={{ fontWeight: "bold", width: "5%" }}>
        #
      </TableCell>
      <TableCell align="center" sx={{ fontWeight: "bold", width: "10%" }}>
        Image
      </TableCell>
      <TableCell align="center" sx={{ fontWeight: "bold", width: "15%" }}>
        Name
      </TableCell>
      <TableCell align="center" sx={{ fontWeight: "bold", width: "20%" }}>
        Title
      </TableCell>
      <TableCell align="center" sx={{ fontWeight: "bold", width: "30%" }}>
        URL
      </TableCell>
      <TableCell align="center" sx={{ fontWeight: "bold", width: "20%" }}>
        Adjustments
      </TableCell>
    </TableRow>
  </TableHead>
);

export default TableHeadComponent;
