import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./Chip.module.scss";
const Chip = ({name, price}) => {
  return (
    <Box className={styles.orderChip}>
      <Typography className={styles.foodItem}>{name}</Typography>
      <Typography className={styles.price}>{price}</Typography>
    </Box>
  );
};

export default Chip;
