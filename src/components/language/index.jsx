import { setLanguage } from "@/store/languageSlice";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Flag from "react-world-flags";

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const languageId = useSelector((state) => state.language.languageId);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectLanguage = (value) => {
    dispatch(setLanguage(value));
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick} sx={{ minWidth: 40 }}>
        <Flag code={languageId === 1 ? "GB" : languageId === 2 ? "AZ" : "SA"} style={{ width: 30, height: 20 }} />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleSelectLanguage(1)}>
          <Flag code="GB" style={{ width: 20, height: 20, marginRight: 8 }} />
          English
        </MenuItem>
        <MenuItem onClick={() => handleSelectLanguage(2)}>
          <Flag code="AZ" style={{ width: 20, height: 20, marginRight: 8 }} />
          Azerbaijani
        </MenuItem>
        <MenuItem onClick={() => handleSelectLanguage(3)}>
          <Flag code="SA" style={{ width: 20, height: 20, marginRight: 8 }} />
          العربية
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LanguageSelector;
