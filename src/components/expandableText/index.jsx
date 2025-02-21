import { Box, Typography } from "@mui/material";
import { useState } from "react";
import styles from "./index.module.css";

const ExpandableText = ({ text, maxLength = 100, isLink = false, readMoreText = "Read more...", readLessText = "Read less" }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isLongText = text.length > maxLength;

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Box component="span" className={styles.expandableTextContainer}>
      <Typography component={isLink ? "a" : "span"} href={isLink ? text : undefined} target={isLink ? "_blank" : undefined} rel={isLink ? "noopener noreferrer" : undefined} className={isLink ? styles.expandableTextLink : styles.expandableTextSpan}>
        {expanded || !isLongText ? text : `${text.substring(0, maxLength)}...`}
      </Typography>

      {isLongText && (
        <Typography component="span" onClick={handleToggle} className={styles.expandableTextToggle}>
          {expanded ? ` ${readLessText}` : ` ${readMoreText}`}
        </Typography>
      )}
    </Box>
  );
};

export default ExpandableText;
