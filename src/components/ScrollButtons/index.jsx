import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { IconButton } from "@mui/material";
import styles from "./index.module.css";

const ScrollButtons = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <IconButton onClick={scrollToBottom} className={`${styles.scrollButton} ${styles.scrollDownButton}`}>
        <ArrowDownwardIcon />
      </IconButton>

      <IconButton onClick={scrollToTop} className={`${styles.scrollButton} ${styles.scrollUpButton}`}>
        <ArrowUpwardIcon />
      </IconButton>
    </>
  );
};

export default ScrollButtons;
