import { Box, Typography } from "@mui/material";
import { useState } from "react";

const ExpandableText = ({
  text,
  maxLength = 100,
  isLink = false,
  readMoreText = "Read more...",
  readLessText = "Read less",
}) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isLongText = text.length > maxLength;

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Box component="span" sx={{ display: "inline" }}>
      <Typography
        component={isLink ? "a" : "span"}
        href={isLink ? text : undefined}
        target={isLink ? "_blank" : undefined}
        rel={isLink ? "noopener noreferrer" : undefined}
        sx={{
          color: isLink ? "primary.main" : "inherit",
          textDecoration: isLink ? "underline" : "none",
          wordBreak: "break-word",
          display: "inline",
        }}
      >
        {expanded || !isLongText ? text : `${text.substring(0, maxLength)}...`}
      </Typography>

      {isLongText && (
        <Typography
          component="span"
          onClick={handleToggle}
          sx={{
            color: "primary.main",
            cursor: "pointer",
            marginLeft: "4px",
            fontWeight: "bold",
          }}
        >
          {expanded ? ` ${readLessText}` : ` ${readMoreText}`}
        </Typography>
      )}
    </Box>
  );
};

export default ExpandableText;
