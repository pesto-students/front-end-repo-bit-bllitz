import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./CustomChip.module.scss";
const CustomChip = ({name, price}) => {
  return (
    <Box className={styles.orderChip}>
      <Typography className={styles.foodItem}>{name}</Typography>
      <Typography className={styles.price}>{price}</Typography>
    </Box>
  );
};

export default CustomChip;
