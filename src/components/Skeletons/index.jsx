import { Box, Skeleton, TableCell, TableRow, useMediaQuery } from "@mui/material";
import styles from "./index.module.css";

const SkeletonRows = ({ count = 15 }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return Array.from({ length: count }).map((_, index) =>
    isMobile ? (
      <TableRow key={index}>
        <TableCell>
          <Box key={index} className={styles.mobileSkeletonContainer}>
            <Skeleton variant="text" width="50%" height={24} />
            <Skeleton variant="rectangular" width="100%" height={80} />
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="80%" height={24} />
            <Skeleton variant="text" width="90%" height={24} />
            <Box className={styles.mobileSkeletonIcons}>
              <Skeleton variant="circular" width={30} height={30} />
              <Skeleton variant="circular" width={30} height={30} />
              <Skeleton variant="circular" width={30} height={30} />
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    ) : (
      <TableRow key={index}>
        <TableCell colSpan={6}>
          <Box className={styles.desktopSkeletonContainer}>
            <Skeleton variant="text" width="3%" height={24} />
            <Skeleton variant="rectangular" width="11%" height={50} />
            <Skeleton variant="text" width="10%" height={24} />
            <Skeleton variant="text" width="20%" height={24} />
            <Skeleton variant="text" width="35%" height={24} />
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="circular" width={30} height={30} />
          </Box>
        </TableCell>
      </TableRow>
    )
  );
};

export default SkeletonRows;
